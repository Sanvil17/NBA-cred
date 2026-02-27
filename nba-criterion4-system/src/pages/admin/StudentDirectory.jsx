import { useState } from 'react';
import TopBar from '../../components/layout/TopBar';
import {
    students, users, achievements, outcomes,
    getAchievementsForStudent, getOutcomesForStudent,
    countByStatus, categoryLabels, geoLabels, tierLabels
} from '../../data/mockData';
import {
    Search, Users as UsersIcon, Award, Briefcase,
    X, CheckCircle2, Clock, XCircle
} from 'lucide-react';

export default function StudentDirectory() {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);

    const enriched = students.map(s => {
        const user = users.find(u => u.studentId === s.id);
        const achs = getAchievementsForStudent(s.id);
        const outs = getOutcomesForStudent(s.id);
        const stats = countByStatus([...achs, ...outs]);
        return { ...s, fullName: user?.fullName || `Student (${s.enrollmentNo})`, achs, outs, stats };
    });

    const filtered = enriched.filter(s => {
        const t = search.toLowerCase();
        return s.fullName.toLowerCase().includes(t) || s.enrollmentNo.toLowerCase().includes(t) || s.programCode.toLowerCase().includes(t);
    });

    return (
        <div>
            <TopBar title="Student Directory" subtitle={`${students.length} students across all batches`} />

            <div className="p-8">
                <div className="flex items-center gap-2 px-4 py-[8px] rounded-xl max-w-sm mb-7 animate-in"
                    style={{ background: 'var(--color-bg-muted)', border: '1px solid var(--color-border)' }}>
                    <Search className="w-4 h-4" style={{ color: 'var(--color-text-faint)' }} />
                    <input type="text" placeholder="Search by name, enrollment, or program..." value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="bg-transparent border-none outline-none text-[13px] w-full"
                        style={{ color: 'var(--color-text-secondary)' }} />
                </div>

                <div className="grid lg:grid-cols-5 gap-6">
                    {/* List */}
                    <div className="lg:col-span-2 space-y-2 animate-slide-up max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                        {filtered.map((s, idx) => (
                            <div key={s.id} onClick={() => setSelected(s)}
                                className="card p-4 cursor-pointer transition-all duration-200"
                                style={{
                                    borderColor: selected?.id === s.id ? 'var(--color-accent)' : 'var(--color-border)',
                                    background: selected?.id === s.id ? 'var(--color-accent-bg)' : 'white',
                                    animationDelay: `${idx * 30}ms`,
                                }}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full icon-accent flex items-center justify-center text-[11px] font-bold shrink-0">
                                            {s.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>{s.fullName}</p>
                                            <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{s.enrollmentNo} · Batch {s.batchYear}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[13px] font-bold" style={{ color: 'var(--color-accent)' }}>{s.stats.total}</p>
                                        <p className="text-[10px]" style={{ color: 'var(--color-text-faint)' }}>records</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Detail */}
                    <div className="lg:col-span-3 animate-slide-r">
                        {selected ? (
                            <div className="card p-7 sticky top-24 max-h-[calc(100vh-200px)] overflow-y-auto">
                                <div className="flex items-center justify-between mb-7">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl icon-accent flex items-center justify-center text-[16px] font-bold">
                                            {selected.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-bold" style={{ color: 'var(--color-text-primary)' }}>{selected.fullName}</h3>
                                            <p className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>{selected.enrollmentNo} · {selected.programName}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelected(null)} style={{ color: 'var(--color-text-faint)' }}><X className="w-5 h-5" /></button>
                                </div>

                                <div className="grid grid-cols-4 gap-4 mb-7">
                                    {[
                                        { l: 'Total', v: selected.stats.total, c: 'var(--color-text-primary)' },
                                        { l: 'Approved', v: selected.stats.approved, c: 'var(--color-success)' },
                                        { l: 'Pending', v: selected.stats.pending, c: '#b45309' },
                                        { l: 'CGPA', v: selected.cgpa || '—', c: 'var(--color-accent)' },
                                    ].map(s => (
                                        <div key={s.l} className="p-4 rounded-xl text-center" style={{ background: 'var(--color-bg-muted)' }}>
                                            <p className="text-[20px] font-bold" style={{ color: s.c }}>{s.v}</p>
                                            <p className="text-[10px] uppercase tracking-wider font-semibold mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{s.l}</p>
                                        </div>
                                    ))}
                                </div>

                                {selected.outs.length > 0 && (
                                    <div className="mb-7">
                                        <h4 className="text-[11px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                                            style={{ color: 'var(--color-text-muted)' }}>
                                            <Briefcase className="w-3.5 h-3.5" /> Post-Graduation Outcomes
                                        </h4>
                                        {selected.outs.map(o => (
                                            <div key={o.id} className="p-4 rounded-xl mb-2"
                                                style={{ background: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)' }}>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>{o.entityName}</p>
                                                        <p className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>
                                                            {o.category.replace('_', ' ')}{o.salaryLPA ? ` · ₹${o.salaryLPA} LPA` : ''}
                                                        </p>
                                                    </div>
                                                    <span className={`badge ${o.verificationStatus === 'APPROVED' ? 'badge-approved' : 'badge-pending'}`}>{o.verificationStatus}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div>
                                    <h4 className="text-[11px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                                        style={{ color: 'var(--color-text-muted)' }}>
                                        <Award className="w-3.5 h-3.5" /> Activities ({selected.achs.length})
                                    </h4>
                                    {selected.achs.length === 0 ? (
                                        <p className="text-[13px] text-center py-8" style={{ color: 'var(--color-text-muted)' }}>No activities</p>
                                    ) : (
                                        <div className="space-y-1.5">
                                            {selected.achs.map(a => (
                                                <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-[var(--color-bg-hover)]">
                                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                                        style={{ background: 'var(--color-accent-bg)' }}>
                                                        <Award className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[13px] font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{a.title}</p>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <span className="text-[11px]" style={{ color: 'var(--color-accent)' }}>{categoryLabels[a.category]}</span>
                                                            <span className="text-[11px]" style={{ color: 'var(--color-text-faint)' }}>·</span>
                                                            <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{geoLabels[a.geographicLevel]}</span>
                                                            {a.achievementTier?.startsWith('WINNER') && (
                                                                <span className="text-[11px] font-semibold" style={{ color: '#b45309' }}>🏆 {tierLabels[a.achievementTier]}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className={`badge text-[9px] ${a.verificationStatus === 'APPROVED' ? 'badge-approved' : a.verificationStatus === 'PENDING' ? 'badge-pending' : 'badge-rejected'}`}>
                                                        {a.verificationStatus === 'APPROVED' ? <CheckCircle2 className="w-2.5 h-2.5" /> : a.verificationStatus === 'PENDING' ? <Clock className="w-2.5 h-2.5" /> : <XCircle className="w-2.5 h-2.5" />}
                                                        {a.verificationStatus}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="card p-14 text-center">
                                <UsersIcon className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--color-text-faint)' }} />
                                <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>Select a student to view their portfolio</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
