import React, { useState, useEffect } from 'react';
import { ClipboardCheck, User, Bot, Clock, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { useDeepAgri } from '../ai/DeepAgriContext';

const TaskCenter = () => {
    const { systemStatus } = useDeepAgri();
    const [tasks, setTasks] = useState([
        { id: 1, type: 'automation', title: 'Zone A Irrigation', status: 'pending', priority: 'high', assignee: 'Auto-System' },
        { id: 2, type: 'manual', title: 'Pruning Apple Trees', status: 'assigned', priority: 'medium', assignee: 'Farmer Li' },
        { id: 3, type: 'manual', title: 'Pest Inspection', status: 'completed', priority: 'high', assignee: 'Farmer Wang' },
    ]);

    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        // Simulate incoming tasks from AI
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const newTasks = [
                    { id: Date.now(), type: 'automation', title: 'Nutrient Adjustment', status: 'pending', priority: 'medium', assignee: 'Auto-System' },
                    { id: Date.now() + 1, type: 'manual', title: 'Harvest Ripe Tomatoes', status: 'pending', priority: 'high', assignee: 'Pending Assignment' }
                ];
                const task = newTasks[Math.floor(Math.random() * newTasks.length)];
                setTasks(prev => [task, ...prev]);
            }
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const handleAssign = (taskId) => {
        setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'assigned', assignee: 'Farmer Zhang' } : t));
    };

    const handleVerify = (taskId) => {
        setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'verified' } : t));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#f59e0b';
            case 'assigned': return '#3b82f6';
            case 'completed': return '#10b981';
            case 'verified': return '#8b5cf6';
            default: return '#6b7280';
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ClipboardCheck /> 智能任务调度中心
                </h1>
                <p className="text-muted">Deep-Agri 自动将农事需求转化为标准化工单，并智能分发给自动化设备或农户。</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Task List */}
                <div className="card">
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                        {['all', 'automation', 'manual'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    border: 'none',
                                    background: 'none',
                                    color: activeTab === tab ? '#3b82f6' : '#6b7280',
                                    fontWeight: activeTab === tab ? '600' : '400',
                                    borderBottom: activeTab === tab ? '2px solid #3b82f6' : 'none',
                                    cursor: 'pointer',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {tab === 'all' ? '全部任务' : tab === 'automation' ? '自动化指令' : '人工工单'}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {tasks.filter(t => activeTab === 'all' || t.type === activeTab).map(task => (
                            <div key={task.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '1rem',
                                backgroundColor: '#f9fafb',
                                borderRadius: '8px',
                                borderLeft: `4px solid ${getStatusColor(task.status)}`
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        padding: '0.5rem',
                                        borderRadius: '50%',
                                        backgroundColor: task.type === 'automation' ? '#dbeafe' : '#fce7f3',
                                        color: task.type === 'automation' ? '#1e40af' : '#be185d'
                                    }}>
                                        {task.type === 'automation' ? <Bot size={20} /> : <User size={20} />}
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '1rem' }}>{task.title}</h4>
                                        <p className="text-sm text-muted" style={{ margin: '0.2rem 0 0 0' }}>
                                            {task.type === 'automation' ? 'AI 自动执行' : '需人工介入'} • 优先级: {task.priority}
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{
                                            fontSize: '0.8rem',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '999px',
                                            backgroundColor: getStatusColor(task.status) + '20',
                                            color: getStatusColor(task.status),
                                            fontWeight: '600',
                                            textTransform: 'uppercase'
                                        }}>
                                            {task.status}
                                        </span>
                                        <p className="text-sm text-muted" style={{ margin: '0.2rem 0 0 0' }}>{task.assignee}</p>
                                    </div>

                                    {task.status === 'pending' && task.type === 'manual' && (
                                        <button
                                            onClick={() => handleAssign(task.id)}
                                            className="btn btn-outline"
                                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                        >
                                            派单
                                        </button>
                                    )}
                                    {task.status === 'completed' && (
                                        <button
                                            onClick={() => handleVerify(task.id)}
                                            className="btn btn-primary"
                                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                        >
                                            AI 验收
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Dispatcher Status */}
                <div className="card" style={{ height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Bot color="#3b82f6" /> 调度大脑状态
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                            <p className="text-sm" style={{ color: '#166534', fontWeight: '600', marginBottom: '0.5rem' }}>自动化覆盖率</p>
                            <h2 style={{ fontSize: '2rem', color: '#15803d', margin: 0 }}>85%</h2>
                            <p className="text-xs text-muted">较上周提升 5%</p>
                        </div>

                        <div style={{ padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                            <p className="text-sm" style={{ color: '#1e40af', fontWeight: '600', marginBottom: '0.5rem' }}>平均响应时间</p>
                            <h2 style={{ fontSize: '2rem', color: '#1d4ed8', margin: 0 }}>1.2s</h2>
                            <p className="text-xs text-muted">AI 实时决策中</p>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>实时调度日志</h4>
                            <div style={{ fontSize: '0.8rem', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <p>• [10:42:05] AI 识别到 Zone B 缺水，已生成灌溉指令</p>
                                <p>• [10:40:12] 收到 Farmer Li 的完工反馈，正在进行视觉验收</p>
                                <p>• [10:38:55] 预测未来 2 小时有雨，暂停户外喷灌计划</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCenter;
