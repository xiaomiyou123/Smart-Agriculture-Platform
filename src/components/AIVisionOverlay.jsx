import React, { useState, useEffect } from 'react';
import { Scan, AlertTriangle, CheckCircle } from 'lucide-react';
import { useDeepAgri } from '../ai/DeepAgriContext';

const AIVisionOverlay = ({ imageUrl, onClose }) => {
    const [analysisState, setAnalysisState] = useState('scanning'); // scanning, complete
    const [detections, setDetections] = useState([]);
    const { analyzeImage } = useDeepAgri();

    useEffect(() => {
        const runAnalysis = async () => {
            // Simulate API call to AI model
            const result = await analyzeImage(imageUrl);

            // Generate random bounding boxes for simulation
            const mockDetections = [
                { x: 20, y: 30, width: 15, height: 15, label: 'Nitrogen Def.', confidence: 0.89, type: 'warning' },
                { x: 60, y: 50, width: 20, height: 20, label: 'Healthy Crop', confidence: 0.98, type: 'success' },
                { x: 40, y: 70, width: 10, height: 10, label: 'Pest Risk', confidence: 0.75, type: 'danger' },
            ];

            setDetections(mockDetections);
            setAnalysisState('complete');
        };

        runAnalysis();
    }, [imageUrl, analyzeImage]);

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.3s ease'
        }}>
            <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '80vh' }}>
                <img
                    src={imageUrl}
                    alt="Analysis Target"
                    style={{
                        maxWidth: '100%',
                        maxHeight: '80vh',
                        borderRadius: '8px',
                        border: '2px solid #3b82f6'
                    }}
                />

                {/* Scanning Effect */}
                {analysisState === 'scanning' && (
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, height: '4px',
                        backgroundColor: '#3b82f6',
                        boxShadow: '0 0 15px #3b82f6',
                        animation: 'scan 2s linear infinite'
                    }} />
                )}

                {/* Bounding Boxes */}
                {analysisState === 'complete' && detections.map((det, idx) => (
                    <div key={idx} style={{
                        position: 'absolute',
                        left: `${det.x}%`, top: `${det.y}%`,
                        width: `${det.width}%`, height: `${det.height}%`,
                        border: `2px solid ${det.type === 'success' ? '#10b981' : det.type === 'warning' ? '#f59e0b' : '#ef4444'}`,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        animation: 'scaleIn 0.3s ease forwards',
                        animationDelay: `${idx * 0.2}s`,
                        opacity: 0
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-25px', left: '-2px',
                            backgroundColor: det.type === 'success' ? '#10b981' : det.type === 'warning' ? '#f59e0b' : '#ef4444',
                            color: 'white',
                            padding: '2px 6px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            {det.confidence > 0.9 ? <CheckCircle size={10} /> : <AlertTriangle size={10} />}
                            {det.label} {(det.confidence * 100).toFixed(0)}%
                        </div>
                    </div>
                ))}
            </div>

            {/* Control Panel */}
            <div style={{
                marginTop: '1rem',
                backgroundColor: 'white',
                padding: '1rem 2rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                minWidth: '400px'
            }}>
                <div>
                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Scan color="#3b82f6" />
                        Deep-Agri Vision
                    </h3>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#6b7280' }}>
                        {analysisState === 'scanning' ? '正在分析像素点...' : `检测到 ${detections.length} 个特征目标`}
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="btn btn-outline"
                    style={{ marginLeft: 'auto' }}
                >
                    关闭视图
                </button>
            </div>

            <style>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default AIVisionOverlay;
