import { useAuth } from '../../context/AuthContext';
import TopBar from '../../components/layout/TopBar';
import { Link } from 'react-router-dom';
import {
    getAchievementsForStudent, getOutcomesForStudent,
    countByStatus, categoryLabels, geoLabels
} from '../../data/mockData';
import {
    Upload, CheckCircle2, Clock, XCircle, Award, Briefcase,
    TrendingUp, FileCheck, ArrowRight, ExternalLink, ArrowUpRight,
    Sparkles, Sun, Moon, CloudSun, Target
} from 'lucide-react';
import { format } from 'date-fns';

const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return { text: 'Good morning', icon: Sun, emoji: '☀️' };
    if (h < 17) return { text: 'Good afternoon', icon: CloudSun, emoji: '🌤️' };
    return { text: 'Good evening', icon: Moon, emoji: '🌙' };
};

function CompletionRing({ percent, size = 52, strokeWidth = 4 }) {
    const r = (size - strokeWidth) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (percent / 100) * circ;
    return (
        <svg width={size} height={size} className="completion-ring">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-border-light)" strokeWidth={strokeWidth} />
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-accent)"
                strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} />
        </svg>
    );
}

export default function StudentDashboard() {
    const { currentUser } = useAuth();
    const studentId = currentUser?.studentProfile?.id;

    const myAchievements = getAchievementsForStudent(studentId);
    const myOutcomes = getOutcomesForStudent(studentId);
    const allRecords = [...myAchievements, ...myOutcomes];
    const stats = countByStatus(allRecords);
    const approvalRate = stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0;

    const recentRecords = [...myAchievements]
        .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))
        .slice(0, 5);

    const greeting = getGreeting();

    const statCards = [
        { label: 'Total Submissions', value: stats.total, icon: FileCheck, iconClass: 'icon-accent', progress: null },
        { label: 'Approved', value: stats.approved, icon: CheckCircle2, iconClass: 'icon-success', trend: '+2 this month', progress: { pct: approvalRate, color: '#10b981' } },
        { label: 'Pending Review', value: stats.pending, icon: Clock, iconClass: 'icon-warning', progress: { pct: stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0, color: '#f59e0b' } },
        { label: 'Rejected', value: stats.rejected, icon: XCircle, iconClass: 'icon-danger', progress: null },
    ];

    return (
        <div>
            <TopBar
                title={`${greeting.text}, ${currentUser?.fullName?.split(' ')[0]} ${greeting.emoji}`}
                subtitle={`${currentUser?.studentProfile?.enrollmentNo} · ${currentUser?.studentProfile?.programName}`}
            />

            <div className="p-8 space-y-8 max-w-[1200px]">
                {/* Hero Greeting + Completion Ring */}
                <div className="card p-7 animate-in glass-hover" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.04) 0%, rgba(139,92,246,0.02) 100%)' }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <CompletionRing percent={approvalRate} size={64} strokeWidth={5} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[14px] font-extrabold" style={{ color: 'var(--color-accent)' }}>{approvalRate}%</span>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-[16px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                                    Approval Rate
                                </h2>
                                <p className="text-[12px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                                    {stats.approved} of {stats.total} submissions approved
                                </p>
                                {stats.pending > 0 && (
                                    <p className="text-[11px] mt-1 flex items-center gap-1" style={{ color: '#b45309' }}>
                                        <Clock className="w-3 h-3" /> {stats.pending} pending review
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Link to="/student/upload" className="btn-primary">
                                <Upload className="w-4 h-4" /> Upload New
                            </Link>
                            <Link to="/student/achievements" className="btn-secondary">
                                <Award className="w-4 h-4" /> View All
                            </Link>
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {statCards.map((card, idx) => (
                        <div key={card.label} className={`card card-hover glass-hover p-6 animate-slide-up delay-${idx + 1}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-10 h-10 rounded-xl ${card.iconClass} flex items-center justify-center`}>
                                    <card.icon className="w-[18px] h-[18px]" />
                                </div>
                                {card.trend && <span className="trend-up"><ArrowUpRight className="w-3 h-3" />{card.trend}</span>}
                            </div>
                            <p className="text-[30px] font-extrabold tracking-tight animate-count" style={{ color: 'var(--color-text-primary)' }}>{card.value}</p>
                            <p className="text-[12px] font-medium mt-1" style={{ color: 'var(--color-text-muted)' }}>{card.label}</p>
                            {card.progress && (
                                <div className="progress-bar">
                                    <div className="progress-bar-fill" style={{ width: `${card.progress.pct}%`, background: `linear-gradient(90deg, ${card.progress.color}, ${card.progress.color}66)` }} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Timeline */}
                    <div className="lg:col-span-2 card p-7 animate-in delay-3">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="section-label" style={{ color: 'var(--color-text-primary)' }}>
                                <Sparkles className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                                Achievement Timeline
                            </h3>
                            <Link to="/student/achievements" className="text-[12px] font-semibold flex items-center gap-1 transition-colors hover:opacity-70" style={{ color: 'var(--color-accent)' }}>
                                View All <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        {recentRecords.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 rounded-2xl icon-accent flex items-center justify-center mx-auto mb-4 animate-float">
                                    <Upload className="w-7 h-7" />
                                </div>
                                <p className="text-[14px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>No submissions yet</p>
                                <p className="text-[13px] mt-1" style={{ color: 'var(--color-text-muted)' }}>Start uploading your achievements!</p>
                                <Link to="/student/upload" className="btn-primary mt-5 inline-flex text-[13px]">
                                    <Upload className="w-4 h-4" /> Upload First
                                </Link>
                            </div>
                        ) : (
                            <div>
                                {recentRecords.map((record, idx) => (
                                    <div key={record.id} className={`timeline-item ${record.verificationStatus.toLowerCase()}`}
                                        style={{ animationDelay: `${idx * 60}ms` }}>
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>
                                                    {record.title}
                                                </p>
                                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5">
                                                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md"
                                                        style={{ background: 'var(--color-accent-bg)', color: 'var(--color-accent)' }}>
                                                        {categoryLabels[record.category]}
                                                    </span>
                                                    <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                                                        {geoLabels[record.geographicLevel]}
                                                    </span>
                                                    <span className="text-[11px]" style={{ color: 'var(--color-text-faint)' }}>
                                                        {format(new Date(record.eventDate), 'dd MMM yyyy')}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className={`badge shrink-0 ${record.verificationStatus === 'APPROVED' ? 'badge-approved' : record.verificationStatus === 'PENDING' ? 'badge-pending' : 'badge-rejected'}`}>
                                                {record.verificationStatus === 'APPROVED' && <CheckCircle2 className="w-3 h-3" />}
                                                {record.verificationStatus === 'PENDING' && <Clock className="w-3 h-3" />}
                                                {record.verificationStatus === 'REJECTED' && <XCircle className="w-3 h-3" />}
                                                {record.verificationStatus}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar Cards */}
                    <div className="space-y-6 animate-in delay-4">
                        {/* Outcome Card */}
                        <div className="card p-7">
                            <h3 className="section-label mb-5">
                                <Briefcase className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
                                Post-Graduation
                            </h3>
                            {myOutcomes.length > 0 ? (
                                <div className="space-y-3">
                                    {myOutcomes.map(outcome => (
                                        <div key={outcome.id} className="p-4 rounded-xl transition-all hover:shadow-sm"
                                            style={{ background: 'var(--color-bg-muted)', border: '1px solid var(--color-border-light)' }}>
                                            <div className="flex items-start justify-between mb-2">
                                                <span className={`badge ${outcome.verificationStatus === 'APPROVED' ? 'badge-approved' : 'badge-pending'}`}>
                                                    {outcome.category.replace('_', ' ')}
                                                </span>
                                                {outcome.evidenceUrl && (
                                                    <button style={{ color: 'var(--color-accent)' }}><ExternalLink className="w-3.5 h-3.5" /></button>
                                                )}
                                            </div>
                                            <p className="text-[13px] font-bold mt-2" style={{ color: 'var(--color-text-primary)' }}>{outcome.entityName}</p>
                                            {outcome.salaryLPA && (
                                                <p className="text-[13px] font-bold mt-1" style={{ color: 'var(--color-success)' }}>₹{outcome.salaryLPA} LPA</p>
                                            )}
                                            <p className="text-[11px] mt-1" style={{ color: 'var(--color-text-muted)' }}>{outcome.referenceDetails}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Briefcase className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--color-text-faint)' }} />
                                    <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>No outcomes recorded</p>
                                </div>
                            )}
                        </div>

                        {/* Academic Profile */}
                        <div className="card p-7">
                            <h3 className="section-label mb-5">
                                <Target className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                                Academic Profile
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Batch Year', value: currentUser?.studentProfile?.batchYear },
                                    { label: 'Program', value: currentUser?.studentProfile?.programCode },
                                    { label: 'CGPA', value: currentUser?.studentProfile?.cgpa, accent: true },
                                ].map(item => (
                                    <div key={item.label} className="flex justify-between items-center py-1">
                                        <span className="text-[12px] font-medium" style={{ color: 'var(--color-text-muted)' }}>{item.label}</span>
                                        <span className={`text-[14px] font-extrabold`}
                                            style={{ color: item.accent ? 'var(--color-accent)' : 'var(--color-text-primary)' }}>
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* CGPA Progress */}
                            <div className="mt-4">
                                <div className="flex justify-between text-[10px] font-semibold mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
                                    <span>CGPA Progress</span>
                                    <span style={{ color: 'var(--color-accent)' }}>{currentUser?.studentProfile?.cgpa}/10</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-bar-fill" style={{ width: `${(currentUser?.studentProfile?.cgpa / 10) * 100}%`, background: 'linear-gradient(90deg, #6366f1, #818cf8)' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
