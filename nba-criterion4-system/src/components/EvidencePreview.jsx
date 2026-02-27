import { X, FileText, Image, Download, ExternalLink, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

export default function EvidencePreview({ isOpen, onClose, record }) {
    const [zoom, setZoom] = useState(1);

    if (!isOpen || !record) return null;

    // Simulate evidence type based on category
    const isPDF = record.category === 'PUBLICATION' || record.category === 'INTERNSHIP';
    const isImage = !isPDF;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center" onClick={onClose}>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in" />

            {/* Modal */}
            <div
                className="relative z-10 w-full max-w-[700px] mx-4 card animate-scale overflow-hidden"
                style={{ boxShadow: 'var(--shadow-modal)' }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-3">
                        {isImage ? <Image className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /> :
                            <FileText className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />}
                        <div>
                            <p className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>Evidence Preview</p>
                            <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{record.title}</p>
                        </div>
                    </div>
                    <button onClick={onClose}
                        className="p-2 rounded-xl transition-all hover:bg-[var(--color-bg-hover)] cursor-pointer"
                        style={{ color: 'var(--color-text-muted)' }}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Preview Area */}
                    <div className="rounded-xl overflow-hidden" style={{
                        border: '1px solid var(--color-border)',
                        background: 'var(--color-bg-muted)',
                        height: '400px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {isImage ? (
                            <div className="text-center" style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}>
                                {/* Simulated certificate image */}
                                <div className="w-[360px] h-[260px] rounded-xl mx-auto flex flex-col items-center justify-center p-8"
                                    style={{
                                        background: 'linear-gradient(135deg, #fff 0%, #f0f0ff 50%, #fff 100%)',
                                        border: '3px solid #d4a574',
                                        boxShadow: 'inset 0 0 60px rgba(212,165,116,0.1)',
                                    }}>
                                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#b8860b' }}>Certificate of Achievement</div>
                                    <div className="w-16 h-0.5 bg-amber-300 mb-3" />
                                    <div className="text-[8px] uppercase tracking-wider mb-2" style={{ color: '#666' }}>This is to certify that</div>
                                    <div className="text-[16px] font-bold italic mb-2" style={{ color: '#333', fontFamily: 'Georgia, serif' }}>
                                        {record.studentName || 'Student Name'}
                                    </div>
                                    <div className="text-[9px] text-center leading-relaxed" style={{ color: '#666' }}>
                                        has successfully completed
                                    </div>
                                    <div className="text-[12px] font-bold mt-1 text-center" style={{ color: '#1a1a2e' }}>
                                        {record.title}
                                    </div>
                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="text-center">
                                            <div className="w-12 h-0.5 bg-gray-400 mb-1" />
                                            <div className="text-[7px]" style={{ color: '#999' }}>Signature</div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full" style={{ background: 'linear-gradient(135deg, #d4a574, #b8860b)', opacity: 0.3 }} />
                                        <div className="text-center">
                                            <div className="w-12 h-0.5 bg-gray-400 mb-1" />
                                            <div className="text-[7px]" style={{ color: '#999' }}>Date</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <FileText className="w-16 h-16 mx-auto mb-3" style={{ color: 'var(--color-text-faint)' }} />
                                <p className="text-[14px] font-semibold" style={{ color: 'var(--color-text-secondary)' }}>{record.title}.pdf</p>
                                <p className="text-[12px] mt-1" style={{ color: 'var(--color-text-muted)' }}>PDF Document · 2.4 MB</p>
                            </div>
                        )}
                    </div>

                    {/* Toolbar */}
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-2">
                            <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))}
                                className="btn-secondary py-2 px-3"><ZoomIn className="w-4 h-4" /></button>
                            <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))}
                                className="btn-secondary py-2 px-3"><ZoomOut className="w-4 h-4" /></button>
                            <span className="text-[11px] font-semibold self-center px-2" style={{ color: 'var(--color-text-muted)' }}>{Math.round(zoom * 100)}%</span>
                        </div>
                        <div className="flex gap-2">
                            <button className="btn-secondary">
                                <Download className="w-4 h-4" /> Download
                            </button>
                            <button className="btn-secondary">
                                <ExternalLink className="w-4 h-4" /> Open Full
                            </button>
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-3 gap-4 mt-5 p-4 rounded-xl" style={{ background: 'var(--color-bg-muted)', border: '1px solid var(--color-border-light)' }}>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-faint)' }}>Category</p>
                            <p className="text-[12px] font-semibold mt-1" style={{ color: 'var(--color-text-primary)' }}>{record.categoryLabel || record.category}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-faint)' }}>Date</p>
                            <p className="text-[12px] font-semibold mt-1" style={{ color: 'var(--color-text-primary)' }}>{record.date || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-faint)' }}>Status</p>
                            <p className="text-[12px] font-semibold mt-1" style={{ color: record.status === 'APPROVED' ? '#10b981' : record.status === 'REJECTED' ? '#ef4444' : '#f59e0b' }}>
                                {record.status || 'Pending'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
