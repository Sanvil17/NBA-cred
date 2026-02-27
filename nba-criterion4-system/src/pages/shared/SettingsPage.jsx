import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import TopBar from '../../components/layout/TopBar';
import {
    User, Mail, Shield, GraduationCap, Bell, Moon, Sun,
    Save, Camera, Lock, Eye, EyeOff, Globe, Smartphone,
    Languages, Palette, CheckCircle2
} from 'lucide-react';

export default function SettingsPage() {
    const { currentUser, isStudent } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const toast = useToast();

    const [displayName, setDisplayName] = useState(currentUser?.fullName || '');
    const [notifEmail, setNotifEmail] = useState(true);
    const [notifBrowser, setNotifBrowser] = useState(true);
    const [notifApprovals, setNotifApprovals] = useState(true);
    const [notifUploads, setNotifUploads] = useState(true);
    const [language, setLanguage] = useState('en');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const handleSaveProfile = () => { toast.success('Profile updated successfully'); };
    const handleSaveNotif = () => { toast.success('Notification preferences saved'); };
    const handleChangePassword = () => {
        if (!oldPassword || !newPassword) { toast.warning('Please fill both fields'); return; }
        toast.success('Password updated successfully');
        setOldPassword(''); setNewPassword('');
    };

    return (
        <div>
            <TopBar title="Settings" subtitle="Manage your account and preferences" />
            <div className="p-8 max-w-[800px] space-y-6">

                {/* Profile Section */}
                <div className="card p-7 animate-in">
                    <h3 className="section-label mb-6">
                        <User className="w-4 h-4" style={{ color: 'var(--color-accent)' }} /> Profile
                    </h3>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="relative group">
                            <div className="w-20 h-20 rounded-2xl icon-accent flex items-center justify-center text-2xl font-bold">
                                {currentUser?.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white flex items-center justify-center border cursor-pointer transition-all shadow-sm hover:shadow-md"
                                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                                <Camera className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <div>
                            <p className="text-[16px] font-bold" style={{ color: 'var(--color-text-primary)' }}>{currentUser?.fullName}</p>
                            <p className="text-[12px] flex items-center gap-1.5 mt-1" style={{ color: 'var(--color-text-muted)' }}>
                                <Mail className="w-3 h-3" /> {currentUser?.email}
                            </p>
                            <p className="text-[12px] flex items-center gap-1.5 mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                                <Shield className="w-3 h-3" /> {currentUser?.role}
                                {isStudent && currentUser?.studentProfile && (
                                    <><span>·</span><GraduationCap className="w-3 h-3" /> {currentUser.studentProfile.enrollmentNo}</>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>Display Name</label>
                            <input type="text" className="input-field" value={displayName} onChange={e => setDisplayName(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>Email Address</label>
                            <input type="email" className="input-field" value={currentUser?.email || ''} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                        </div>
                    </div>
                    <button className="btn-primary mt-5" onClick={handleSaveProfile}><Save className="w-4 h-4" /> Save Changes</button>
                </div>

                {/* Appearance */}
                <div className="card p-7 animate-in delay-1">
                    <h3 className="section-label mb-6">
                        <Palette className="w-4 h-4" style={{ color: 'var(--color-accent)' }} /> Appearance
                    </h3>
                    <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--color-bg-muted)', border: '1px solid var(--color-border-light)' }}>
                        <div className="flex items-center gap-3">
                            {isDark ? <Moon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /> : <Sun className="w-5 h-5" style={{ color: '#f59e0b' }} />}
                            <div>
                                <p className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>Dark Mode</p>
                                <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{isDark ? 'Currently enabled' : 'Currently disabled'}</p>
                            </div>
                        </div>
                        <button onClick={toggleTheme}
                            className={`w-12 h-7 rounded-full relative transition-all cursor-pointer ${isDark ? 'bg-[var(--color-accent)]' : 'bg-gray-200'}`}>
                            <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all ${isDark ? 'left-6' : 'left-1'}`} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl mt-3" style={{ background: 'var(--color-bg-muted)', border: '1px solid var(--color-border-light)' }}>
                        <div className="flex items-center gap-3">
                            <Languages className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                            <div>
                                <p className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>Language</p>
                                <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>Interface language</p>
                            </div>
                        </div>
                        <select className="input-field w-auto" value={language} onChange={e => setLanguage(e.target.value)}
                            style={{ padding: '6px 32px 6px 12px', fontSize: '12px' }}>
                            <option value="en">English</option>
                            <option value="hi">हिन्दी</option>
                            <option value="kn">ಕನ್ನಡ</option>
                        </select>
                    </div>
                </div>

                {/* Notifications */}
                <div className="card p-7 animate-in delay-2">
                    <h3 className="section-label mb-6">
                        <Bell className="w-4 h-4" style={{ color: 'var(--color-accent)' }} /> Notification Preferences
                    </h3>
                    <div className="space-y-3">
                        {[
                            { label: 'Email Notifications', desc: 'Receive updates via email', state: notifEmail, setter: setNotifEmail, icon: Mail },
                            { label: 'Browser Notifications', desc: 'Push to browser', state: notifBrowser, setter: setNotifBrowser, icon: Smartphone },
                            { label: 'Approval Alerts', desc: 'When submissions are approved', state: notifApprovals, setter: setNotifApprovals, icon: CheckCircle2 },
                            { label: 'New Upload Alerts', desc: isStudent ? 'Upload confirmations' : 'When students submit', state: notifUploads, setter: setNotifUploads, icon: Globe },
                        ].map(n => (
                            <div key={n.label} className="flex items-center justify-between p-4 rounded-xl transition-all hover:bg-[var(--color-bg-muted)]"
                                style={{ border: '1px solid var(--color-border-light)' }}>
                                <div className="flex items-center gap-3">
                                    <n.icon className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                                    <div>
                                        <p className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>{n.label}</p>
                                        <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{n.desc}</p>
                                    </div>
                                </div>
                                <button onClick={() => n.setter(!n.state)}
                                    className={`w-12 h-7 rounded-full relative transition-all cursor-pointer ${n.state ? 'bg-[var(--color-accent)]' : 'bg-gray-200'}`}>
                                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all ${n.state ? 'left-6' : 'left-1'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="btn-secondary mt-5" onClick={handleSaveNotif}><Save className="w-4 h-4" /> Save Preferences</button>
                </div>

                {/* Security */}
                <div className="card p-7 animate-in delay-3">
                    <h3 className="section-label mb-6">
                        <Lock className="w-4 h-4" style={{ color: 'var(--color-danger)' }} /> Security
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>Current Password</label>
                            <div className="relative">
                                <input type={showOld ? 'text' : 'password'} className="input-field pr-10" value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Enter current password" />
                                <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" style={{ color: 'var(--color-text-faint)' }}>
                                    {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>New Password</label>
                            <div className="relative">
                                <input type={showNew ? 'text' : 'password'} className="input-field pr-10" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter new password" />
                                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" style={{ color: 'var(--color-text-faint)' }}>
                                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <button className="btn-primary mt-5" style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }} onClick={handleChangePassword}>
                        <Lock className="w-4 h-4" /> Change Password
                    </button>
                </div>
            </div>
        </div>
    );
}
