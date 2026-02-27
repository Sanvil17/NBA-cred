import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Bell, CheckCircle2, Clock, XCircle, Upload, Award,
    ClipboardCheck, MessageSquare, X, Trash2
} from 'lucide-react';
import { format } from 'date-fns';

// Generate sample notifications based on role
function generateNotifications(role) {
    const now = new Date();
    if (role === 'STUDENT') {
        return [
            { id: 1, type: 'approved', title: 'Achievement Approved', desc: 'AWS Certified Cloud Practitioner has been verified.', time: new Date(now - 3600000), read: false },
            { id: 2, type: 'approved', title: 'Achievement Approved', desc: 'Machine Learning Bootcamp at IIT Madras verified.', time: new Date(now - 7200000), read: false },
            { id: 3, type: 'approved', title: 'Achievement Approved', desc: 'Smart India Hackathon 2024 participation approved.', time: new Date(now - 86400000), read: true },
            { id: 4, type: 'info', title: 'System Notice', desc: 'SAR report for 2024-25 is being compiled.', time: new Date(now - 172800000), read: true },
            { id: 5, type: 'pending', title: 'Submission Received', desc: 'Code Chef Long Challenge is pending review.', time: new Date(now - 259200000), read: true },
        ];
    }
    return [
        { id: 1, type: 'pending', title: 'New Submission', desc: 'Arjun Sharma submitted Code Chef Long Challenge.', time: new Date(now - 1800000), read: false },
        { id: 2, type: 'pending', title: 'New Submission', desc: 'Arjun Sharma submitted IEEE International Conference.', time: new Date(now - 3600000), read: false },
        { id: 3, type: 'pending', title: 'New Submission', desc: 'Rahul Verma submitted Carnegie Mellon admission.', time: new Date(now - 7200000), read: false },
        { id: 4, type: 'pending', title: 'New Submission', desc: 'Meera Patel submitted Cybersecurity Workshop.', time: new Date(now - 14400000), read: false },
        { id: 5, type: 'info', title: 'SAR Deadline', desc: 'NBA SAR submission deadline in 15 days.', time: new Date(now - 86400000), read: true },
        { id: 6, type: 'warning', title: 'Gap Alert', desc: 'Publication count below previous year.', time: new Date(now - 172800000), read: true },
    ];
}

const typeConfig = {
    approved: { icon: CheckCircle2, color: '#10b981', bg: 'var(--color-success-bg)' },
    pending: { icon: Clock, color: '#f59e0b', bg: 'var(--color-warning-bg)' },
    rejected: { icon: XCircle, color: '#ef4444', bg: 'var(--color-danger-bg)' },
    info: { icon: MessageSquare, color: '#3b82f6', bg: 'var(--color-info-bg)' },
    warning: { icon: ClipboardCheck, color: '#f59e0b', bg: 'var(--color-warning-bg)' },
};

function timeAgo(date) {
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

export default function NotificationPanel() {
    const { currentUser, isStudent } = useAuth();
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const panelRef = useRef(null);

    useEffect(() => {
        if (currentUser) {
            setNotifications(generateNotifications(currentUser.role));
        }
    }, [currentUser]);

    useEffect(() => {
        function handleOutside(e) {
            if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
        }
        if (open) document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, [open]);

    const unreadCount = notifications.filter(n => !n.read).length;
    const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    const dismiss = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

    return (
        <div className="relative" ref={panelRef}>
            {/* Bell Button */}
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2.5 rounded-xl transition-all hover:bg-[var(--color-bg-hover)] group cursor-pointer"
                style={{ color: 'var(--color-text-muted)' }}
            >
                <Bell className="w-[18px] h-[18px] transition-transform group-hover:rotate-12" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 min-w-[16px] h-[16px] rounded-full flex items-center justify-center text-[9px] font-bold text-white animate-pulse-s"
                        style={{ background: 'var(--color-accent)', boxShadow: '0 2px 6px rgba(99,102,241,0.4)' }}>
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-[380px] card animate-scale overflow-hidden"
                    style={{ boxShadow: 'var(--shadow-modal)', zIndex: 60 }}>
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <div>
                            <h3 className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>Notifications</h3>
                            {unreadCount > 0 && (
                                <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-accent)' }}>{unreadCount} unread</p>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <button onClick={markAllRead} className="text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all hover:bg-[var(--color-accent-bg)] cursor-pointer"
                                style={{ color: 'var(--color-accent)' }}>
                                Mark all read
                            </button>
                        )}
                    </div>

                    {/* List */}
                    <div className="max-h-[380px] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="py-12 text-center">
                                <Bell className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--color-text-faint)' }} />
                                <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map(n => {
                                const cfg = typeConfig[n.type] || typeConfig.info;
                                const Icon = cfg.icon;
                                return (
                                    <div
                                        key={n.id}
                                        className="flex items-start gap-3 px-5 py-3.5 transition-all hover:bg-[var(--color-bg-hover)] group"
                                        style={{ background: !n.read ? 'var(--color-accent-bg)' : 'transparent', borderBottom: '1px solid var(--color-border-light)' }}
                                    >
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: cfg.bg }}>
                                            <Icon className="w-4 h-4" style={{ color: cfg.color }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="text-[12px] font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>{n.title}</p>
                                                {!n.read && <span className="w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--color-accent)' }} />}
                                            </div>
                                            <p className="text-[11px] mt-0.5 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>{n.desc}</p>
                                            <p className="text-[10px] mt-1 font-medium" style={{ color: 'var(--color-text-faint)' }}>{timeAgo(n.time)}</p>
                                        </div>
                                        <button
                                            onClick={() => dismiss(n.id)}
                                            className="shrink-0 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-black/5 cursor-pointer"
                                            style={{ color: 'var(--color-text-faint)' }}
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="px-5 py-3 text-center" style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-muted)' }}>
                            <button onClick={() => setNotifications([])}
                                className="text-[11px] font-semibold flex items-center gap-1.5 mx-auto cursor-pointer transition-all"
                                style={{ color: 'var(--color-text-muted)' }}>
                                <Trash2 className="w-3 h-3" /> Clear all notifications
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
