import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success', duration = 4000) => {
        const id = ++toastId;
        setToasts(prev => [...prev, { id, message, type }]);
        if (duration > 0) {
            setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
        }
        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const toast = {
        success: (msg) => addToast(msg, 'success'),
        error: (msg) => addToast(msg, 'error'),
        warning: (msg) => addToast(msg, 'warning'),
        info: (msg) => addToast(msg, 'info'),
    };

    const icons = {
        success: CheckCircle2,
        error: AlertCircle,
        warning: AlertTriangle,
        info: Info,
    };

    const styles = {
        success: { bg: 'var(--color-success-bg)', border: 'var(--color-success-border)', color: '#047857', icon: '#10b981' },
        error: { bg: 'var(--color-danger-bg)', border: 'var(--color-danger-border)', color: '#b91c1c', icon: '#ef4444' },
        warning: { bg: 'var(--color-warning-bg)', border: 'var(--color-warning-border)', color: '#b45309', icon: '#f59e0b' },
        info: { bg: 'var(--color-info-bg)', border: 'rgba(59,130,246,0.15)', color: '#1d4ed8', icon: '#3b82f6' },
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}

            {/* Toast Container */}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none" style={{ maxWidth: '380px' }}>
                {toasts.map((t) => {
                    const s = styles[t.type];
                    const Icon = icons[t.type];
                    return (
                        <div
                            key={t.id}
                            className="pointer-events-auto card p-4 flex items-start gap-3 animate-slide-up"
                            style={{ background: s.bg, border: `1px solid ${s.border}`, boxShadow: 'var(--shadow-lift)' }}
                        >
                            <Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: s.icon }} />
                            <p className="text-[13px] font-medium flex-1" style={{ color: s.color }}>{t.message}</p>
                            <button
                                onClick={() => removeToast(t.id)}
                                className="shrink-0 p-1 rounded-lg transition-all hover:bg-black/5 cursor-pointer"
                                style={{ color: s.color }}
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
}
