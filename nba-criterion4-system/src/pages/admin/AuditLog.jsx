import { useState } from 'react';
import TopBar from '../../components/layout/TopBar';
import { achievements, outcomes, getStudentName, categoryLabels } from '../../data/mockData';
import {
    History, CheckCircle2, XCircle, Clock, Filter,
    Search, Download, Eye, ChevronDown, ChevronUp, Calendar
} from 'lucide-react';
import { format } from 'date-fns';

// Generate audit log from mock data
function generateAuditLog() {
    const logs = [];

    achievements.filter(a => a.verificationStatus === 'APPROVED').forEach(a => {
        logs.push({
            id: `ach-${a.id}-approved`,
            action: 'APPROVED',
            type: 'Achievement',
            title: a.title,
            student: getStudentName(a.studentId),
            category: categoryLabels[a.category],
            verifiedBy: 'Dr. Priya Nair',
            timestamp: new Date(new Date(a.eventDate).getTime() + 86400000 * 3),
            comment: 'Evidence verified and approved.',
        });
    });

    achievements.filter(a => a.verificationStatus === 'REJECTED').forEach(a => {
        logs.push({
            id: `ach-${a.id}-rejected`,
            action: 'REJECTED',
            type: 'Achievement',
            title: a.title,
            student: getStudentName(a.studentId),
            category: categoryLabels[a.category],
            verifiedBy: 'Dr. Priya Nair',
            timestamp: new Date(new Date(a.eventDate).getTime() + 86400000 * 2),
            comment: 'Certificate image unclear. Please resubmit.',
        });
    });

    achievements.filter(a => a.verificationStatus === 'PENDING').forEach(a => {
        logs.push({
            id: `ach-${a.id}-submitted`,
            action: 'SUBMITTED',
            type: 'Achievement',
            title: a.title,
            student: getStudentName(a.studentId),
            category: categoryLabels[a.category],
            verifiedBy: null,
            timestamp: new Date(a.eventDate),
            comment: null,
        });
    });

    outcomes.filter(o => o.verificationStatus === 'APPROVED').forEach(o => {
        logs.push({
            id: `out-${o.id}-approved`,
            action: 'APPROVED',
            type: 'Outcome',
            title: o.entityName,
            student: getStudentName(o.studentId),
            category: o.category.replace('_', ' '),
            verifiedBy: 'Dr. Priya Nair',
            timestamp: new Date(new Date(o.evidenceDate || '2024-06-01').getTime() + 86400000 * 5),
            comment: 'Offer letter verified.',
        });
    });

    return logs.sort((a, b) => b.timestamp - a.timestamp);
}

const actionConfig = {
    APPROVED: { icon: CheckCircle2, color: '#10b981', bg: 'var(--color-success-bg)', border: 'var(--color-success-border)', label: 'Approved' },
    REJECTED: { icon: XCircle, color: '#ef4444', bg: 'var(--color-danger-bg)', border: 'var(--color-danger-border)', label: 'Rejected' },
    SUBMITTED: { icon: Clock, color: '#f59e0b', bg: 'var(--color-warning-bg)', border: 'var(--color-warning-border)', label: 'Submitted' },
};

