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

import { useDeepAgri } from '../ai/DeepAgriContext';

const Dashboard = () => {
    const { activeNodes, systemStatus, notifications } = useDeepAgri();

    return (
        <div>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        仪表盘 <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', backgroundColor: '#dbeafe', color: '#1e40af', borderRadius: '999px' }}>Deep-Agri V2.0 Online</span>
                    </h1>
                    <p className="text-muted">欢迎回来，AI 正在为您监管 {activeNodes} 个边缘感知节点。</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p className="text-sm text-muted">系统状态</p>
                    <p style={{ color: systemStatus === 'idle' ? '#10b981' : '#3b82f6', fontWeight: '600', textTransform: 'uppercase' }}>
                        {systemStatus === 'idle' ? '● 待机监控中' : '● 正在分析数据...'}
                    </p>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <StatCard
                    title="活跃感知节点"
                    value={activeNodes}
                    icon={Map}
                    color="#2e7d32"
                    subtext="覆盖 1,240 亩农田"
                />
                <StatCard
                    title="AI 托管作物"
                    value="8 种"
                    icon={Sprout}
                    color="#f9a825"
                    subtext="番茄、草莓生长模型已加载"
                />
                <StatCard
                    title="智能灌溉"
                    value={systemStatus === 'optimizing' ? '调整中' : '运行正常'}
                    icon={Droplets}
                    color="#0288d1"
                    subtext="AI 预测今日节水 12%"
                />
                <StatCard
                    title="异常预警"
                    value="0 项"
                    icon={AlertCircle}
                    color="#10b981"
                    subtext="当前无高风险病害"
                />
            </div>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3>Deep-Agri 实时决策日志</h3>
                    <span className="text-sm text-muted">实时同步中...</span>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    paddingRight: '0.5rem'
                }}>
                    {notifications.length === 0 ? (
                        <p className="text-muted text-center py-4">正在等待 AI 生成首条洞察...</p>
                    ) : (
                        notifications.map((item) => (
                            <div key={item.id} style={{
                                display: 'flex',
                                gap: '1rem',
                                padding: '0.75rem',
                                backgroundColor: '#f8fafc',
                                borderRadius: '6px',
                                borderLeft: '3px solid #3b82f6',
                                animation: 'fadeIn 0.5s ease'
                            }}>
                                <span className="text-muted text-sm" style={{ minWidth: '80px', fontFamily: 'monospace' }}>
                                    {item.timestamp}
                                </span>
                                <span style={{ fontSize: '0.95rem' }}>{item.message}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
