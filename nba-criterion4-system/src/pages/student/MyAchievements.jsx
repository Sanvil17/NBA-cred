import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import TopBar from '../../components/layout/TopBar';
import { getAchievementsForStudent, getOutcomesForStudent, categoryLabels, geoLabels, tierLabels } from '../../data/mockData';
import {
    CheckCircle2, Clock, XCircle, ExternalLink, Search,
    Filter, Award, MessageSquare
} from 'lucide-react';
import { format } from 'date-fns';

export default function MyAchievements() {
    const { currentUser } = useAuth();
    const studentId = currentUser?.studentProfile?.id;

    const myAchievements = getAchievementsForStudent(studentId);
    const myOutcomes = getOutcomesForStudent(studentId);
    const allRecords = [
        ...myAchievements.map(a => ({ ...a, type: 'achievement' })),
        ...myOutcomes.map(o => ({ ...o, type: 'outcome' })),
    ].sort((a, b) => new Date(b.eventDate || b.outcomeDate) - new Date(a.eventDate || a.outcomeDate));

    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');

    const filtered = allRecords
        .filter(r => filter === 'ALL' || r.verificationStatus === filter)
        .filter(r => {
            const term = search.toLowerCase();
            return (r.title || r.entityName || '').toLowerCase().includes(term)
                || (r.category || '').toLowerCase().includes(term);
        });

    const statusIcon = (s) => s === 'APPROVED' ? <CheckCircle2 className="w-3 h-3" /> : s === 'PENDING' ? <Clock className="w-3 h-3" /> : <XCircle className="w-3 h-3" />;
    const statusBadge = (s) => s === 'APPROVED' ? 'badge-approved' : s === 'PENDING' ? 'badge-pending' : 'badge-rejected';

    return (
        <div>
            <TopBar title="My Achievements" subtitle="Complete record of all submitted achievements" />

            <div className="p-8 max-w-[1000px]">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-7 animate-in">
                    <div className="flex items-center gap-2 px-4 py-[8px] rounded-xl flex-1 max-w-sm"
                        style={{ background: 'var(--color-bg-muted)', border: '1px solid var(--color-border)' }}>
                        <Search className="w-4 h-4" style={{ color: 'var(--color-text-faint)' }} />
                        <input type="text" placeholder="Search achievements..." value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="bg-transparent border-none outline-none text-[13px] w-full"
                            style={{ color: 'var(--color-text-secondary)' }} />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4" style={{ color: 'var(--color-text-faint)' }} />
                        {['ALL', 'APPROVED', 'PENDING', 'REJECTED'].map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                className="px-3 py-[6px] rounded-lg text-[11px] font-semibold transition-all"
                                style={{
                                    background: filter === f ? 'var(--color-accent-bg)' : 'transparent',
                                    color: filter === f ? 'var(--color-accent)' : 'var(--color-text-muted)',
                                    border: filter === f ? '1px solid var(--color-accent-border)' : '1px solid transparent',
                                }}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Records as Timeline */}
                <div className="animate-slide-up">
                    {filtered.length === 0 ? (
                        <div className="card p-14 text-center">
                            <Award className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--color-text-faint)' }} />
                            <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>No records match your filter criteria.</p>
                        </div>
                    ) : (
                        <div>
                            {filtered.map((record, idx) => (
                                <div key={record.id}
                                    className={`timeline-item ${record.verificationStatus.toLowerCase()}`}
                                    style={{ animationDelay: `${idx * 40}ms` }}>
                                    <div className="card p-5 card-hover" style={{ marginBottom: '-8px' }}>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>
                                                    {record.title || record.entityName}
                                                </p>
                                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5">
                                                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                                                        style={{ background: 'var(--color-accent-bg)', color: 'var(--color-accent)' }}>
                                                        {categoryLabels[record.category] || record.category}
                                                    </span>
                                                    {record.geographicLevel && (
                                                        <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{geoLabels[record.geographicLevel]}</span>
                                                    )}
                                                    {record.achievementTier && record.achievementTier !== 'PARTICIPANT' && (
                                                        <span className="text-[11px] font-semibold" style={{ color: '#b45309' }}>🏆 {tierLabels[record.achievementTier]}</span>
                                                    )}
                                                    <span className="text-[11px]" style={{ color: 'var(--color-text-faint)' }}>
                                                        {format(new Date(record.eventDate || record.outcomeDate), 'dd MMM yyyy')}
                                                    </span>
                                                </div>
                                                {record.adminComment && (
                                                    <div className="flex items-start gap-2 mt-2.5 p-3 rounded-lg"
                                                        style={{ background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)' }}>
                                                        <MessageSquare className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#b91c1c' }} />
                                                        <p className="text-[11px]" style={{ color: '#b91c1c' }}>{record.adminComment}</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 sm:flex-col sm:items-end shrink-0">
                                                <span className={`badge ${statusBadge(record.verificationStatus)}`}>
                                                    {statusIcon(record.verificationStatus)} {record.verificationStatus}
                                                </span>
                                                {(record.certificateUrl || record.evidenceUrl) && (
                                                    <button className="flex items-center gap-1.5 text-[11px] font-medium transition-colors"
                                                        style={{ color: 'var(--color-accent)' }}>
                                                        <ExternalLink className="w-3.5 h-3.5" /> Evidence
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-6 p-4 rounded-xl" style={{ background: 'var(--color-bg-muted)' }}>
                    <p className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>
                        Showing <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{filtered.length}</span> of <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{allRecords.length}</span> records
                    </p>
                </div>
            </div>
        </div>
    );
}
