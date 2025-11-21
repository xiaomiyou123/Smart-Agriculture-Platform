import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Tractor, BrainCircuit, ClipboardCheck, Sprout } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { path: '/', label: '概览', icon: LayoutDashboard },
        { path: '/strategy', label: '智能策略', icon: BrainCircuit },
        { path: '/farmlands', label: '智能农田', icon: Tractor },
        { path: '/tasks', label: '任务调度', icon: ClipboardCheck },
        { path: '/market', label: '知识资产', icon: Sprout },
    ];

    return (
        <aside style={{
            width: '260px',
            backgroundColor: 'var(--color-bg-sidebar)',
            color: 'white',
            height: '100vh',
            padding: '2rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: 0,
            top: 0,
            boxShadow: 'var(--shadow-lg)',
            zIndex: 10
        }}>
            <div style={{ marginBottom: '3rem', paddingLeft: '1rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '2rem' }}>🌾</span> 智慧农田
                </h1>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            textDecoration: 'none',
                            color: isActive ? 'var(--color-primary-dark)' : 'rgba(255,255,255,0.8)',
                            backgroundColor: isActive ? 'white' : 'transparent',
                            fontWeight: isActive ? '600' : '400',
                            transition: 'all 0.2s ease'
                        })}
                    >
                        <item.icon size={20} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div style={{ marginTop: 'auto', padding: '1rem', fontSize: '0.8rem', opacity: 0.7 }}>
                © 2024 农田管理系统
            </div>
        </aside>
    );
};

export default Sidebar;
