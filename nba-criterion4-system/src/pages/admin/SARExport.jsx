import { useState } from 'react';
import TopBar from '../../components/layout/TopBar';
import {
    achievements, outcomes, cohortData, academicPerformance,
    calculateAPI, calculatePlacementIndex, professionalChapters, geoLabels
} from '../../data/mockData';
import {
    FileSpreadsheet, Download, Printer, Calculator,
    CheckCircle2, BookOpen, Award, Briefcase
} from 'lucide-react';

export default function SARExport() {
    const [activeTab, setActiveTab] = useState('api');
    const approved = achievements.filter(a => a.verificationStatus === 'APPROVED');
    const approvedOutcomes = outcomes.filter(o => o.verificationStatus === 'APPROVED');

    const tabs = [
        { id: 'api', label: 'Academic Performance (B.4.5a)', icon: Calculator },
        { id: 'placement', label: 'Placement Index (4.5/4.6)', icon: Briefcase },
        { id: 'activities', label: 'Professional Activities (4.6)', icon: Award },
        { id: 'chapters', label: 'Professional Societies (4.6.1)', icon: BookOpen },
    ];

    const exportBtns = (
        <div className="flex gap-2">
            <button className="btn-secondary text-[12px] py-2"><Download className="w-3.5 h-3.5" /> Excel</button>
            <button className="btn-primary text-[12px] py-2"><Download className="w-3.5 h-3.5" /> PDF</button>
        </div>
    );

    // Table: API
    const renderAPI = () => {
        const rows = [];
        ['2022-23', '2023-24', '2024-25'].forEach(year => {
            [2, 3].forEach(yr => {
                const d = academicPerformance.find(p => p.academicYear === year && p.yearOfStudy === yr);
                if (d) rows.push({ year, yearOfStudy: yr, ...d, api: calculateAPI(d) });
            });
        });
        const avg = rows.length > 0 ? rows.reduce((s, r) => s + r.api, 0) / rows.length : 0;

        return (
            <div className="animate-in">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-[13px] font-bold" style={{ color: 'var(--color-text-primary)' }}>Table B.4.5a — Academic Performance Index</h3>
                        <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>API = X × (Y/Z)</p>
                    </div>
                    {exportBtns}
                </div>
                <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--color-border)' }}>
                    <table className="nba-table">
                        <thead>
                            <tr>
                                <th>Academic Year</th><th>Year of Study</th><th>Appeared (Z)</th><th>Passed (Y)</th>
                                <th>Mean GPA (X)</th><th>Pass Rate</th>
                                <th style={{ background: 'var(--color-accent-bg)', color: 'var(--color-accent)' }}>API Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((r, i) => (
                                <tr key={i}>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{r.year}</td>
                                    <td>{r.yearOfStudy === 2 ? '2nd Year' : '3rd Year'}</td>
                                    <td className="text-center">{r.totalStudents}</td>
                                    <td className="text-center">{r.passedStudents}</td>
                                    <td className="text-center font-semibold" style={{ color: 'var(--color-accent)' }}>{r.avgGPA.toFixed(2)}</td>
                                    <td className="text-center">{((r.passedStudents / r.totalStudents) * 100).toFixed(1)}%</td>
                                    <td className="text-center text-[16px] font-bold" style={{ color: 'var(--color-accent)', background: 'var(--color-accent-bg)' }}>{r.api.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={6} className="text-right text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>Average API →</td>
                                <td className="text-center text-[18px] font-black" style={{ color: 'var(--color-accent)', background: 'var(--color-accent-bg)' }}>{avg.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    };

    // Table: Placement
    const renderPlacement = () => {
        const rows = cohortData.map(c => ({ ...c, index: calculatePlacementIndex(c) }));
        const avg = rows.reduce((s, r) => s + r.index, 0) / rows.length;

        return (
            <div className="animate-in">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-[13px] font-bold" style={{ color: 'var(--color-text-primary)' }}>Table B.4.5/4.6 — Placement, Higher Studies & Entrepreneurship</h3>
                        <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>P = ((X + Y + Z) / FS) × 100</p>
                    </div>
                    {exportBtns}
                </div>
                <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--color-border)' }}>
                    <table className="nba-table">
                        <thead>
                            <tr>
                                <th>Year</th><th>Final Year (FS)</th><th>Placed (X)</th><th>Higher Studies (Y)</th>
                                <th>Entrepreneurship (Z)</th><th>Total</th>
                                <th style={{ background: 'var(--color-success-bg)', color: '#047857' }}>Index (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((r, i) => (
                                <tr key={i}>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{r.academicYear}</td>
                                    <td className="text-center">{r.totalFinalYear}</td>
                                    <td className="text-center font-semibold" style={{ color: 'var(--color-accent)' }}>{r.placements}</td>
                                    <td className="text-center">{r.higherStudies}</td>
                                    <td className="text-center">{r.entrepreneurship}</td>
                                    <td className="text-center font-medium">{r.placements + r.higherStudies + r.entrepreneurship}</td>
                                    <td className="text-center text-[16px] font-bold" style={{ color: 'var(--color-success)', background: 'var(--color-success-bg)' }}>{r.index.toFixed(1)}%</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={6} className="text-right text-[11px] uppercase tracking-wider" style={{ color: '#047857' }}>Avg Index →</td>
                                <td className="text-center text-[18px] font-black" style={{ color: 'var(--color-success)', background: 'var(--color-success-bg)' }}>{avg.toFixed(1)}%</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="mt-5 p-5 rounded-xl grid grid-cols-3 gap-4 text-center"
                    style={{ background: 'var(--color-bg-muted)', border: '1px solid var(--color-border-light)' }}>
                    <div>
                        <p className="text-[20px] font-bold" style={{ color: 'var(--color-accent)' }}>{approvedOutcomes.filter(o => o.category === 'PLACEMENT' && o.sectorType === 'IT').length}</p>
                        <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>IT Sector</p>
                    </div>
                    <div>
                        <p className="text-[20px] font-bold" style={{ color: 'var(--color-success)' }}>{approvedOutcomes.filter(o => o.category === 'PLACEMENT' && o.sectorType === 'CORE').length}</p>
                        <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>Core Engineering</p>
                    </div>
                    <div>
                        <p className="text-[20px] font-bold" style={{ color: '#b45309' }}>{approvedOutcomes.filter(o => o.category === 'ENTREPRENEURSHIP').length}</p>
                        <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>Entrepreneurship</p>
                    </div>
                </div>
            </div>
        );
    };

    // Table: Activities
    const renderActivities = () => {
        const years = ['2022-23', '2023-24', '2024-25'];
        const build = (year) => {
            const d = approved.filter(a => a.academicYear === year);
            return {
                year, ws: d.filter(a => a.geographicLevel === 'INSTITUTE' || a.geographicLevel === 'STATE').length,
                os: d.filter(a => a.geographicLevel === 'NATIONAL' || a.geographicLevel === 'INTERNATIONAL').length,
                prizes: d.filter(a => a.achievementTier?.startsWith('WINNER')).length,
                h: d.filter(a => a.category === 'HACKATHON').length, w: d.filter(a => a.category === 'WORKSHOP').length,
                c: d.filter(a => a.category === 'CERTIFICATION').length, p: d.filter(a => a.category === 'PUBLICATION').length,
                conf: d.filter(a => a.category === 'CONFERENCE').length, i: d.filter(a => a.category === 'INTERNSHIP').length,
                total: d.length
            };
        };
        const rows = years.map(build);

        return (
            <div className="animate-in">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="text-[13px] font-bold" style={{ color: 'var(--color-text-primary)' }}>Table B.4.6.3 — Professional Activities</h3>
                        <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Sub-Criterion 4.6</p>
                    </div>
                    {exportBtns}
                </div>
                <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--color-border)' }}>
                    <table className="nba-table">
                        <thead>
                            <tr>
                                <th>Year</th><th>Within State</th><th>Outside</th><th>Prizes</th><th>Hackathons</th>
                                <th>Workshops</th><th>Certs</th><th>Pubs</th><th>Conf</th><th>Intern</th>
                                <th style={{ background: 'var(--color-warning-bg)', color: '#b45309' }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((r, i) => (
                                <tr key={i}>
                                    <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{r.year}</td>
                                    <td className="text-center">{r.ws}</td><td className="text-center">{r.os}</td>
                                    <td className="text-center font-semibold" style={{ color: '#b45309' }}>{r.prizes}</td>
                                    <td className="text-center">{r.h}</td><td className="text-center">{r.w}</td>
                                    <td className="text-center">{r.c}</td><td className="text-center">{r.p}</td>
                                    <td className="text-center">{r.conf}</td><td className="text-center">{r.i}</td>
                                    <td className="text-center text-[16px] font-bold" style={{ color: '#b45309', background: 'var(--color-warning-bg)' }}>{r.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: '#b45309' }}>Total</td>
                                <td className="text-center font-semibold">{rows.reduce((s, r) => s + r.ws, 0)}</td>
                                <td className="text-center font-semibold">{rows.reduce((s, r) => s + r.os, 0)}</td>
                                <td className="text-center font-bold" style={{ color: '#b45309' }}>{rows.reduce((s, r) => s + r.prizes, 0)}</td>
                                <td className="text-center font-semibold">{rows.reduce((s, r) => s + r.h, 0)}</td>
                                <td className="text-center font-semibold">{rows.reduce((s, r) => s + r.w, 0)}</td>
                                <td className="text-center font-semibold">{rows.reduce((s, r) => s + r.c, 0)}</td>
                                <td className="text-center font-semibold">{rows.reduce((s, r) => s + r.p, 0)}</td>
                                <td className="text-center font-semibold">{rows.reduce((s, r) => s + r.conf, 0)}</td>
                                <td className="text-center font-semibold">{rows.reduce((s, r) => s + r.i, 0)}</td>
                                <td className="text-center text-[18px] font-black" style={{ color: '#b45309', background: 'var(--color-warning-bg)' }}>{rows.reduce((s, r) => s + r.total, 0)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    };

    // Table: Chapters
    const renderChapters = () => (
        <div className="animate-in">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-[13px] font-bold" style={{ color: 'var(--color-text-primary)' }}>Table B.4.6.1 — Professional Society Chapters</h3>
                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Student professional chapter activities</p>
                </div>
                {exportBtns}
            </div>
            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--color-border)' }}>
                <table className="nba-table">
                    <thead><tr><th>S.No.</th><th>Society / Chapter</th><th>Status</th><th>Members</th><th>Events (Current Year)</th></tr></thead>
                    <tbody>
                        {professionalChapters.map((ch, i) => (
                            <tr key={ch.name}>
                                <td className="text-center">{i + 1}</td>
                                <td className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{ch.name}</td>
                                <td><span className="badge badge-approved"><CheckCircle2 className="w-3 h-3" />{ch.status}</span></td>
                                <td className="text-center">{ch.members}</td>
                                <td className="text-center font-semibold" style={{ color: 'var(--color-accent)' }}>{ch.eventsThisYear}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3} className="text-right text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>Totals →</td>
                            <td className="text-center font-semibold">{professionalChapters.reduce((s, c) => s + c.members, 0)}</td>
                            <td className="text-center font-bold" style={{ color: 'var(--color-accent)' }}>{professionalChapters.reduce((s, c) => s + c.eventsThisYear, 0)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );

    return (
        <div>
            <TopBar title="Automated SAR Export" subtitle="NBA Criterion 4 Self-Assessment Report Tables" />

            <div className="p-8 space-y-6 max-w-[1200px]">
                {/* Header Card */}
                <div className="card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl icon-accent flex items-center justify-center">
                            <FileSpreadsheet className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-[15px] font-bold" style={{ color: 'var(--color-text-primary)' }}>Generate NBA Criterion 4 Report</h2>
                            <p className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>Auto-computed from verified database records</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="btn-secondary text-[13px]"><Printer className="w-4 h-4" /> Print All</button>
                        <button className="btn-primary text-[13px]"><Download className="w-4 h-4" /> Export Full SAR</button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 animate-in delay-1">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all"
                            style={{
                                background: activeTab === tab.id ? 'var(--color-accent-bg)' : 'var(--color-bg-card)',
                                color: activeTab === tab.id ? 'var(--color-accent)' : 'var(--color-text-muted)',
                                border: `1px solid ${activeTab === tab.id ? 'var(--color-accent-border)' : 'var(--color-border)'}`,
                                boxShadow: activeTab === tab.id ? '0 2px 8px rgba(99,102,241,0.08)' : 'none',
                            }}>
                            <tab.icon className="w-4 h-4" /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="card p-7">
                    {activeTab === 'api' && renderAPI()}
                    {activeTab === 'placement' && renderPlacement()}
                    {activeTab === 'activities' && renderActivities()}
                    {activeTab === 'chapters' && renderChapters()}
                </div>

                {/* Integrity Notice */}
                <div className="flex items-start gap-3 p-5 rounded-xl animate-in delay-2"
                    style={{ background: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)' }}>
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                    <div>
                        <p className="text-[13px] font-semibold" style={{ color: '#047857' }}>Data Integrity Verified</p>
                        <p className="text-[12px] mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                            All data aggregated from verified (APPROVED) records only. Evidence is digitally available for peer team evaluation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