export default function AuditLog() {
    const allLogs = generateAuditLog();
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');
    const [expandedId, setExpandedId] = useState(null);

    const filtered = allLogs
        .filter(l => filter === 'ALL' || l.action === filter)
        .filter(l => search.trim() === '' || l.title.toLowerCase().includes(search.toLowerCase()) || l.student.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <TopBar title="Audit Log" subtitle="Verification history and submission tracking" />
            <div className="p-8 max-w-[1000px] space-y-6">

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 animate-in">
                    {['APPROVED', 'REJECTED', 'SUBMITTED'].map(action => {
                        const cfg = actionConfig[action];
                        const Icon = cfg.icon;
                        const count = allLogs.filter(l => l.action === action).length;
                        return (
                            <div key={action} className="card card-hover p-5 cursor-pointer" onClick={() => setFilter(filter === action ? 'ALL' : action)}
                                style={{ borderColor: filter === action ? cfg.color : undefined }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: cfg.bg }}>
                                        <Icon className="w-5 h-5" style={{ color: cfg.color }} />
                                    </div>
                                    <div>
                                        <p className="text-[22px] font-extrabold" style={{ color: 'var(--color-text-primary)' }}>{count}</p>
                                        <p className="text-[11px] font-medium" style={{ color: 'var(--color-text-muted)' }}>{cfg.label}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Search + Filter */}
                <div className="card p-5 animate-in delay-1">
                    <div className="flex items-center gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-faint)' }} />
                            <input type="text" className="input-field pl-11" placeholder="Search by title or student name..."
                                value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <div className="flex gap-2">
                            {['ALL', 'APPROVED', 'REJECTED', 'SUBMITTED'].map(f => (
                                <button key={f} onClick={() => setFilter(f)}
                                    className={`px-3 py-2 rounded-lg text-[11px] font-semibold cursor-pointer transition-all ${filter === f ? 'text-white' : ''}`}
                                    style={{
                                        background: filter === f ? 'var(--color-accent)' : 'var(--color-bg-muted)',
                                        color: filter === f ? 'white' : 'var(--color-text-muted)',
                                        border: `1px solid ${filter === f ? 'var(--color-accent)' : 'var(--color-border)'}`,
                                    }}>
                                    {f === 'ALL' ? 'All' : actionConfig[f].label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Log List */}
                <div className="space-y-2 animate-in delay-2">
                    {filtered.length === 0 ? (
                        <div className="card p-12 text-center">
                            <History className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--color-text-faint)' }} />
                            <p className="text-[14px] font-semibold" style={{ color: 'var(--color-text-secondary)' }}>No records found</p>
                            <p className="text-[12px] mt-1" style={{ color: 'var(--color-text-muted)' }}>Try adjusting your filters</p>
                        </div>
                    ) : (
                        filtered.map((log, idx) => {
                            const cfg = actionConfig[log.action];
                            const Icon = cfg.icon;
                            const isExpanded = expandedId === log.id;
                            return (
                                <div key={log.id} className={`card transition-all hover:shadow-md animate-slide-up delay-${Math.min(idx, 6)}`}>
                                    <button
                                        onClick={() => setExpandedId(isExpanded ? null : log.id)}
                                        className="w-full flex items-center gap-4 p-5 text-left cursor-pointer"
                                    >
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: cfg.bg }}>
                                            <Icon className="w-5 h-5" style={{ color: cfg.color }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>{log.title}</p>
                                                <span className="badge text-[10px] shrink-0" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                                                    {cfg.label}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1 text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                                                <span>{log.student}</span>
                                                <span>·</span>
                                                <span>{log.category}</span>
                                                <span>·</span>
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{format(log.timestamp, 'dd MMM yyyy, HH:mm')}</span>
                                            </div>
                                        </div>
                                        {isExpanded ? <ChevronUp className="w-4 h-4 shrink-0" style={{ color: 'var(--color-text-faint)' }} /> :
                                            <ChevronDown className="w-4 h-4 shrink-0" style={{ color: 'var(--color-text-faint)' }} />}
                                    </button>
                                    {isExpanded && (
                                        <div className="px-5 pb-5 pt-0 animate-in" style={{ borderTop: '1px solid var(--color-border-light)' }}>
                                            <div className="grid grid-cols-2 gap-4 mt-4">
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-faint)' }}>Type</p>
                                                    <p className="text-[13px] font-medium" style={{ color: 'var(--color-text-secondary)' }}>{log.type}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-faint)' }}>Verified By</p>
                                                    <p className="text-[13px] font-medium" style={{ color: 'var(--color-text-secondary)' }}>{log.verifiedBy || '—'}</p>
                                                </div>
                                            </div>
                                            {log.comment && (
                                                <div className="mt-4 p-3 rounded-xl" style={{ background: 'var(--color-bg-muted)', border: '1px solid var(--color-border-light)' }}>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-faint)' }}>Comment</p>
                                                    <p className="text-[12px]" style={{ color: 'var(--color-text-secondary)' }}>{log.comment}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Summary */}
                <div className="text-center py-4 text-[11px] font-medium" style={{ color: 'var(--color-text-faint)' }}>
                    Showing {filtered.length} of {allLogs.length} records
                </div>
            </div>
        </div>
    );
}
