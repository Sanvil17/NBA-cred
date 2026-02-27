import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Search, LayoutDashboard, Upload, FolderOpen, ClipboardCheck,
    BarChart3, FileSpreadsheet, Users, Settings, History,
    Command, ArrowRight
} from 'lucide-react';

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { isStudent, isAdmin } = useAuth();

    const studentCommands = [
        { label: 'Dashboard', desc: 'View your student dashboard', icon: LayoutDashboard, path: '/student' },
        { label: 'Upload Achievement', desc: 'Submit a new achievement', icon: Upload, path: '/student/upload' },
        { label: 'My Achievements', desc: 'View all records', icon: FolderOpen, path: '/student/achievements' },
        { label: 'Settings', desc: 'Manage your profile', icon: Settings, path: '/student/settings' },
    ];

    const adminCommands = [
        { label: 'Dashboard', desc: 'Admin overview', icon: LayoutDashboard, path: '/admin' },
        { label: 'Verification Queue', desc: 'Review pending submissions', icon: ClipboardCheck, path: '/admin/verify' },
        { label: 'NBA Analytics', desc: 'Charts and trends', icon: BarChart3, path: '/admin/analytics' },
        { label: 'SAR Export', desc: 'Generate NBA report tables', icon: FileSpreadsheet, path: '/admin/sar-export' },
        { label: 'Student Directory', desc: 'Browse all students', icon: Users, path: '/admin/students' },
        { label: 'Audit Log', desc: 'Verification history', icon: History, path: '/admin/audit' },
        { label: 'Settings', desc: 'System settings', icon: Settings, path: '/admin/settings' },
    ];

    const commands = isStudent ? studentCommands : isAdmin ? adminCommands : [];

    const filtered = query.trim() === ''
        ? commands
        : commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()) || c.desc.toLowerCase().includes(query.toLowerCase()));

    useEffect(() => {
        const handler = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setOpen(prev => !prev);
            }
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    useEffect(() => {
        if (open) {
            setQuery('');
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    // Close on route change
    useEffect(() => { setOpen(false); }, [location.pathname]);

    const runCommand = (cmd) => {
        navigate(cmd.path);
        setOpen(false);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[90] flex items-start justify-center pt-[15vh]" onClick={() => setOpen(false)}>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm animate-in" />

            {/* Palette */}
            <div
                className="relative z-10 w-full max-w-[520px] mx-4 card animate-scale overflow-hidden"
                style={{ boxShadow: 'var(--shadow-modal)' }}
                onClick={e => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <Search className="w-5 h-5 shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search pages, actions..."
                        className="flex-1 bg-transparent border-none outline-none text-[15px]"
                        style={{ color: 'var(--color-text-primary)' }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && filtered.length > 0) runCommand(filtered[0]);
                        }}
                    />
                    <kbd className="px-2 py-1 rounded-lg text-[10px] font-bold"
                        style={{ background: 'var(--color-bg-muted)', border: '1px solid var(--color-border)', color: 'var(--color-text-faint)' }}>
                        ESC
                    </kbd>
                </div>

                {/* Results */}
                <div className="max-h-[320px] overflow-y-auto p-2">
                    {filtered.length === 0 ? (
                        <div className="py-10 text-center">
                            <Search className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--color-text-faint)' }} />
                            <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>No results for "{query}"</p>
                        </div>
                    ) : (
                        filtered.map((cmd, idx) => (
                            <button
                                key={cmd.path}
                                onClick={() => runCommand(cmd)}
                                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all hover:bg-[var(--color-accent-bg)] group cursor-pointer"
                                style={{ background: location.pathname === cmd.path ? 'var(--color-accent-bg)' : 'transparent' }}
                            >
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                                    style={{
                                        background: location.pathname === cmd.path ? 'linear-gradient(135deg, #6366f1, #818cf8)' : 'var(--color-bg-muted)',
                                        color: location.pathname === cmd.path ? 'white' : 'var(--color-text-muted)',
                                    }}>
                                    <cmd.icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>{cmd.label}</p>
                                    <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{cmd.desc}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" style={{ color: 'var(--color-accent)' }} />
                            </button>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-5 py-3" style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-muted)' }}>
                    <div className="flex items-center gap-3 text-[10px] font-medium" style={{ color: 'var(--color-text-faint)' }}>
                        <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white border text-[9px]" style={{ borderColor: 'var(--color-border)' }}>↑↓</kbd> Navigate</span>
                        <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white border text-[9px]" style={{ borderColor: 'var(--color-border)' }}>↵</kbd> Open</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-medium" style={{ color: 'var(--color-text-faint)' }}>
                        <Command className="w-3 h-3" />K to toggle
                    </div>
                </div>
            </div>
        </div>
    );
}
