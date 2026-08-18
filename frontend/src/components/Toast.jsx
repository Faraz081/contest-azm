import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { registerToastListener, unregisterToastListener } from '../utils/toast';

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    registerToastListener((newToast) => {
      setToasts((prev) => [...prev, newToast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, newToast.duration || 3500);
    });

    return () => {
      unregisterToastListener();
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-destructive shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-primary shrink-0" />;
    }
  };

  const getToastStyle = (type) => {
    switch (type) {
      case 'success':
        return 'border-secondary/30 bg-card text-foreground';
      case 'error':
        return 'border-destructive/30 bg-card text-foreground';
      case 'warning':
        return 'border-amber-500/30 bg-card text-foreground';
      case 'info':
      default:
        return 'border-primary/30 bg-card text-foreground';
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-lg transition-all duration-300 ${getToastStyle(
            toast.type
          )}`}
        >
          <div className="flex items-center gap-3">
            {getIcon(toast.type)}
            <p className="text-sm font-medium leading-snug">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-muted-foreground hover:text-foreground transition p-1 rounded-md cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
