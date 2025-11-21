import React from 'react';
import { Sprout, Droplets, Map, AlertCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
                <p className="text-muted text-sm" style={{ marginBottom: '0.5rem' }}>{title}</p>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{value}</h3>
            </div>
            <div style={{
                backgroundColor: `${color}20`,
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                color: color
            }}>
                <Icon size={24} />
            </div>
        </div>
        {subtext && <p className="text-sm text-muted">{subtext}</p>}
    </div>
);

const Dashboard = () => {
    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>仪表盘</h1>
                <p className="text-muted">欢迎回来，这里是您的农田概览。</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <StatCard
                    title="总耕地面积"
                    value="1,240 亩"
                    icon={Map}
                    color="#2e7d32"
                    subtext="较上月增加 12%"
                />
                <StatCard
                    title="在种作物"
                    value="8 种"
                    icon={Sprout}
                    color="#f9a825"
                    subtext="主要作物：玉米、小麦"
                />
                <StatCard
                    title="灌溉系统"
                    value="运行正常"
                    icon={Droplets}
                    color="#0288d1"
                    subtext="下次计划灌溉：2小时后"
                />
                <StatCard
                    title="需关注事项"
                    value="3 项"
                    icon={AlertCircle}
                    color="#d32f2f"
                    subtext="2块地需施肥"
                />
            </div>

            <div className="card">
                <h3 style={{ marginBottom: '1.5rem' }}>近期活动</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                        { time: '10:00', event: '3号地块完成自动灌溉', type: 'info' },
                        { time: '09:30', event: '检测到5号地块土壤湿度过低', type: 'warning' },
                        { time: '昨天', event: '新增“后山果园”地块', type: 'success' },
                    ].map((item, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            gap: '1rem',
                            paddingBottom: '1rem',
                            borderBottom: index !== 2 ? '1px solid var(--color-border)' : 'none'
                        }}>
                            <span className="text-muted text-sm" style={{ minWidth: '60px' }}>{item.time}</span>
                            <span>{item.event}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
