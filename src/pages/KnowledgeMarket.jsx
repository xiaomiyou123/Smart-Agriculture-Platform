import React from 'react';
import { Sprout, TrendingUp, Star, Download, ShoppingCart, Award } from 'lucide-react';

const KnowledgeMarket = () => {
    const assets = [
        { id: 1, title: '高产番茄水肥配方 V2.0', author: '番茄大王', rating: 4.9, downloads: 1240, price: '¥50', tags: ['番茄', '水肥', '增产'] },
        { id: 2, title: '草莓灰霉病早期AI识别模型', author: 'Deep-Agri Lab', rating: 5.0, downloads: 850, price: '¥120', tags: ['草莓', '病害', 'AI模型'] },
        { id: 3, title: '有机蓝莓全周期种植日历', author: '生态农场主', rating: 4.7, downloads: 560, price: '¥30', tags: ['蓝莓', '有机', '日历'] },
        { id: 4, title: '智能温室节能控温策略', author: 'TechFarmer', rating: 4.8, downloads: 920, price: '¥80', tags: ['温室', '节能', '自动化'] },
    ];

    return (
        <div>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Sprout /> 知识资产市场
                    </h1>
                    <p className="text-muted">将您的种植经验转化为数字资产，与全球农户共享收益。</p>
                </div>
                <button className="btn btn-primary">
                    <Award size={20} style={{ marginRight: '0.5rem' }} />
                    发布我的策略
                </button>
            </div>

            {/* Featured Section */}
            <div className="card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', color: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.8rem' }}>本周精选</span>
                        <h2 style={{ fontSize: '2rem', margin: '1rem 0' }}>Deep-Agri 黄金番茄种植模型</h2>
                        <p style={{ opacity: 0.9, maxWidth: '600px', marginBottom: '1.5rem' }}>
                            基于 500 亩试验田数据训练，AI 动态调整水肥，实测增产 25%。包含全套自动化控制脚本。
                        </p>
                        <button style={{
                            backgroundColor: 'white',
                            color: '#1e3a8a',
                            border: 'none',
                            padding: '0.6rem 1.5rem',
                            borderRadius: '6px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>
                            查看详情
                        </button>
                    </div>
                    <div style={{ fontSize: '8rem', opacity: 0.2 }}>🍅</div>
                </div>
            </div>

            {/* Asset Grid */}
            <h3 style={{ marginBottom: '1.5rem' }}>热门资产</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {assets.map(asset => (
                    <div key={asset.id} className="card" style={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.2s' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                {asset.tags.map(tag => (
                                    <span key={tag} style={{ fontSize: '0.7rem', backgroundColor: '#f3f4f6', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#6b7280' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{asset.title}</h3>
                            <p className="text-sm text-muted">By {asset.author}</p>
                        </div>

                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#f59e0b', fontSize: '0.9rem' }}>
                                <Star size={16} fill="#f59e0b" />
                                <span>{asset.rating}</span>
                                <span className="text-muted" style={{ marginLeft: '0.5rem' }}>({asset.downloads})</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#ef4444' }}>{asset.price}</span>
                                <button className="btn-outline" style={{ padding: '0.4rem', borderRadius: '50%' }}>
                                    <ShoppingCart size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KnowledgeMarket;
