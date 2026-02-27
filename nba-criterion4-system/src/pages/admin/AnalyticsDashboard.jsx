import TopBar from '../../components/layout/TopBar';
import {
    achievements, outcomes, cohortData, academicPerformance,
    categoryLabels, geoLabels, calculateAPI, calculatePlacementIndex
} from '../../data/mockData';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, Legend, Area, AreaChart
} from 'recharts';
import { BarChart3, PieChart as PieIcon, TrendingUp, Activity } from 'lucide-react';

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#818cf8', '#60a5fa', '#34d399'];

export default function AnalyticsDashboard() {
    const approved = achievements.filter(a => a.verificationStatus === 'APPROVED');

    const categoryData = Object.entries(categoryLabels)
        .filter(([k]) => !['PLACEMENT', 'HIGHER_STUDIES', 'ENTREPRENEURSHIP'].includes(k))
        .map(([key, label]) => ({ name: label, count: approved.filter(a => a.category === key).length }))
        .sort((a, b) => b.count - a.count);

    const geoData = Object.entries(geoLabels).map(([key, label]) => ({
        name: label, count: approved.filter(a => a.geographicLevel === key).length,
    }));

    const yearTrend = ['2022-23', '2023-24', '2024-25'].map(year => {
        const d = approved.filter(a => a.academicYear === year);
        return {
            year, total: d.length, hackathons: d.filter(a => a.category === 'HACKATHON').length,
            certifications: d.filter(a => a.category === 'CERTIFICATION').length,
            competitions: d.filter(a => a.category === 'COMPETITION').length
        };
    });

    const apiTrend = ['2022-23', '2023-24', '2024-25'].map(year => {
        const y3 = academicPerformance.find(p => p.academicYear === year && p.yearOfStudy === 3);
        const y2 = academicPerformance.find(p => p.academicYear === year && p.yearOfStudy === 2);
        return { year, 'Year 3 API': y3 ? +calculateAPI(y3).toFixed(2) : 0, 'Year 2 API': y2 ? +calculateAPI(y2).toFixed(2) : 0 };
    });

    const placementTrend = cohortData.map(c => ({
        year: c.academicYear, 'Placement Index': +calculatePlacementIndex(c).toFixed(1),
        placements: c.placements, higherStudies: c.higherStudies, entrepreneurship: c.entrepreneurship,
    }));

    const tip = {
        contentStyle: {
            background: '#fff', border: '1px solid var(--color-border)',
            borderRadius: '10px', padding: '10px 14px', fontSize: '12px',
            boxShadow: 'var(--shadow-float)',
        },
        labelStyle: { fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 4 },
    };

    return (
        <div>
            <TopBar title="NBA Analytics Dashboard" subtitle="Criterion 4 Performance Visualization · CAY to CAYm2" />

            <div className="p-8 space-y-6 max-w-[1200px]">
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="card p-7 animate-slide-up delay-1">
                        <div className="flex items-center gap-2 mb-6">
                            <BarChart3 className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                            <h3 className="text-[13px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-primary)' }}>Activities by Category</h3>
                        </div>
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={categoryData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f7" />
                                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} angle={-30} textAnchor="end" height={60} />
                                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} allowDecimals={false} />
                                    <Tooltip {...tip} />
                                    <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={40}>
                                        {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card p-7 animate-slide-up delay-2">
                        <div className="flex items-center gap-2 mb-6">
                            <PieIcon className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                            <h3 className="text-[13px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-primary)' }}>Geographic Distribution</h3>
                        </div>
                        <div className="h-[280px] flex items-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={geoData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="count"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        labelLine={{ stroke: '#cbd5e1' }}>
                                        {geoData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip {...tip} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3 mt-3">
                            {geoData.map((item, i) => (
                                <div key={item.name} className="flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} /> {item.name}: {item.count}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card p-7 animate-slide-up delay-3">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                        <h3 className="text-[13px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-primary)' }}>Year-over-Year Activity Trends</h3>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={yearTrend} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f7" />
                                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} allowDecimals={false} />
                                <Tooltip {...tip} />
                                <Legend wrapperStyle={{ fontSize: '11px', color: '#64748b' }} />
                                <Area type="monotone" dataKey="total" stroke="#6366f1" fill="url(#gradTotal)" strokeWidth={2} name="Total" />
                                <Line type="monotone" dataKey="hackathons" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="Hackathons" />
                                <Line type="monotone" dataKey="certifications" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Certifications" />
                                <Line type="monotone" dataKey="competitions" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} name="Competitions" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="card p-7 animate-slide-up delay-4">
                        <div className="flex items-center gap-2 mb-6">
                            <Activity className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                            <h3 className="text-[13px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-primary)' }}>API Trend</h3>
                        </div>
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={apiTrend} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f7" />
                                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} domain={[5, 9]} />
                                    <Tooltip {...tip} />
                                    <Legend wrapperStyle={{ fontSize: '11px', color: '#64748b' }} />
                                    <Line type="monotone" dataKey="Year 3 API" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 5, fill: '#6366f1' }} />
                                    <Line type="monotone" dataKey="Year 2 API" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 5, fill: '#8b5cf6' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-[10px] mt-3" style={{ color: 'var(--color-text-faint)' }}>API = X × (Y/Z) — Mean GPA × Pass Rate</p>
                    </div>

                    <div className="card p-7 animate-slide-up delay-5">
                        <div className="flex items-center gap-2 mb-6">
                            <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
                            <h3 className="text-[13px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-primary)' }}>Placement Index</h3>
                        </div>
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={placementTrend} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f7" />
                                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} domain={[0, 100]} />
                                    <Tooltip {...tip} />
                                    <Legend wrapperStyle={{ fontSize: '11px', color: '#64748b' }} />
                                    <Bar dataKey="placements" stackId="a" fill="#6366f1" name="Placements" />
                                    <Bar dataKey="higherStudies" stackId="a" fill="#8b5cf6" name="Higher Studies" />
                                    <Bar dataKey="entrepreneurship" stackId="a" fill="#10b981" radius={[6, 6, 0, 0]} name="Entrepreneurship" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-[10px] mt-3" style={{ color: 'var(--color-text-faint)' }}>P = ((X+Y+Z)/FS) × 100</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
