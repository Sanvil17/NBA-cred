import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle, Users, Sparkles, Shield } from 'lucide-react';

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

    return (
        <div className="min-h-screen flex items-center justify-center login-bg">
            {/* Grid dots pattern */}
            <div className="fixed inset-0 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(rgba(99,102,241,0.06) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
            }} />

            {/* Floating orbs */}
            <div className="fixed top-[10%] left-[15%] w-72 h-72 rounded-full animate-float opacity-60"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)' }} />
            <div className="fixed bottom-[15%] right-[10%] w-96 h-96 rounded-full animate-float opacity-40"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06), transparent 70%)', animationDelay: '2s' }} />
            <div className="fixed top-[50%] right-[30%] w-48 h-48 rounded-full animate-float opacity-50"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05), transparent 70%)', animationDelay: '4s' }} />

            <div className="relative z-10 w-full max-w-[430px] px-6">
                {/* Header */}
                <div className="text-center mb-10 animate-in">
                    <div className="w-16 h-16 rounded-2xl icon-accent flex items-center justify-center mx-auto mb-6 animate-float"
                        style={{ boxShadow: '0 8px 40px rgba(99,102,241,0.22)' }}>
                        <GraduationCap className="w-8 h-8" />
                    </div>
                    <h1 className="text-[26px] font-extrabold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                        NBA Criterion 4
                    </h1>
                    <p className="text-[13px] mt-2 font-medium" style={{ color: 'var(--color-text-muted)' }}>
                        Student Achievement Intelligence System
                    </p>
                </div>

                {/* Card */}
                <div className="card p-8 animate-slide-up delay-1" style={{ boxShadow: 'var(--shadow-lift)', backdropFilter: 'blur(20px)', background: 'rgba(255,255,255,0.92)' }}>
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
                            className="btn-primary w-full justify-center py-3.5 text-[14px] disabled:opacity-50 disabled:cursor-not-allowed">
                            {isSubmitting
                                ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-faint)' }}>Quick Access</span>
                        <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => quickLogin('student')} disabled={isSubmitting}
                            className="group relative overflow-hidden py-3.5 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50"
                            style={{ background: 'var(--color-accent-bg)', color: 'var(--color-accent)', border: '1px solid var(--color-accent-border)' }}>
                            <GraduationCap className="w-4 h-4 transition-transform group-hover:scale-110" /> Student Demo
                        </button>
                        <button onClick={() => quickLogin('admin')} disabled={isSubmitting}
                            className="group relative overflow-hidden py-3.5 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50"
                            style={{ background: 'var(--color-success-bg)', color: '#047857', border: '1px solid var(--color-success-border)' }}>
                            <Shield className="w-4 h-4 transition-transform group-hover:scale-110" /> Admin Demo
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 animate-in delay-3">
                    <div className="flex items-center justify-center gap-2 text-[11px]" style={{ color: 'var(--color-text-faint)' }}>
                        <Sparkles className="w-3 h-3" />
                        <span>NBA Accreditation Compliance · Criterion 4: Students' Performance</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
