import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TopBar from '../../components/layout/TopBar';
import {
    Upload, FileUp, CheckCircle2, ChevronRight, ChevronLeft,
    Trophy, MapPin, Calendar, Building2, FileText, AlertCircle,
    Sparkles, X, File, CloudUpload
} from 'lucide-react';

const categories = [
    { value: 'HACKATHON', label: 'Hackathon', icon: '🏆', desc: 'Coding competitions & hackathons' },
    { value: 'WORKSHOP', label: 'Workshop', icon: '🔧', desc: 'Technical workshops & bootcamps' },
    { value: 'CERTIFICATION', label: 'Certification', icon: '📜', desc: 'Professional certifications' },
    { value: 'INTERNSHIP', label: 'Internship', icon: '💼', desc: 'Industry internship experience' },
    { value: 'CONFERENCE', label: 'Conference', icon: '🎤', desc: 'Academic conferences' },
    { value: 'COMPETITION', label: 'Competition', icon: '🥇', desc: 'Technical competitions' },
    { value: 'PUBLICATION', label: 'Publication', icon: '📄', desc: 'Research papers & articles' },
    { value: 'PLACEMENT', label: 'Placement', icon: '🏢', desc: 'Job placement record' },
    { value: 'HIGHER_STUDIES', label: 'Higher Studies', icon: '🎓', desc: 'Post-grad admission' },
];

const geoLevels = ['INSTITUTE', 'STATE', 'NATIONAL', 'INTERNATIONAL'];
const achievementTiers = ['PARTICIPANT', 'ORGANIZER', 'WINNER_1ST', 'WINNER_2ND', 'WINNER_3RD'];
const sectorTypes = ['CORE', 'IT', 'OTHER'];

