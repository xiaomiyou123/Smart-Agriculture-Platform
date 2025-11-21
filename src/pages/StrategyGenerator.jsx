import React, { useState } from 'react';
import { Sprout, Droplets, Sun, Wind, ChevronRight, CheckCircle, BarChart3 } from 'lucide-react';
import { useDeepAgri } from '../ai/DeepAgriContext';

const StrategyGenerator = () => {
    const { systemStatus } = useDeepAgri();
    const [selectedPlot, setSelectedPlot] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [strategy, setStrategy] = useState(null);

    // Mock plots data
    const plots = [
        { id: 1, name: '东区 A-01', soil: { type: 'Loam', ph: 6.5, n: 'Medium', p: 'High', k: 'Medium' } },
        { id: 2, name: '南区 B-03', soil: { type: 'Sandy', ph: 5.8, n: 'Low', p: 'Medium', k: 'High' } },
        { id: 3, name: '西区 C-12', soil: { type: 'Clay', ph: 7.2, n: 'High', p: 'Low', k: 'Medium' } },
    ];

    const handleGenerate = () => {
        if (!selectedPlot) return;
        setIsGenerating(true);

        // Simulate AI processing
        setTimeout(() => {
            setIsGenerating(false);
            setStrategy({
                crop: selectedPlot === '2' ? 'Blueberries' : 'Tomatoes',
                confidence: 94,
                yield_forecast: '+18%',
                timeline: [
                    { week: 1, action: 'Soil Prep', detail: 'Apply organic compost (200kg/mu)' },
                    { week: 2, action: 'Sowing', detail: 'Precision seeding at 2cm depth' },
                    { week: 4, action: 'Fertigation', detail: 'High Nitrogen mix for vegetative growth' },
                    { week: 8, action: 'Pruning', detail: 'Remove lateral shoots to focus energy' },
                    { week: 12, action: 'Harvest', detail: 'Estimated yield: 3500kg' }
                ]
            });
        }, 2500);
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BrainIcon /> 智能策略生成器
                </h1>
                <p className="text-muted">Deep-Agri 根据地块微环境数据，为您定制最优种植方案。</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                {/* Input Section */}
                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem' }}>1. 选择地块</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <label className="text-sm text-muted">目标地块</label>
                        <select
                            value={selectedPlot}
                            onChange={(e) => setSelectedPlot(e.target.value)}
                            style={{
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)',
                                outline: 'none'
                            }}
                        >
                            <option value="">-- 请选择 --</option>
                            {plots.map(p => (
                                <option key={p.id} value={p.id}>{p.name} ({p.soil.type})</option>
                            ))}
                        </select>

                        {selectedPlot && (
                            <div style={{
                                padding: '1rem',
                                backgroundColor: '#f8fafc',
                                borderRadius: '8px',
                                fontSize: '0.9rem'
                            }}>
                                <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>土壤数据预览:</p>
                                {plots.find(p => p.id.toString() === selectedPlot)?.soil && (
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                        <span>pH: {plots.find(p => p.id.toString() === selectedPlot).soil.ph}</span>
                                        <span>N: {plots.find(p => p.id.toString() === selectedPlot).soil.n}</span>
                                        <span>P: {plots.find(p => p.id.toString() === selectedPlot).soil.p}</span>
                                        <span>K: {plots.find(p => p.id.toString() === selectedPlot).soil.k}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        <button
                            className="btn btn-primary"
                            onClick={handleGenerate}
                            disabled={!selectedPlot || isGenerating}
                            style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                        >
                            {isGenerating ? (
                                <>
                                    <span className="loader"></span> AI 计算中...
                                </>
                            ) : (
                                <>
                                    <Sprout size={18} /> 生成策略
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Result Section */}
                <div className="card" style={{ position: 'relative', minHeight: '400px' }}>
                    {!strategy && !isGenerating && (
                        <div style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#9ca3af',
                            opacity: 0.7
                        }}>
                            <BarChart3 size={48} style={{ marginBottom: '1rem' }} />
                            <p>请在左侧选择地块以生成方案</p>
                        </div>
                    )}

                    {isGenerating && (
                        <div style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            animation: 'pulse 1.5s infinite'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
                            <h3>Deep-Agri 正在分析...</h3>
                            <p className="text-muted">正在比对 50,000+ 种种植模式</p>
                        </div>
                    )}

                    {strategy && !isGenerating && (
                        <div style={{ animation: 'fadeIn 0.5s ease' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingBottom: '1rem',
                                borderBottom: '1px solid var(--color-border)',
                                marginBottom: '1.5rem'
                            }}>
                                <div>
                                    <p className="text-sm text-muted">推荐作物</p>
                                    <h2 style={{ fontSize: '1.5rem', color: '#2e7d32' }}>{strategy.crop}</h2>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p className="text-sm text-muted">AI 置信度</p>
                                    <h2 style={{ fontSize: '1.5rem', color: '#3b82f6' }}>{strategy.confidence}%</h2>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p className="text-sm text-muted">预计增产</p>
                                    <h2 style={{ fontSize: '1.5rem', color: '#f59e0b' }}>{strategy.yield_forecast}</h2>
                                </div>
                            </div>

                            <h3 style={{ marginBottom: '1rem' }}>全周期执行时间轴</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                {strategy.timeline.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '1rem', position: 'relative', paddingBottom: '1.5rem' }}>
                                        {/* Line */}
                                        {idx !== strategy.timeline.length - 1 && (
                                            <div style={{
                                                position: 'absolute',
                                                left: '15px',
                                                top: '30px',
                                                bottom: '0',
                                                width: '2px',
                                                backgroundColor: '#e2e8f0'
                                            }} />
                                        )}

                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            backgroundColor: '#dbeafe',
                                            color: '#3b82f6',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '0.8rem',
                                            zIndex: 1
                                        }}>
                                            W{item.week}
                                        </div>
                                        <div>
                                            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{item.action}</h4>
                                            <p className="text-sm text-muted" style={{ margin: 0 }}>{item.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                                <CheckCircle size={18} style={{ marginRight: '0.5rem' }} />
                                采纳此方案并创建任务
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
                .loader {
                    width: 16px;
                    height: 16px;
                    border: 2px solid #ffffff;
                    border-bottom-color: transparent;
                    border-radius: 50%;
                    display: inline-block;
                    box-sizing: border-box;
                    animation: rotation 1s linear infinite;
                }
                @keyframes rotation {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

const BrainIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
);

export default StrategyGenerator;
