import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useDeepAgri } from '../ai/DeepAgriContext';
import AIChatAssistant from './AIChatAssistant';

const Layout = () => {
    const { systemStatus, activeNodes, lastInsight } = useDeepAgri();

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <main style={{
                flex: 1,
                marginLeft: '260px',
                padding: '2rem',
                backgroundColor: 'var(--color-bg-main)',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* AI Status Bar */}
                <div style={{
                    marginBottom: '2rem',
                    padding: '1rem',
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderLeft: `4px solid ${systemStatus === 'analyzing' ? '#3b82f6' : systemStatus === 'optimizing' ? '#10b981' : '#6b7280'}`
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '10px', height: '10px', borderRadius: '50%',
                            backgroundColor: systemStatus === 'idle' ? '#10b981' : '#3b82f6',
                            animation: systemStatus !== 'idle' ? 'pulse 1.5s infinite' : 'none'
                        }} />
                        <div>
                            <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>DEEP-AGRI STATUS</h3>
                            <p style={{ margin: 0, fontWeight: '600', textTransform: 'uppercase' }}>{systemStatus}</p>
                        </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>Active Nodes: <strong>{activeNodes}</strong></p>
                        {lastInsight && <p style={{ margin: 0, fontSize: '0.8rem', color: '#3b82f6' }}>{lastInsight}</p>}
                    </div>
                </div>

                <div className="container" style={{ flex: 1 }}>
                    <Outlet />
                </div>
                <AIChatAssistant />
            </main>
        </div>
    );
};

export default Layout;
