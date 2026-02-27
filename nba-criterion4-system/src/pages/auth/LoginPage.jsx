import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    GraduationCap, Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle,
    Shield, BarChart3, ClipboardCheck, Users, FileSpreadsheet,
    TrendingUp, CheckCircle2, Zap, Globe, Award, Sparkles
} from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const user = await login(email, password);
            navigate(user.role === 'STUDENT' ? '/student' : '/admin');
        } catch { /* handled by context */ } finally { setIsSubmitting(false); }
    };

    const quickLogin = async (role) => {
        const creds = role === 'student'
            ? { email: 'student@nba.edu', password: 'student123' }
            : { email: 'admin@nba.edu', password: 'admin123' };
        setEmail(creds.email);
        setPassword(creds.password);
        setIsSubmitting(true);
        try {
            const user = await login(creds.email, creds.password);
            navigate(user.role === 'STUDENT' ? '/student' : '/admin');
        } catch { /* handled */ } finally { setIsSubmitting(false); }
    };

    const features = [
        { icon: ClipboardCheck, label: 'Smart Verification', desc: 'AI-assisted evidence review' },
        { icon: BarChart3, label: 'Live Analytics', desc: 'Real-time compliance metrics' },
        { icon: FileSpreadsheet, label: 'SAR Auto-Export', desc: 'One-click NBA report generation' },
        { icon: TrendingUp, label: 'Gap Analysis', desc: 'Predictive compliance scoring' },
    ];

    const stats = [
        { value: '500+', label: 'Students Tracked' },
        { value: '1,200+', label: 'Records Verified' },
        { value: '98%', label: 'Compliance Rate' },
    ];

    return (
        <div className="min-h-screen flex login-bg overflow-hidden">

            {/* ─── LEFT: Brand Hero Panel ─── */}
            <div className="hidden lg:flex lg:w-[55%] relative flex-col items-center justify-center p-12 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 40%, #818cf8 100%)' }}>

                {/* Animated mesh */}
                <div className="absolute inset-0 opacity-[0.07]" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                                      radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
                    backgroundSize: '48px 48px',
                }} />

                {/* Glowing orbs */}
                <div className="absolute top-[10%] left-[10%] w-80 h-80 rounded-full animate-float"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)' }} />
                <div className="absolute bottom-[5%] right-[5%] w-96 h-96 rounded-full animate-float"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)', animationDelay: '3s' }} />
                <div className="absolute top-[60%] left-[50%] w-48 h-48 rounded-full animate-float"
                    style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.1), transparent 70%)', animationDelay: '5s' }} />

                {/* Content */}
                <div className="relative z-10 max-w-[480px] text-center">
                    {/* Centered Icon */}
                    <div className="relative mx-auto mb-10 animate-in">
                        {/* Outer glow ring */}
                        <div className="absolute inset-0 w-32 h-32 mx-auto rounded-3xl animate-pulse-s"
                            style={{ background: 'rgba(255,255,255,0.08)', filter: 'blur(20px)', top: '-8px', left: 'calc(50% - 72px)' }} />
                        {/* Icon container */}
                        <div className="relative w-28 h-28 rounded-3xl flex items-center justify-center mx-auto animate-float"
                            style={{
                                background: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255,255,255,0.25)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.15), inset 0 0 32px rgba(255,255,255,0.05)',
                            }}>
                            <GraduationCap className="w-14 h-14 text-white" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }} />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-[42px] font-black tracking-tight text-white leading-tight animate-in delay-1">
                        NBA Criterion 4
                    </h1>
                    <p className="text-[18px] font-medium text-white/70 mt-3 animate-in delay-2">
                        Student Achievement Intelligence System
                    </p>
                    <p className="text-[13px] text-white/40 mt-4 max-w-[360px] mx-auto leading-relaxed animate-in delay-3">
                        Unified compliance platform for tracking, verifying, and reporting student professional activities under NBA accreditation standards.
                    </p>

                    {/* Feature Pills */}
                    <div className="grid grid-cols-2 gap-3 mt-10">
                        {features.map((f, idx) => (
                            <div key={f.label} className={`flex items-center gap-3 p-4 rounded-2xl transition-all animate-slide-up delay-${idx + 2}`}
                                style={{
                                    background: 'rgba(255,255,255,0.08)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(8px)',
                                }}>
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ background: 'rgba(255,255,255,0.12)' }}>
                                    <f.icon className="w-4 h-4 text-white/90" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[12px] font-bold text-white/90">{f.label}</p>
                                    <p className="text-[10px] text-white/40">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats Bar */}
                    <div className="flex items-center justify-center gap-8 mt-10 animate-in delay-5">
                        {stats.map((s, idx) => (
                            <div key={s.label} className="text-center">
                                <p className="text-[24px] font-extrabold text-white">{s.value}</p>
                                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom trust badges */}
                <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6 animate-in delay-6">
                    <div className="flex items-center gap-2 text-[10px] font-medium text-white/30">
                        <Shield className="w-3 h-3" /> NBA Compliant
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-medium text-white/30">
                        <Globe className="w-3 h-3" /> OBE Framework
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-medium text-white/30">
                        <Award className="w-3 h-3" /> Tier-I Accreditation
                    </div>
                </div>
            </div>

            {/* ─── RIGHT: Login Form ─── */}
            <div className="flex-1 flex items-center justify-center p-8 relative">
                {/* Background dots (mobile/right side) */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(rgba(99,102,241,0.04) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }} />

                {/* Mobile-only floating orbs */}
                <div className="lg:hidden fixed top-[5%] right-[10%] w-48 h-48 rounded-full animate-float opacity-40"
                    style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1), transparent 70%)' }} />
                <div className="lg:hidden fixed bottom-[10%] left-[5%] w-64 h-64 rounded-full animate-float opacity-30"
                    style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)', animationDelay: '2s' }} />

                <div className="relative z-10 w-full max-w-[420px]">
                    {/* Mobile-only header */}
                    <div className="lg:hidden text-center mb-10 animate-in">
                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 animate-float"
                            style={{
                                background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                                boxShadow: '0 8px 40px rgba(99,102,241,0.3)',
                            }}>
                            <GraduationCap className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-[28px] font-extrabold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                            NBA Criterion 4
                        </h1>
                        <p className="text-[13px] mt-2 font-medium" style={{ color: 'var(--color-text-muted)' }}>
                            Student Achievement Intelligence System
                        </p>
                    </div>

                    {/* Welcome text (desktop) */}
                    <div className="hidden lg:block mb-8 animate-in">
                        <h2 className="text-[28px] font-extrabold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                            Welcome back
                        </h2>
                        <p className="text-[14px] mt-2" style={{ color: 'var(--color-text-muted)' }}>
                            Sign in to access your compliance dashboard
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="card p-8 animate-slide-up delay-1"
                        style={{
                            boxShadow: 'var(--shadow-lift)',
                            backdropFilter: 'blur(20px)',
                            background: 'rgba(255,255,255,0.92)',
                        }}>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest mb-2.5" style={{ color: 'var(--color-text-muted)' }}>Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-faint)' }} />
                                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                        placeholder="Enter your institutional email" className="input-field pl-11" required />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest mb-2.5" style={{ color: 'var(--color-text-muted)' }}>Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-faint)' }} />
                                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                                        placeholder="Enter your password" className="input-field pl-11 pr-11" required />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors cursor-pointer" style={{ color: 'var(--color-text-faint)' }}>
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-[13px] animate-in"
                                    style={{ background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', color: '#b91c1c' }}>
                                    <AlertCircle className="w-4 h-4 shrink-0" />{error}
                                </div>
                            )}

                            <button type="submit" disabled={isSubmitting}
                                className="btn-primary w-full justify-center py-3.5 text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ boxShadow: '0 4px 20px rgba(99,102,241,0.3)' }}>
                                {isSubmitting
                                    ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-7">
                            <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-faint)' }}>Quick Access</span>
                            <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                        </div>

                        {/* Quick logins */}
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => quickLogin('student')} disabled={isSubmitting}
                                className="group relative overflow-hidden py-3.5 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50 glass-hover"
                                style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(99,102,241,0.12))', color: 'var(--color-accent)', border: '1px solid var(--color-accent-border)' }}>
                                <GraduationCap className="w-4 h-4 transition-transform group-hover:scale-110" /> Student Demo
                            </button>
                            <button onClick={() => quickLogin('admin')} disabled={isSubmitting}
                                className="group relative overflow-hidden py-3.5 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50 glass-hover"
                                style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(16,185,129,0.12))', color: '#047857', border: '1px solid var(--color-success-border)' }}>
                                <Shield className="w-4 h-4 transition-transform group-hover:scale-110" /> Admin Demo
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8 animate-in delay-4">
                        <div className="flex items-center justify-center gap-2 text-[11px]" style={{ color: 'var(--color-text-faint)' }}>
                            <Sparkles className="w-3 h-3" />
                            <span>NBA Accreditation · Criterion 4: Students' Performance</span>
                        </div>
                        <p className="text-[10px] mt-2" style={{ color: 'var(--color-text-faint)' }}>
                            © 2026 NMAM Institute of Technology · All rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
