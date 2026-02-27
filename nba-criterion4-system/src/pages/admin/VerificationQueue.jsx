import { useState } from 'react';
import TopBar from '../../components/layout/TopBar';
import EvidencePreview from '../../components/EvidencePreview';
import { useToast } from '../../context/ToastContext';
import {
    achievements, outcomes, getStudentName, categoryLabels, geoLabels
} from '../../data/mockData';
import {
    CheckCircle2, XCircle, ExternalLink, Filter, Eye,
    MessageSquare, X, AlertTriangle, ChevronDown, Square, CheckSquare
} from 'lucide-react';
import { format } from 'date-fns';

export default function VerificationQueue() {
    const toast = useToast();
    const allPending = [
        ...achievements.filter(a => a.verificationStatus === 'PENDING').map(a => ({
            ...a, type: 'achievement', studentName: getStudentName(a.studentId),
            categoryLabel: categoryLabels[a.category], geoLabel: geoLabels[a.geographicLevel],
        })),
        ...outcomes.filter(o => o.verificationStatus === 'PENDING').map(o => ({
            ...o, type: 'outcome', studentName: getStudentName(o.studentId),
            categoryLabel: o.category.replace('_', ' '), title: o.entityName,
        })),
    ];

    const [items, setItems] = useState(allPending);
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState('All');
    const [rejectModal, setRejectModal] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [evidence, setEvidence] = useState(null);
    const [checkedIds, setCheckedIds] = useState(new Set());

    const categories = ['All', ...new Set(allPending.map(i => i.categoryLabel))];
    const filtered = filter === 'All' ? items : items.filter(i => i.categoryLabel === filter);

    const toggleCheck = (id) => {
        setCheckedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    const toggleAll = () => {
        if (checkedIds.size === filtered.length) setCheckedIds(new Set());
        else setCheckedIds(new Set(filtered.map(i => i.id)));
    };

    const handleApprove = (item) => {
        setItems(prev => prev.filter(i => i.id !== item.id));
        setSelected(null);
        setCheckedIds(prev => { const n = new Set(prev); n.delete(item.id); return n; });
        toast.success(`Approved: ${item.title}`);
    };

    const handleReject = () => {
        if (!rejectReason.trim()) { toast.warning('Please enter a rejection reason'); return; }
        setItems(prev => prev.filter(i => i.id !== rejectModal.id));
        setSelected(null);
        setCheckedIds(prev => { const n = new Set(prev); n.delete(rejectModal.id); return n; });
        toast.error(`Rejected: ${rejectModal.title}`);
        setRejectModal(null);
        setRejectReason('');
    };

    const handleBulkApprove = () => {
        const count = checkedIds.size;
        setItems(prev => prev.filter(i => !checkedIds.has(i.id)));
        setSelected(null);
        setCheckedIds(new Set());
        toast.success(`Bulk approved ${count} submissions`);
    };

    const handleBulkReject = () => {
        const count = checkedIds.size;
        setItems(prev => prev.filter(i => !checkedIds.has(i.id)));
        setSelected(null);
        setCheckedIds(new Set());
        toast.error(`Bulk rejected ${count} submissions`);
    };

    return (
        <div>
            <TopBar title="Verification Queue" subtitle={`${items.length} submissions pending review`} />

            <div className="p-8 max-w-[1400px]">
                <div className="flex gap-6">
                    {/* Table */}
                    <div className="flex-1 min-w-0">
                        {/* Filters + Bulk Actions */}
                        <div className="card p-4 mb-4 animate-in">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Filter className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                                    {categories.map(cat => (
                                        <button key={cat} onClick={() => setFilter(cat)}
                                            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold cursor-pointer transition-all ${filter === cat ? 'text-white' : ''}`}
                                            style={{
                                                background: filter === cat ? 'var(--color-accent)' : 'transparent',
                                                color: filter === cat ? 'white' : 'var(--color-text-muted)',
                                            }}>
                                            {cat}{cat === 'All' ? ` (${items.length})` : ''}
                                        </button>
                                    ))}
                                </div>

                                {/* Bulk Actions */}
                                {checkedIds.size > 0 && (
                                    <div className="flex items-center gap-2 animate-in">
                                        <span className="text-[11px] font-semibold px-2" style={{ color: 'var(--color-accent)' }}>
                                            {checkedIds.size} selected
                                        </span>
                                        <button onClick={handleBulkApprove} className="btn-primary py-1.5 px-3 text-[11px]">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve All
                                        </button>
                                        <button onClick={handleBulkReject}
                                            className="py-1.5 px-3 rounded-lg text-[11px] font-semibold cursor-pointer transition-all flex items-center gap-1.5"
                                            style={{ background: 'var(--color-danger-bg)', color: '#b91c1c', border: '1px solid var(--color-danger-border)' }}>
                                            <XCircle className="w-3.5 h-3.5" /> Reject All
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Table */}
                        <div className="card overflow-hidden animate-in delay-1">
                            <table className="nba-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: 40 }}>
                                            <button onClick={toggleAll} className="cursor-pointer" style={{ color: 'var(--color-text-muted)' }}>
                                                {checkedIds.size === filtered.length && filtered.length > 0 ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                                            </button>
                                        </th>
                                        <th>Student</th>
                                        <th>Category</th>
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.length === 0 ? (
                                        <tr><td colSpan={6} className="text-center py-12">
                                            <CheckCircle2 className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--color-success)' }} />
                                            <p className="text-[14px] font-semibold" style={{ color: 'var(--color-text-secondary)' }}>All caught up!</p>
                                            <p className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>No pending submissions to review</p>
                                        </td></tr>
                                    ) : (
                                        filtered.map(item => (
                                            <tr key={item.id}
                                                className={`cursor-pointer ${selected?.id === item.id ? 'bg-[var(--color-accent-bg)]' : ''}`}
                                                onClick={() => setSelected(item)}>
                                                <td onClick={e => e.stopPropagation()}>
                                                    <button onClick={() => toggleCheck(item.id)} className="cursor-pointer" style={{ color: checkedIds.has(item.id) ? 'var(--color-accent)' : 'var(--color-text-faint)' }}>
                                                        {checkedIds.has(item.id) ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                                                    </button>
                                                </td>
                                                <td>
                                                    <p className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>{item.studentName}</p>
                                                    <p className="text-[10px]" style={{ color: 'var(--color-text-faint)' }}>{item.enrollmentNo || item.studentId}</p>
                                                </td>
                                                <td>
                                                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md"
                                                        style={{ background: 'var(--color-accent-bg)', color: 'var(--color-accent)' }}>
                                                        {item.categoryLabel}
                                                    </span>
                                                </td>
                                                <td>
                                                    <p className="text-[13px] truncate max-w-[200px]" style={{ color: 'var(--color-text-secondary)' }}>{item.title}</p>
                                                </td>
                                                <td className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>
                                                    {item.eventDate ? format(new Date(item.eventDate), 'dd MMM yy') : '—'}
                                                </td>
                                                <td onClick={e => e.stopPropagation()}>
                                                    <div className="flex items-center gap-1.5">
                                                        <button onClick={() => handleApprove(item)} className="p-1.5 rounded-lg transition-all hover:bg-green-50 cursor-pointer" style={{ color: 'var(--color-success)' }}>
                                                            <CheckCircle2 className="w-[18px] h-[18px]" />
                                                        </button>
                                                        <button onClick={() => { setRejectModal(item); setRejectReason(''); }} className="p-1.5 rounded-lg transition-all hover:bg-red-50 cursor-pointer" style={{ color: 'var(--color-danger)' }}>
                                                            <XCircle className="w-[18px] h-[18px]" />
                                                        </button>
                                                        <button onClick={() => setEvidence({ ...item, status: 'PENDING', date: item.eventDate ? format(new Date(item.eventDate), 'dd MMM yyyy') : '—' })}
                                                            className="p-1.5 rounded-lg transition-all hover:bg-blue-50 cursor-pointer" style={{ color: 'var(--color-accent)' }}>
                                                            <Eye className="w-[18px] h-[18px]" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Detail Panel */}
                    <div className="hidden xl:block w-[360px] shrink-0">
                        <div className="card p-6 sticky top-[84px] animate-slide-r">
                            {selected ? (
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>Submission Details</h3>
                                        <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-[var(--color-bg-hover)] cursor-pointer" style={{ color: 'var(--color-text-muted)' }}>
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Student', value: selected.studentName },
                                            { label: 'Title', value: selected.title },
                                            { label: 'Category', value: selected.categoryLabel },
                                            { label: 'Level', value: selected.geoLabel || '—' },
                                            { label: 'Date', value: selected.eventDate ? format(new Date(selected.eventDate), 'dd MMM yyyy') : '—' },
                                            { label: 'Description', value: selected.description || 'No description provided' },
                                        ].map(f => (
                                            <div key={f.label}>
                                                <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-faint)' }}>{f.label}</p>
                                                <p className="text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>{f.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-2 mt-6">
                                        <button onClick={() => handleApprove(selected)} className="btn-primary flex-1 justify-center">
                                            <CheckCircle2 className="w-4 h-4" /> Approve
                                        </button>
                                        <button onClick={() => { setRejectModal(selected); setRejectReason(''); }}
                                            className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all"
                                            style={{ background: 'var(--color-danger-bg)', color: '#b91c1c', border: '1px solid var(--color-danger-border)' }}>
                                            <XCircle className="w-4 h-4" /> Reject
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setEvidence({ ...selected, status: 'PENDING', date: selected.eventDate ? format(new Date(selected.eventDate), 'dd MMM yyyy') : '—' })}
                                        className="btn-secondary w-full justify-center mt-3">
                                        <Eye className="w-4 h-4" /> View Evidence
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-bg-muted)' }}>
                                        <ExternalLink className="w-7 h-7" style={{ color: 'var(--color-text-faint)' }} />
                                    </div>
                                    <p className="text-[13px] font-medium" style={{ color: 'var(--color-text-muted)' }}>Select a submission to review</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reject Modal */}
            {rejectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setRejectModal(null)}>
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
                    <div className="relative z-10 w-full max-w-[440px] mx-4 card p-7 animate-scale" style={{ boxShadow: 'var(--shadow-modal)' }} onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-danger-bg)' }}>
                                <AlertTriangle className="w-5 h-5" style={{ color: 'var(--color-danger)' }} />
                            </div>
                            <div>
                                <h3 className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>Reject Submission</h3>
                                <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{rejectModal.title}</p>
                            </div>
                        </div>
                        <textarea
                            value={rejectReason}
                            onChange={e => setRejectReason(e.target.value)}
                            rows={3}
                            className="input-field resize-none"
                            placeholder="Reason for rejection (required)..."
                        />
                        <div className="flex gap-3 mt-5">
                            <button onClick={() => setRejectModal(null)} className="btn-secondary flex-1 justify-center">Cancel</button>
                            <button onClick={handleReject}
                                className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer flex items-center justify-center gap-2"
                                style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)', color: 'white', boxShadow: '0 2px 8px rgba(239, 68, 68, 0.25)' }}>
                                <XCircle className="w-4 h-4" /> Confirm Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Evidence Preview */}
            <EvidencePreview isOpen={!!evidence} onClose={() => setEvidence(null)} record={evidence} />
        </div>
    );
}
