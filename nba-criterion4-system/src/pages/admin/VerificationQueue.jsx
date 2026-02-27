import { useState } from 'react';
import TopBar from '../../components/layout/TopBar';
import {
    achievements, outcomes, getStudentName, getStudentById,
    categoryLabels, geoLabels, tierLabels
} from '../../data/mockData';
import { CheckCircle2, XCircle, ExternalLink, Eye, MessageSquare, Filter, X } from 'lucide-react';
import { format } from 'date-fns';

export default function VerificationQueue() {
    const allPending = [
        ...achievements.filter(a => a.verificationStatus === 'PENDING').map(a => ({ ...a, type: 'achievement', date: a.eventDate })),
        ...outcomes.filter(o => o.verificationStatus === 'PENDING').map(o => ({ ...o, type: 'outcome', date: o.outcomeDate, title: o.entityName })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    const [records, setRecords] = useState(allPending);
    const [selected, setSelected] = useState(null);
    const [rejectComment, setRejectComment] = useState('');
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectTarget, setRejectTarget] = useState(null);
    const [filter, setFilter] = useState('ALL');

    const filtered = filter === 'ALL' ? records : records.filter(r => r.category === filter);
    const cats = [...new Set(records.map(r => r.category))];

    const handleApprove = (id) => { setRecords(p => p.filter(r => r.id !== id)); setSelected(null); };
    const handleRejectClick = (r) => { setRejectTarget(r); setRejectComment(''); setShowRejectModal(true); };
    const handleRejectConfirm = () => { if (rejectTarget) { setRecords(p => p.filter(r => r.id !== rejectTarget.id)); setShowRejectModal(false); setSelected(null); } };

    return (
        <div>
            <TopBar title="Verification Queue" subtitle={`${records.length} submissions pending review`} />

            <div className="p-8">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2 mb-7 animate-in">
                    <Filter className="w-4 h-4" style={{ color: 'var(--color-text-faint)' }} />
                    <button onClick={() => setFilter('ALL')}
                        className="px-3 py-[6px] rounded-lg text-[11px] font-semibold transition-all"
                        style={{ background: filter === 'ALL' ? 'var(--color-accent-bg)' : 'transparent', color: filter === 'ALL' ? 'var(--color-accent)' : 'var(--color-text-muted)', border: filter === 'ALL' ? '1px solid var(--color-accent-border)' : '1px solid transparent' }}>
                        All ({records.length})
                    </button>
                    {cats.map(cat => (
                        <button key={cat} onClick={() => setFilter(cat)}
                            className="px-3 py-[6px] rounded-lg text-[11px] font-semibold transition-all"
                            style={{ background: filter === cat ? 'var(--color-accent-bg)' : 'transparent', color: filter === cat ? 'var(--color-accent)' : 'var(--color-text-muted)', border: filter === cat ? '1px solid var(--color-accent-border)' : '1px solid transparent' }}>
                            {categoryLabels[cat] || cat}
                        </button>
                    ))}
                </div>

                <div className="grid lg:grid-cols-5 gap-6">
                    {/* Table */}
                    <div className="lg:col-span-3 animate-slide-up">
                        {filtered.length === 0 ? (
                            <div className="card p-14 text-center">
                                <CheckCircle2 className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--color-success)' }} />
                                <p className="text-[15px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>All Clear!</p>
                                <p className="text-[13px] mt-1" style={{ color: 'var(--color-text-muted)' }}>No pending submissions.</p>
                            </div>
                        ) : (
                            <div className="card overflow-hidden">
                                <table className="nba-table">
                                    <thead>
                                        <tr>
                                            <th>Student</th>
                                            <th>Category</th>
                                            <th>Title</th>
                                            <th>Date</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.map(record => {
                                            const student = getStudentById(record.studentId);
                                            const isSel = selected?.id === record.id;
                                            return (
                                                <tr key={record.id}
                                                    className={`cursor-pointer ${isSel ? '!bg-[var(--color-accent-bg)]' : ''}`}
                                                    onClick={() => setSelected(record)}>
                                                    <td>
                                                        <p className="text-[13px] font-medium" style={{ color: 'var(--color-text-primary)' }}>{getStudentName(record.studentId)}</p>
                                                        <p className="text-[11px]" style={{ color: 'var(--color-text-faint)' }}>{student?.enrollmentNo}</p>
                                                    </td>
                                                    <td>
                                                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                                                            style={{ background: 'var(--color-accent-bg)', color: 'var(--color-accent)' }}>
                                                            {categoryLabels[record.category] || record.category}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <p className="text-[13px] truncate max-w-[200px]" style={{ color: 'var(--color-text-secondary)' }}>{record.title}</p>
                                                    </td>
                                                    <td><p className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>{format(new Date(record.date), 'dd MMM yy')}</p></td>
                                                    <td>
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button onClick={(e) => { e.stopPropagation(); handleApprove(record.id); }}
                                                                className="p-1.5 rounded-lg transition-all" title="Approve"
                                                                style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
                                                                <CheckCircle2 className="w-4 h-4" />
                                                            </button>
                                                            <button onClick={(e) => { e.stopPropagation(); handleRejectClick(record); }}
                                                                className="p-1.5 rounded-lg transition-all" title="Reject"
                                                                style={{ background: 'var(--color-danger-bg)', color: '#b91c1c' }}>
                                                                <XCircle className="w-4 h-4" />
                                                            </button>
                                                            {(record.certificateUrl || record.evidenceUrl) && (
                                                                <button onClick={(e) => e.stopPropagation()}
                                                                    className="p-1.5 rounded-lg transition-all" title="View"
                                                                    style={{ background: 'var(--color-bg-muted)', color: 'var(--color-text-muted)' }}>
                                                                    <ExternalLink className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Detail Panel */}
                    <div className="lg:col-span-2 animate-slide-r">
                        {selected ? (
                            <div className="card p-7 sticky top-24">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-[13px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-primary)' }}>Details</h3>
                                    <button onClick={() => setSelected(null)} style={{ color: 'var(--color-text-faint)' }}><X className="w-4 h-4" /></button>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-muted)' }}>Student</p>
                                        <p className="text-[14px] font-semibold mt-1" style={{ color: 'var(--color-text-primary)' }}>{getStudentName(selected.studentId)}</p>
                                        <p className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>{getStudentById(selected.studentId)?.enrollmentNo}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { l: 'Category', v: categoryLabels[selected.category] },
                                            { l: 'Date', v: format(new Date(selected.date), 'dd MMM yyyy') },
                                            ...(selected.geographicLevel ? [{ l: 'Level', v: geoLabels[selected.geographicLevel] }] : []),
                                            ...(selected.achievementTier ? [{ l: 'Achievement', v: tierLabels[selected.achievementTier] }] : []),
                                        ].map(i => (
                                            <div key={i.l}>
                                                <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-muted)' }}>{i.l}</p>
                                                <p className="text-[13px] font-medium mt-1" style={{ color: 'var(--color-text-primary)' }}>{i.v}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-muted)' }}>Title</p>
                                        <p className="text-[13px] font-semibold mt-1" style={{ color: 'var(--color-text-primary)' }}>{selected.title}</p>
                                    </div>
                                    {selected.description && (
                                        <div>
                                            <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-muted)' }}>Description</p>
                                            <p className="text-[12px] mt-1" style={{ color: 'var(--color-text-secondary)' }}>{selected.description}</p>
                                        </div>
                                    )}
                                    {(selected.certificateUrl || selected.evidenceUrl) && (
                                        <div className="p-4 rounded-xl" style={{ background: 'var(--color-accent-bg)', border: '1px solid var(--color-accent-border)' }}>
                                            <p className="text-[11px] font-semibold uppercase" style={{ color: 'var(--color-accent)' }}>📎 Evidence</p>
                                            <a href="#" className="flex items-center gap-2 text-[12px] mt-1 font-medium" style={{ color: 'var(--color-accent)' }} onClick={e => e.preventDefault()}>
                                                <Eye className="w-3.5 h-3.5" /> {selected.certificateUrl || selected.evidenceUrl}
                                            </a>
                                        </div>
                                    )}
                                    <div className="flex gap-3 pt-5" style={{ borderTop: '1px solid var(--color-border)' }}>
                                        <button onClick={() => handleApprove(selected.id)} className="btn-primary flex-1 justify-center text-[13px]">
                                            <CheckCircle2 className="w-4 h-4" /> Approve
                                        </button>
                                        <button onClick={() => handleRejectClick(selected)}
                                            className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                                            style={{ background: 'var(--color-danger-bg)', color: '#b91c1c', border: '1px solid var(--color-danger-border)' }}>
                                            <XCircle className="w-4 h-4" /> Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="card p-12 text-center">
                                <Eye className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--color-text-faint)' }} />
                                <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>Select a submission to review</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in" onClick={() => setShowRejectModal(false)}>
                    <div className="card p-7 max-w-md w-full mx-4 animate-slide-up" style={{ boxShadow: 'var(--shadow-modal)' }} onClick={e => e.stopPropagation()}>
                        <h3 className="text-[16px] font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Reject Submission</h3>
                        <p className="text-[13px] mb-5" style={{ color: 'var(--color-text-muted)' }}>
                            Rejecting: <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{rejectTarget?.title}</span>
                        </p>
                        <div>
                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
                                <MessageSquare className="w-3 h-3 inline mr-1" /> Reason
                            </label>
                            <textarea value={rejectComment} onChange={e => setRejectComment(e.target.value)}
                                placeholder="e.g., Certificate image is unreadable..." rows={3} className="input-field resize-none" autoFocus />
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowRejectModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                            <button onClick={handleRejectConfirm}
                                className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 cursor-pointer"
                                style={{ background: 'var(--color-danger-bg)', color: '#b91c1c', border: '1px solid var(--color-danger-border)' }}>
                                <XCircle className="w-4 h-4" /> Confirm Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
