import React, { useState } from 'react';
import { Plus, MapPin, Crop, Droplets, MoreVertical, Edit2, Trash2, Scan } from 'lucide-react';
import Modal from '../components/Modal';
import FarmlandForm from '../components/FarmlandForm';
import AIVisionOverlay from '../components/AIVisionOverlay';

// Mock Data
const initialFarmlands = [
    { id: 1, name: '东区一号田', location: '东区 A-01', area: '120 亩', crop: '玉米', status: '生长中', irrigation: '正常', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, name: '南坡果园', location: '南区 B-03', area: '85 亩', crop: '苹果', status: '成熟期', irrigation: '需维护', image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, name: '西溪水稻田', location: '西区 C-12', area: '200 亩', crop: '水稻', status: '播种期', irrigation: '正常', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, name: '北区试验田', location: '北区 D-05', area: '50 亩', crop: '大豆', status: '休耕', irrigation: '关闭', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1000&auto=format&fit=crop' },
];

const StatusBadge = ({ status }) => {
    const colors = {
        '生长中': { bg: '#e8f5e9', text: '#2e7d32' },
        '成熟期': { bg: '#fff8e1', text: '#f57f17' },
        '播种期': { bg: '#e3f2fd', text: '#1565c0' },
        '休耕': { bg: '#f5f5f5', text: '#757575' },
    };
    const style = colors[status] || colors['休耕'];

    return (
        <span style={{
            backgroundColor: style.bg,
            color: style.text,
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: '600'
        }}>
            {status}
        </span>
    );
};

const FarmlandCard = ({ data, onDelete, onEdit, onAnalyze }) => (
    <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
            <img
                src={data.image}
                alt={data.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                <StatusBadge status={data.status} />
            </div>
            <button
                onClick={(e) => { e.stopPropagation(); onAnalyze(); }}
                style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(59, 130, 246, 0.9)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                <Scan size={14} />
                AI 诊断
            </button>
        </div>

        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{data.name}</h3>
                <button className="btn-outline" style={{ padding: '0.25rem', border: 'none' }}>
                    <MoreVertical size={20} className="text-muted" />
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                    <MapPin size={16} />
                    <span className="text-sm">{data.location}</span>
                    <span style={{ margin: '0 0.25rem' }}>•</span>
                    <span className="text-sm">{data.area}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                    <Crop size={16} />
                    <span className="text-sm">作物: {data.crop}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                    <Droplets size={16} />
                    <span className="text-sm">灌溉: {data.irrigation}</span>
                </div>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                <button
                    className="btn btn-outline"
                    style={{ flex: 1, borderColor: 'var(--color-border)' }}
                    onClick={() => onEdit(data)}
                >
                    <Edit2 size={16} style={{ marginRight: '0.5rem' }} />
                    编辑
                </button>
                <button
                    className="btn btn-outline"
                    style={{ flex: 1, borderColor: '#ffebee', color: '#d32f2f' }}
                    onClick={() => onDelete(data.id)}
                >
                    <Trash2 size={16} style={{ marginRight: '0.5rem' }} />
                    删除
                </button>
            </div>
        </div>
    </div>
);

const FarmlandList = () => {
    const [farmlands, setFarmlands] = useState(initialFarmlands);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFarmland, setEditingFarmland] = useState(null);

    const handleDelete = (id) => {
        if (window.confirm('确定要删除这块农田吗？')) {
            setFarmlands(farmlands.filter(f => f.id !== id));
        }
    };

    const handleAdd = () => {
        setEditingFarmland(null);
        setIsModalOpen(true);
    };

    const handleEdit = (data) => {
        setEditingFarmland(data);
        setIsModalOpen(true);
    };

    const handleSave = (data) => {
        if (editingFarmland) {
            // Update existing
            setFarmlands(farmlands.map(f => f.id === editingFarmland.id ? { ...data, id: f.id } : f));
        } else {
            // Add new
            const newId = Math.max(...farmlands.map(f => f.id), 0) + 1;
            setFarmlands([...farmlands, { ...data, id: newId }]);
        }
        setIsModalOpen(false);
    };

    const [analyzingImage, setAnalyzingImage] = useState(null);

    const handleAnalyze = (image) => {
        setAnalyzingImage(image);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>农田管理</h1>
                    <p className="text-muted">共 {farmlands.length} 块田地，管理您的所有地块信息。</p>
                </div>
                <button className="btn btn-primary" onClick={handleAdd}>
                    <Plus size={20} style={{ marginRight: '0.5rem' }} />
                    新增地块
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {farmlands.map(farm => (
                    <FarmlandCard
                        key={farm.id}
                        data={farm}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onAnalyze={() => handleAnalyze(farm.image)}
                    />
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingFarmland ? '编辑地块' : '新增地块'}
            >
                <FarmlandForm
                    initialData={editingFarmland}
                    onSubmit={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>

            {analyzingImage && (
                <AIVisionOverlay
                    imageUrl={analyzingImage}
                    onClose={() => setAnalyzingImage(null)}
                />
            )}
        </div>
    );
};

export default FarmlandList;
