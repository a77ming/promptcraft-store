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
        };
        createOrder: () => Promise<string>;
        onApprove: (data: { orderID: string }) => Promise<void>;
        onError: (err: Error) => void;
      }) => {
        render: (container: string) => void;
      };
    };
  }
}

export default function PayPalButton({ product, onSuccess, onError }: PayPalButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // 检查Client ID
    if (!PAYPAL_CLIENT_ID) {
      setStatus('error');
      setErrorMsg('PayPal Client ID not configured');
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
          setErrorMsg('Failed to load PayPal SDK');
        });
      }
      return;
    }

    // 动态加载PayPal SDK
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture`;
    script.async = true;

    script.onload = () => {
      console.log('PayPal SDK loaded successfully');
      setStatus('ready');
    };

    script.onerror = (e) => {
      console.error('PayPal SDK load error:', e);
      setStatus('error');
      setErrorMsg('Failed to load PayPal SDK. Please check your internet connection.');
    };

    document.body.appendChild(script);

    return () => {
      // 不移除脚本，避免重复加载
    };
  }, []);

  useEffect(() => {
    if (status !== 'ready' || !window.paypal || !containerRef.current) return;

    // 清空容器
    containerRef.current.innerHTML = '';

    try {
      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
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
              throw new Error(errData.error || 'Failed to create order');
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
              throw new Error(errData.error || 'Failed to capture payment');
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
      }).render(`#paypal-button-container-${product.id}`);
    } catch (err) {
      console.error('Render PayPal buttons error:', err);
      setStatus('error');
      setErrorMsg('Failed to render PayPal buttons');
    }
  }, [status, product, onSuccess, onError]);

  if (status === 'error') {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 font-medium">支付加载失败</p>
        <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 text-sm text-red-600 underline"
        >
          刷新页面重试
        </button>
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