export default function AchievementUpload() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        category: '', title: '', description: '', organizingBody: '',
        geographicLevel: 'NATIONAL', achievementTier: 'PARTICIPANT',
        eventDate: '', sectorType: 'IT', salaryLPA: '', referenceDetails: '',
        examScore: '', file: null, fileName: '',
    });

    const update = (f, v) => setFormData(p => ({ ...p, [f]: v }));

    const isEvent = ['HACKATHON', 'WORKSHOP', 'COMPETITION', 'CONFERENCE'].includes(formData.category);
    const isPlacement = formData.category === 'PLACEMENT';
    const isHigher = formData.category === 'HIGHER_STUDIES';

    const handleFileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer?.files?.[0] || e.target?.files?.[0];
        if (file) { update('file', file); update('fileName', file.name); }
    };

    const handleSubmit = () => {
        setSubmitted(true);
        setTimeout(() => navigate('/student/achievements'), 2500);
    };

    if (submitted) {
        return (
            <div>
                <TopBar title="Upload Achievement" subtitle="NBA Criterion 4 Compliant Submission" />
                <div className="flex items-center justify-center min-h-[60vh] p-8">
                    <div className="card p-10 text-center max-w-md animate-slide-up" style={{ boxShadow: 'var(--shadow-lift)' }}>
                        <div className="w-16 h-16 rounded-full icon-success flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h2 className="text-[18px] font-bold" style={{ color: 'var(--color-text-primary)' }}>Submission Successful!</h2>
                        <p className="text-[13px] mt-2" style={{ color: 'var(--color-text-muted)' }}>Your achievement has been submitted for verification.</p>
                        <div className="mt-6 p-4 rounded-xl" style={{ background: 'var(--color-accent-bg)', border: '1px solid var(--color-accent-border)' }}>
                            <p className="text-[12px] font-semibold" style={{ color: 'var(--color-accent)' }}>Status: PENDING REVIEW</p>
                            <p className="text-[11px] mt-1" style={{ color: 'var(--color-text-muted)' }}>Estimated review: 2–3 business days</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <TopBar title="Upload Achievement" subtitle="NBA Criterion 4 Compliant Submission" />

            <div className="p-8 max-w-[720px] mx-auto">
                {/* Steps */}
                <div className="flex items-center justify-center gap-3 mb-10 animate-in">
                    {[1, 2, 3, 4].map(s => (
                        <div key={s} className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-300 ${step >= s ? 'icon-accent' : ''}`}
                                style={step < s ? { background: 'var(--color-bg-muted)', color: 'var(--color-text-faint)', border: '1px solid var(--color-border)' } : { boxShadow: '0 2px 8px rgba(99,102,241,0.2)' }}>
                                {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                            </div>
                            {s < 4 && <div className="w-10 h-[2px] rounded" style={{ background: step > s ? 'var(--color-accent)' : 'var(--color-border)' }} />}
                        </div>
                    ))}
                </div>

                <div className="card overflow-hidden animate-slide-up" style={{ boxShadow: 'var(--shadow-float)' }}>
                    {/* Step 1 */}
                    {step === 1 && (
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-7">
                                <Sparkles className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                                <div>
                                    <h3 className="text-[15px] font-bold" style={{ color: 'var(--color-text-primary)' }}>Select Category</h3>
                                    <p className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>Choose the type matching your NBA sub-criteria</p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-3">
                                {categories.map(cat => (
                                    <button key={cat.value} onClick={() => update('category', cat.value)}
                                        className="p-5 rounded-xl text-left transition-all duration-200"
                                        style={{
                                            background: formData.category === cat.value ? 'var(--color-accent-bg)' : 'var(--color-bg-muted)',
                                            border: `1.5px solid ${formData.category === cat.value ? 'var(--color-accent)' : 'var(--color-border-light)'}`,
                                            boxShadow: formData.category === cat.value ? '0 2px 12px rgba(99,102,241,0.1)' : 'none',
                                        }}>
                                        <span className="text-[22px]">{cat.icon}</span>
                                        <p className="text-[13px] font-semibold mt-2" style={{ color: 'var(--color-text-primary)' }}>{cat.label}</p>
                                        <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{cat.desc}</p>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-end mt-8">
                                <button onClick={() => setStep(2)} disabled={!formData.category}
                                    className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                                    Next <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-7">
                                <FileText className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                                <div>
                                    <h3 className="text-[15px] font-bold" style={{ color: 'var(--color-text-primary)' }}>Achievement Details</h3>
                                    <p className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>Fill in details for your {formData.category?.toLowerCase().replace('_', ' ')}</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2"
                                        style={{ color: 'var(--color-text-muted)' }}>
                                        {isPlacement ? 'Company Name' : isHigher ? 'University / Institution' : 'Title / Event Name'} *
                                    </label>
                                    <input type="text" value={formData.title} onChange={e => update('title', e.target.value)}
                                        placeholder={isPlacement ? 'e.g., Microsoft India' : isHigher ? 'e.g., IIT Bombay (M.Tech CS)' : 'e.g., Smart India Hackathon 2024'}
                                        className="input-field" />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>Description</label>
                                    <textarea value={formData.description} onChange={e => update('description', e.target.value)}
                                        placeholder="Brief description of your achievement..." rows={3} className="input-field resize-none" />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
                                            Date *
                                        </label>
                                        <input type="date" value={formData.eventDate} onChange={e => update('eventDate', e.target.value)} className="input-field" />
                                    </div>
                                    {!isPlacement && !isHigher && (
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>Organizing Body</label>
                                            <input type="text" value={formData.organizingBody} onChange={e => update('organizingBody', e.target.value)} placeholder="e.g., IEEE, Google" className="input-field" />
                                        </div>
                                    )}
                                </div>

                                {/* Dynamic: Events */}
                                {isEvent && (
                                    <div className="grid sm:grid-cols-2 gap-5 p-5 rounded-xl animate-in"
                                        style={{ background: 'var(--color-accent-bg)', border: '1px solid var(--color-accent-border)' }}>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-accent)' }}>Geographic Level *</label>
                                            <select value={formData.geographicLevel} onChange={e => update('geographicLevel', e.target.value)} className="input-field">
                                                {geoLevels.map(g => <option key={g} value={g}>{g}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-accent)' }}>Achievement Level</label>
                                            <select value={formData.achievementTier} onChange={e => update('achievementTier', e.target.value)} className="input-field">
                                                {achievementTiers.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                )}

                                {/* Dynamic: Placement */}
                                {isPlacement && (
                                    <div className="grid sm:grid-cols-2 gap-5 p-5 rounded-xl animate-in"
                                        style={{ background: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)' }}>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-success)' }}>Sector *</label>
                                            <select value={formData.sectorType} onChange={e => update('sectorType', e.target.value)} className="input-field">
                                                {sectorTypes.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-success)' }}>Salary (LPA)</label>
                                            <input type="number" step="0.1" value={formData.salaryLPA} onChange={e => update('salaryLPA', e.target.value)} placeholder="12.5" className="input-field" />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-success)' }}>Offer Letter Reference</label>
                                            <input type="text" value={formData.referenceDetails} onChange={e => update('referenceDetails', e.target.value)} placeholder="MSFT/IN/2025/A0045" className="input-field" />
                                        </div>
                                    </div>
                                )}

                                {/* Dynamic: Higher Studies */}
                                {isHigher && (
                                    <div className="grid sm:grid-cols-2 gap-5 p-5 rounded-xl animate-in"
                                        style={{ background: 'var(--color-info-bg)', border: '1px solid rgba(59,130,246,0.15)' }}>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-info)' }}>Exam Score</label>
                                            <input type="text" value={formData.examScore} onChange={e => update('examScore', e.target.value)} placeholder="GATE: 650 (AIR 384)" className="input-field" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-info)' }}>Reference</label>
                                            <input type="text" value={formData.referenceDetails} onChange={e => update('referenceDetails', e.target.value)} placeholder="Admission ref no." className="input-field" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between mt-8">
                                <button onClick={() => setStep(1)} className="btn-secondary"><ChevronLeft className="w-4 h-4" /> Back</button>
                                <button onClick={() => setStep(3)} disabled={!formData.title || !formData.eventDate}
                                    className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">Next <ChevronRight className="w-4 h-4" /></button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Evidence */}
                    {step === 3 && (
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-7">
                                <CloudUpload className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                                <div>
                                    <h3 className="text-[15px] font-bold" style={{ color: 'var(--color-text-primary)' }}>Evidence Vault Upload</h3>
                                    <p className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>Upload verifiable proof — certificates, offer letters, or admission proof</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 rounded-xl mb-7"
                                style={{ background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning-border)' }}>
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#b45309' }} />
                                <div>
                                    <p className="text-[13px] font-semibold" style={{ color: '#b45309' }}>Evidence is mandatory for NBA audits</p>
                                    <p className="text-[12px] mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>Accepted: PDF, PNG, JPEG (max 10MB)</p>
                                </div>
                            </div>

                            <div className={`upload-zone ${formData.file ? '' : ''}`}
                                style={formData.file ? { borderColor: 'var(--color-success)', background: 'var(--color-success-bg)' } : {}}
                                onDragOver={e => e.preventDefault()} onDrop={handleFileDrop}
                                onClick={() => document.getElementById('fileInput').click()}>
                                {formData.file ? (
                                    <div className="animate-in">
                                        <div className="w-14 h-14 rounded-xl icon-success flex items-center justify-center mx-auto mb-3">
                                            <File className="w-6 h-6" />
                                        </div>
                                        <p className="text-[13px] font-semibold" style={{ color: 'var(--color-success)' }}>{formData.fileName}</p>
                                        <p className="text-[11px] mt-1" style={{ color: 'var(--color-text-muted)' }}>{(formData.file.size / 1024).toFixed(1)} KB</p>
                                        <button onClick={(e) => { e.stopPropagation(); update('file', null); update('fileName', ''); }}
                                            className="mt-3 text-[12px] font-medium flex items-center gap-1 mx-auto" style={{ color: '#b91c1c' }}>
                                            <X className="w-3 h-3" /> Remove
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                                            style={{ background: 'var(--color-accent-bg)' }}>
                                            <CloudUpload className="w-7 h-7" style={{ color: 'var(--color-accent)' }} />
                                        </div>
                                        <p className="text-[14px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                            Drag and drop your certificate here
                                        </p>
                                        <p className="text-[12px] mt-1" style={{ color: 'var(--color-text-muted)' }}>or click to browse from your device</p>
                                    </>
                                )}
                                <input id="fileInput" type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileDrop} className="hidden" />
                            </div>

                            <div className="flex justify-between mt-8">
                                <button onClick={() => setStep(2)} className="btn-secondary"><ChevronLeft className="w-4 h-4" /> Back</button>
                                <button onClick={() => setStep(4)} className="btn-primary">Review <ChevronRight className="w-4 h-4" /></button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review */}
                    {step === 4 && (
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-7">
                                <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                                <div>
                                    <h3 className="text-[15px] font-bold" style={{ color: 'var(--color-text-primary)' }}>Review & Submit</h3>
                                    <p className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>Verify all details before submission</p>
                                </div>
                            </div>

                            <div className="p-6 rounded-xl" style={{ background: 'var(--color-bg-muted)', border: '1px solid var(--color-border-light)' }}>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    {[
                                        { label: 'Category', value: formData.category?.replace('_', ' ') },
                                        { label: 'Title', value: formData.title },
                                        { label: 'Date', value: formData.eventDate },
                                        { label: 'Organizing Body', value: formData.organizingBody || '—' },
                                        ...(isEvent ? [
                                            { label: 'Geographic Level', value: formData.geographicLevel },
                                            { label: 'Achievement', value: formData.achievementTier?.replace('_', ' ') },
                                        ] : []),
                                        ...(isPlacement ? [
                                            { label: 'Sector', value: formData.sectorType },
                                            { label: 'Salary (LPA)', value: formData.salaryLPA || '—' },
                                        ] : []),
                                        { label: 'Evidence', value: formData.fileName || 'No file' },
                                    ].map(item => (
                                        <div key={item.label}>
                                            <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-muted)' }}>{item.label}</p>
                                            <p className="text-[13px] font-semibold mt-1" style={{ color: 'var(--color-text-primary)' }}>{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between mt-8">
                                <button onClick={() => setStep(3)} className="btn-secondary"><ChevronLeft className="w-4 h-4" /> Back</button>
                                <button onClick={handleSubmit} className="btn-primary">
                                    <CheckCircle2 className="w-4 h-4" /> Submit for Verification
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
