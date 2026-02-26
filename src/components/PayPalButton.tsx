'use client';

import { useEffect, useRef, useState } from 'react';
import { Product } from '@/data/products';

// PayPal Client ID - 在构建时内联
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';

interface PayPalButtonProps {
  product: Product;
  onSuccess: (data: { product: { id: string; name: string; prompts: string[] }; transactionId: string }) => void;
  onError: (error: Error) => void;
}

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: {
        style?: {
          layout?: string;
          color?: string;
          shape?: string;
          label?: string;
          height?: number;
        };
        createOrder: () => Promise<string>;
        onApprove: (data: { orderID: string }) => Promise<void>;
        onError: (err: Error) => void;
      }) => {
        render: (container: string) => void;
        close: () => void;
      };
    };
  }
}

export default function PayPalButton({ product, onSuccess, onError }: PayPalButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<{ close: () => void; render: (id: string) => void } | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // 检查Client ID
    if (!PAYPAL_CLIENT_ID) {
      setStatus('error');
      setErrorMsg('PayPal Client ID 未配置');
      return;
    }

    const scriptId = 'paypal-sdk';
    const existingScript = document.getElementById(scriptId);

    // 如果脚本已存在，直接使用
    if (existingScript) {
      if (window.paypal) {
        setStatus('ready');
      } else {
        existingScript.addEventListener('load', () => setStatus('ready'));
        existingScript.addEventListener('error', () => {
          setStatus('error');
          setErrorMsg('PayPal SDK 加载失败，请检查网络连接');
        });
      }
      return;
    }

    // 动态加载PayPal SDK - 添加更多参数提高兼容性
    const script = document.createElement('script');
    script.id = scriptId;
    // 使用更简洁的SDK参数
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture&components=buttons`;
    script.async = true;
    script.crossOrigin = 'anonymous';

    // 设置超时
    const timeout = setTimeout(() => {
      if (status === 'loading') {
        setStatus('error');
        setErrorMsg('PayPal 加载超时，请刷新页面重试');
      }
    }, 15000);

    script.onload = () => {
      clearTimeout(timeout);
      if (window.paypal) {
        console.log('PayPal SDK loaded successfully');
        setStatus('ready');
      } else {
        setStatus('error');
        setErrorMsg('PayPal SDK 加载异常');
      }
    };

    script.onerror = () => {
      clearTimeout(timeout);
      console.error('PayPal SDK load error');
      setStatus('error');
      setErrorMsg('PayPal SDK 加载失败，请检查网络连接或使用VPN');
    };

    document.body.appendChild(script);

    return () => {
      clearTimeout(timeout);
    };
  }, [retryCount, status]);

  useEffect(() => {
    if (status !== 'ready' || !window.paypal || !containerRef.current) return;

    // 清空容器并关闭旧按钮
    if (buttonsRef.current) {
      try {
        buttonsRef.current.close();
      } catch (e) {
        // ignore
      }
    }
    containerRef.current.innerHTML = '';

    try {
      buttonsRef.current = window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          height: 50,
        },
        createOrder: async () => {
          try {
            const response = await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                amount: product.price,
                productName: product.name,
                productId: product.id,
              }),
            });

            if (!response.ok) {
              const errData = await response.json();
              throw new Error(errData.error || '创建订单失败');
            }

            const order = await response.json();
            return order.id;
          } catch (err) {
            console.error('Create order error:', err);
            onError(err as Error);
            throw err;
          }
        },
        onApprove: async (data) => {
          try {
            const response = await fetch('/api/capture', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: data.orderID,
                productId: product.id,
              }),
            });

            if (!response.ok) {
              const errData = await response.json();
              throw new Error(errData.error || '支付确认失败');
            }

            const result = await response.json();
            onSuccess(result);
          } catch (err) {
            console.error('Capture error:', err);
            onError(err as Error);
          }
        },
        onError: (err) => {
          console.error('PayPal button error:', err);
          onError(err as Error);
        },
      });

      buttonsRef.current.render(`#paypal-button-container-${product.id}`);
    } catch (err) {
      console.error('Render PayPal buttons error:', err);
      setStatus('error');
      setErrorMsg('PayPal 按钮渲染失败');
    }
  }, [status, product, onSuccess, onError]);

  const handleRetry = () => {
    setStatus('loading');
    setErrorMsg('');
    setRetryCount(c => c + 1);
  };

  if (status === 'error') {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">支付加载失败</p>
          <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRetry}
            className="flex-1 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
          >
            重试
          </button>
          <a
            href={`mailto:support@promptcraft.store?subject=购买 ${product.name}&body=我想购买 ${product.name}，价格 $${product.price}`}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-center"
          >
            联系客服购买
          </a>
        </div>
        <p className="text-xs text-gray-500 text-center">
          如遇支付问题，请尝试使用VPN或联系客服
        </p>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-violet-600 border-t-transparent"></div>
        <span className="ml-3 text-gray-600">正在加载支付...</span>
      </div>
    );
  }

  return (
    <div id={`paypal-button-container-${product.id}`} ref={containerRef} className="w-full min-h-[50px]" />
  );
}
