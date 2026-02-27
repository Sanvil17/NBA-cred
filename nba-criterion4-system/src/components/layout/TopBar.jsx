import { Bell, Search, Calendar, Command } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function TopBar({ title, subtitle }) {
    const { currentUser } = useAuth();
    const today = new Date().toLocaleDateString('en-IN', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    });

    return (
        <header
            className="sticky top-0 z-30"
            style={{
                background: 'rgba(248,249,252,0.82)',
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                borderBottom: '1px solid rgba(232,236,242,0.6)',
            }}
        >
            <div className="flex items-center justify-between px-8 h-[68px]">
                {/* Left */}
                <div className="ml-10 md:ml-0">
                    <h2 className="text-[16px] font-extrabold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>{title}</h2>
                    {subtitle && <p className="text-[11px] font-medium mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{subtitle}</p>}
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                    {/* Date */}
                    <div
                        className="hidden lg:flex items-center gap-2 text-[11px] font-medium px-3.5 py-[7px] rounded-xl"
                        style={{ color: 'var(--color-text-muted)', background: 'var(--color-bg-muted)', border: '1px solid var(--color-border-light)' }}
                    >
                        <Calendar className="w-3.5 h-3.5" />
                        {today}
                    </div>

                    {/* Search */}
                    <div
                        className="hidden md:flex items-center gap-2 px-3.5 py-[7px] rounded-xl transition-all"
                        style={{ background: 'var(--color-bg-muted)', border: '1px solid var(--color-border-light)' }}
                    >
                        <Search className="w-3.5 h-3.5" style={{ color: 'var(--color-text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-[13px] placeholder-[var(--color-text-faint)] w-32 focus:w-48 transition-all duration-300"
                            style={{ color: 'var(--color-text-secondary)' }}
                        />
                        <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-semibold"
                            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-faint)' }}>
                            <Command className="w-2.5 h-2.5" />K
                        </kbd>
                    </div>

                    {/* Notifications */}
                    <button
                        className="relative p-2.5 rounded-xl transition-all hover:bg-[var(--color-bg-hover)] group"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        <Bell className="w-[18px] h-[18px] transition-transform group-hover:rotate-12" />
                        <span className="absolute top-2.5 right-2 w-[7px] h-[7px] rounded-full animate-pulse-s" style={{ background: 'var(--color-accent)' }} />
                    </button>

                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full icon-accent flex items-center justify-center text-[11px] font-bold cursor-pointer transition-all hover:shadow-lg hover:scale-105">
                        {currentUser?.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                </div>
            </div>
        </header>
    );
}
