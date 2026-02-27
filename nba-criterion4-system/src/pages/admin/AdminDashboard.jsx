import TopBar from '../../components/layout/TopBar';
import { Link } from 'react-router-dom';
import {
    achievements, outcomes, cohortData, academicPerformance,
    professionalChapters, categoryLabels, countByStatus,
    calculateAPI, calculatePlacementIndex
} from '../../data/mockData';
import {
    Briefcase, Award, GraduationCap, TrendingUp, TrendingDown,
    AlertTriangle, FileSpreadsheet, ClipboardCheck,
    Globe, BookOpen, BarChart3, ArrowUpRight, ArrowDownRight,
    Sparkles, Target, Users, Zap
} from 'lucide-react';

function CompletionRing({ percent, size = 48, strokeWidth = 4, color = '#6366f1' }) {
    const r = (size - strokeWidth) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (percent / 100) * circ;
    return (
        <svg width={size} height={size} className="completion-ring">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-border-light)" strokeWidth={strokeWidth} />
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
                strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} />
        </svg>
    );
}

export default function AdminDashboard() {
    const approved = achievements.filter(a => a.verificationStatus === 'APPROVED');
    const pendingCount = achievements.filter(a => a.verificationStatus === 'PENDING').length
        + outcomes.filter(o => o.verificationStatus === 'PENDING').length;

    const approvedPlacements = outcomes.filter(o => o.verificationStatus === 'APPROVED' && o.category === 'PLACEMENT');
    const approvedHigher = outcomes.filter(o => o.verificationStatus === 'APPROVED' && o.category === 'HIGHER_STUDIES');
    const nationalIntl = approved.filter(a => a.geographicLevel === 'NATIONAL' || a.geographicLevel === 'INTERNATIONAL');
    const certs = approved.filter(a => a.category === 'CERTIFICATION');
    const pubs = approved.filter(a => a.category === 'PUBLICATION');

    const currentAPI = calculateAPI(academicPerformance.find(p => p.academicYear === '2024-25' && p.yearOfStudy === 3));
    const prevAPI = calculateAPI(academicPerformance.find(p => p.academicYear === '2023-24' && p.yearOfStudy === 3));
    const currentPI = calculatePlacementIndex(cohortData.find(c => c.academicYear === '2024-25'));
    const prevPI = calculatePlacementIndex(cohortData.find(c => c.academicYear === '2023-24'));

    const currPubs = pubs.filter(p => p.academicYear === '2024-25').length;
    const prevPubs = pubs.filter(p => p.academicYear === '2023-24').length;
    const currAch = approved.filter(a => a.academicYear === '2024-25').length;
    const prevAch = approved.filter(a => a.academicYear === '2023-24').length;

    const kpis = [
        {
            label: 'Total Placements', value: approvedPlacements.length, icon: Briefcase, iconClass: 'icon-success',
            sub: `IT: ${approvedPlacements.filter(p => p.sectorType === 'IT').length} · Core: ${approvedPlacements.filter(p => p.sectorType === 'CORE').length}`,
            trend: '+12%', trendUp: true, progress: { pct: approvedPlacements.length > 0 ? 80 : 0, color: '#10b981' }
        },
        {
            label: 'Higher Studies', value: approvedHigher.length, icon: GraduationCap, iconClass: 'icon-info',
            sub: 'GATE / GRE qualified', trend: null, progress: null
        },
        {
            label: 'National & Intl Events', value: nationalIntl.length, icon: Globe, iconClass: 'icon-accent',
            sub: `Nat: ${nationalIntl.filter(a => a.geographicLevel === 'NATIONAL').length} · Intl: ${nationalIntl.filter(a => a.geographicLevel === 'INTERNATIONAL').length}`,
            trend: '+8%', trendUp: true, progress: null
        },
        {
            label: 'Certifications', value: certs.length, icon: Award, iconClass: 'icon-warning',
            sub: 'AWS, Google, Microsoft', trend: '+3 this year', trendUp: true, progress: null
        },
        {
            label: 'Pending Review', value: pendingCount, icon: ClipboardCheck, iconClass: pendingCount > 5 ? 'icon-danger' : 'icon-warning',
            sub: 'Requires attention', trend: null, progress: null
        },
        {
            label: 'API Score (Current)', value: currentAPI.toFixed(2), icon: BarChart3, iconClass: 'icon-accent',
            sub: 'Academic Perf. Index',
            trend: currentAPI > prevAPI ? `+${((currentAPI - prevAPI) / prevAPI * 100).toFixed(1)}%` : `${((currentAPI - prevAPI) / prevAPI * 100).toFixed(1)}%`,
            trendUp: currentAPI >= prevAPI, progress: { pct: Math.min((currentAPI / 10) * 100, 100), color: '#6366f1' }
        },
    ];

    return (
        <div>
            <TopBar title="Admin Dashboard" subtitle="NBA Criterion 4 · Real-Time Compliance Intelligence" />

            <div className="p-8 space-y-8 max-w-[1200px]">
                {/* Hero Card */}
                <div className="card p-7 animate-in glass-hover" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.04) 0%, rgba(16,185,129,0.02) 100%)' }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <CompletionRing percent={currentPI} size={68} strokeWidth={5} color={currentPI >= 60 ? '#10b981' : '#f59e0b'} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[14px] font-extrabold" style={{ color: currentPI >= 60 ? '#047857' : '#b45309' }}>{currentPI.toFixed(0)}%</span>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-[16px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                                    Placement Index: {currentPI.toFixed(1)}%
                                </h2>
                                <p className="text-[12px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                                    {currentPI >= 60 ? '✓ On track for full marks' : '⚠ Below 60% threshold — needs attention'}
                                </p>
                                <p className="text-[11px] mt-1 flex items-center gap-1" style={{ color: 'var(--color-text-faint)' }}>
                                    <Zap className="w-3 h-3" /> Overall compliance score across all sub-criteria
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link to="/admin/verify" className="btn-primary">
                                <ClipboardCheck className="w-4 h-4" /> Queue ({pendingCount})
                            </Link>
                            <Link to="/admin/sar-export" className="btn-secondary">
                                <FileSpreadsheet className="w-4 h-4" /> SAR Report
                            </Link>
                            <Link to="/admin/analytics" className="btn-secondary">
                                <BarChart3 className="w-4 h-4" /> Analytics
                            </Link>
                        </div>
                    </div>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {kpis.map((kpi, idx) => (
                        <div key={kpi.label} className={`card card-hover glass-hover p-6 animate-slide-up delay-${idx + 1}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-10 h-10 rounded-xl ${kpi.iconClass} flex items-center justify-center`}>
                                    <kpi.icon className="w-[18px] h-[18px]" />
                                </div>
                                {kpi.trend && (
                                    <span className={kpi.trendUp ? 'trend-up' : 'trend-down'}>
                                        {kpi.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                        {kpi.trend}
                                    </span>
                                )}
                            </div>
                            <p className="text-[30px] font-extrabold tracking-tight animate-count" style={{ color: 'var(--color-text-primary)' }}>{kpi.value}</p>
                            <p className="text-[12px] font-medium mt-1" style={{ color: 'var(--color-text-muted)' }}>{kpi.label}</p>
                            <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-faint)' }}>{kpi.sub}</p>
                            {kpi.progress && (
                                <div className="progress-bar">
                                    <div className="progress-bar-fill" style={{ width: `${kpi.progress.pct}%`, background: `linear-gradient(90deg, ${kpi.progress.color}, ${kpi.progress.color}66)` }} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Two Columns */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Gap Analysis */}
                    <div className="card p-7 animate-in delay-3">
                        <h3 className="section-label mb-5" style={{ color: 'var(--color-text-primary)' }}>
                            <AlertTriangle className="w-4 h-4" style={{ color: '#b45309' }} />
                            Predictive Gap Analysis
                        </h3>
                        <div className="space-y-4">
                            {currPubs < prevPubs && (
                                <div className="flex items-start gap-3 p-4 rounded-xl animate-in"
                                    style={{ background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)' }}>
                                    <TrendingDown className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#b91c1c' }} />
                                    <div>
                                        <p className="text-[13px] font-bold" style={{ color: '#b91c1c' }}>Publication Deficit</p>
                                        <p className="text-[12px] mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                                            Current: <strong>{currPubs}</strong> vs. Previous: <strong>{prevPubs}</strong>. Risk in Sub-Criterion 4.6.2.
                                        </p>
                                        <p className="text-[11px] mt-2 font-semibold" style={{ color: '#b45309' }}>⚡ Encourage research paper submissions</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-3 p-4 rounded-xl"
                                style={{
                                    background: currentPI >= 60 ? 'var(--color-success-bg)' : 'var(--color-warning-bg)',
                                    border: `1px solid ${currentPI >= 60 ? 'var(--color-success-border)' : 'var(--color-warning-border)'}`
                                }}>
                                <TrendingUp className="w-5 h-5 shrink-0 mt-0.5" style={{ color: currentPI >= 60 ? 'var(--color-success)' : '#b45309' }} />
                                <div className="flex-1">
                                    <p className="text-[13px] font-bold" style={{ color: currentPI >= 60 ? '#047857' : '#b45309' }}>
                                        Placement Index: {currentPI.toFixed(1)}%
                                    </p>
                                    <p className="text-[12px] mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                                        {currentPI >= 60 ? '✓ On track for full marks' : '⚠ Below 60% threshold — needs attention'}
                                    </p>
                                    <div className="progress-bar mt-2">
                                        <div className="progress-bar-fill" style={{ width: `${Math.min(currentPI, 100)}%`, background: currentPI >= 60 ? '#10b981' : '#f59e0b' }} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-xl"
                                style={{
                                    background: currAch >= prevAch ? 'var(--color-success-bg)' : 'var(--color-warning-bg)',
                                    border: `1px solid ${currAch >= prevAch ? 'var(--color-success-border)' : 'var(--color-warning-border)'}`
                                }}>
                                <TrendingUp className="w-5 h-5 shrink-0 mt-0.5" style={{ color: currAch >= prevAch ? 'var(--color-success)' : '#b45309' }} />
                                <div className="flex-1">
                                    <p className="text-[13px] font-bold" style={{ color: currAch >= prevAch ? '#047857' : '#b45309' }}>
                                        Activity Trend: {currAch >= prevAch ? 'Positive' : 'Declining'}
                                    </p>
                                    <p className="text-[12px] mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                                        2024-25: <strong>{currAch}</strong> vs. 2023-24: <strong>{prevAch}</strong>
                                    </p>
                                    <div className="progress-bar mt-2">
                                        <div className="progress-bar-fill" style={{ width: `${Math.min((currAch / Math.max(prevAch, 1)) * 100, 100)}%`, background: currAch >= prevAch ? '#10b981' : '#f59e0b' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professional Chapters */}
                    <div className="card p-7 animate-in delay-4">
                        <h3 className="section-label mb-5" style={{ color: 'var(--color-text-primary)' }}>
                            <BookOpen className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                            Professional Chapters (4.6.1)
                        </h3>
                        <div className="space-y-2">
                            {professionalChapters.map((ch, idx) => (
                                <div key={ch.name} className={`flex items-center justify-between p-4 rounded-xl transition-all hover:bg-[var(--color-bg-hover)] glass-hover animate-slide-up delay-${idx + 1}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                            style={{ background: 'var(--color-accent-bg)', border: '1px solid var(--color-accent-border)' }}>
                                            <BookOpen className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>{ch.name}</p>
                                            <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{ch.members} members</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[16px] font-extrabold" style={{ color: 'var(--color-accent)' }}>{ch.eventsThisYear}</p>
                                        <p className="text-[10px] font-medium" style={{ color: 'var(--color-text-faint)' }}>events</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Category Distribution */}
                <div className="card p-7 animate-in delay-5">
                    <h3 className="section-label mb-6" style={{ color: 'var(--color-text-primary)' }}>
                        <Target className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                        Approved Activities by Category
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                        {Object.entries(categoryLabels).filter(([k]) => !['PLACEMENT', 'HIGHER_STUDIES', 'ENTREPRENEURSHIP'].includes(k)).map(([key, label], idx) => {
                            const count = approved.filter(a => a.category === key).length;
                            return (
                                <div key={key} className={`p-5 rounded-xl text-center card-hover transition-all cursor-default animate-slide-up delay-${idx + 1}`}
                                    style={{ background: 'var(--color-bg-muted)', border: '1px solid var(--color-border-light)' }}>
                                    <p className="text-[24px] font-extrabold animate-count" style={{ color: 'var(--color-text-primary)' }}>{count}</p>
                                    <p className="text-[9px] font-bold uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
