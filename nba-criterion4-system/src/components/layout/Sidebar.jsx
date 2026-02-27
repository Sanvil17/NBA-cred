import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard, Upload, FolderOpen, Shield, ClipboardCheck,
    BarChart3, FileSpreadsheet, Users, LogOut, GraduationCap,
    ChevronLeft, ChevronRight, Menu, X
} from 'lucide-react';

const studentNav = [
    { to: '/student', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/student/upload', icon: Upload, label: 'Upload Achievement' },
    { to: '/student/achievements', icon: FolderOpen, label: 'My Achievements' },
];

const adminNav = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/verify', icon: ClipboardCheck, label: 'Verification Queue' },
    { to: '/admin/analytics', icon: BarChart3, label: 'NBA Analytics' },
    { to: '/admin/sar-export', icon: FileSpreadsheet, label: 'SAR Export' },
    { to: '/admin/students', icon: Users, label: 'Student Directory' },
];

export default function Sidebar() {
    const { currentUser, isStudent, logout } = useAuth();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = isStudent ? studentNav : adminNav;

    const handleLogout = () => { logout(); navigate('/login'); };

    const sidebarContent = (
        <div
            className={`flex flex-col h-full bg-white transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[260px]'}`}
            style={{ borderRight: '1px solid var(--color-border)' }}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 h-[68px] shrink-0" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <div className="w-9 h-9 rounded-xl icon-accent flex items-center justify-center shrink-0">
                    <GraduationCap className="w-[18px] h-[18px]" />
                </div>
                {!collapsed && (
                    <div className="overflow-hidden">
                        <h1 className="text-[13px] font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>NBA Criterion 4</h1>
                        <p className="text-[10px] font-medium" style={{ color: 'var(--color-text-muted)' }}>Intelligence System</p>
                    </div>
                )}
            </div>

            {/* Role Badge */}
            {!collapsed && (
                <div className="px-4 pt-5 pb-1">
                    <div
                        className="flex items-center gap-2 px-3 py-[7px] rounded-lg text-[10px] font-bold uppercase tracking-widest"
                        style={{
                            background: isStudent ? 'var(--color-accent-bg)' : 'var(--color-success-bg)',
                            color: isStudent ? 'var(--color-accent)' : 'var(--color-success)',
                            border: `1px solid ${isStudent ? 'var(--color-accent-border)' : 'var(--color-success-border)'}`,
                        }}
                    >
                        <Shield className="w-3 h-3" />
                        {currentUser?.role}
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 px-3 pt-3 pb-4 space-y-1 overflow-y-auto">
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-[10px] rounded-xl text-[13px] font-medium transition-all duration-200 group relative
              ${isActive
                                ? 'text-[var(--color-accent)] font-semibold'
                                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]'}`
                        }
                        style={({ isActive }) => isActive ? {
                            background: 'var(--color-accent-bg)',
                            boxShadow: 'inset 3px 0 0 var(--color-accent)',
                        } : {}}
                        onClick={() => setMobileOpen(false)}
                    >
                        <item.icon className="w-[18px] h-[18px] shrink-0 transition-all duration-200 group-hover:scale-110" />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* User Section */}
            <div className="px-3 pb-3" style={{ borderTop: '1px solid var(--color-border)' }}>
                {!collapsed && (
                    <div className="flex items-center gap-3 px-3 py-4">
                        <div className="w-9 h-9 rounded-full icon-accent flex items-center justify-center text-[11px] font-bold shrink-0 notif-dot">
                            {currentUser?.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>{currentUser?.fullName}</p>
                            <p className="text-[11px] truncate" style={{ color: 'var(--color-text-muted)' }}>{currentUser?.email}</p>
                        </div>
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-[10px] rounded-xl text-[13px] font-medium transition-all duration-200 hover:bg-red-50 text-[var(--color-text-muted)] hover:text-red-600 group"
                >
                    <LogOut className="w-[17px] h-[17px] shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    {!collapsed && 'Sign Out'}
                </button>
            </div>

            {/* Collapse */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden md:flex items-center justify-center h-11 shrink-0 transition-all duration-200 hover:bg-[var(--color-bg-hover)]"
                style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
            >
                {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
        </div>
    );

    return (
        <>
            {/* Mobile Hamburger */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white border text-[var(--color-text-secondary)]"
                style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-float)' }}
                onClick={() => setMobileOpen(!mobileOpen)}
            >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div className="md:hidden fixed inset-0 bg-black/15 z-40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            )}

            {/* Mobile drawer */}
            <div className={`md:hidden fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {sidebarContent}
            </div>

            {/* Desktop sidebar */}
            <div className="hidden md:block shrink-0">{sidebarContent}</div>
        </>
    );
}
