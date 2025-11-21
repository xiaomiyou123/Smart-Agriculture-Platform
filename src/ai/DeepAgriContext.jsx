import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateAIInsight } from './MockDataGenerator';

const DeepAgriContext = createContext();

export const useDeepAgri = () => useContext(DeepAgriContext);

export const DeepAgriProvider = ({ children }) => {
    const [systemStatus, setSystemStatus] = useState('idle'); // idle, analyzing, optimizing, alert
    const [activeNodes, setActiveNodes] = useState(0);
    const [lastInsight, setLastInsight] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [isAiActive, setIsAiActive] = useState(true);

    // Simulate system startup
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveNodes(prev => {
                if (prev < 248) return prev + Math.floor(Math.random() * 5) + 1;
                return prev;
            });
        }, 200);
        return () => clearInterval(interval);
    }, []);

    // Simulate periodic AI analysis
    useEffect(() => {
        if (!isAiActive) return;

        const loop = setInterval(() => {
            setSystemStatus('analyzing');

            setTimeout(() => {
                const insight = generateAIInsight();
                setLastInsight(insight);
                setNotifications(prev => [
                    { id: Date.now(), message: insight, timestamp: new Date().toLocaleTimeString() },
                    ...prev.slice(0, 9)
                ]);
                setSystemStatus('optimizing');

                setTimeout(() => {
                    setSystemStatus('idle');
                }, 2000);
            }, 3000);

        }, 15000); // Run every 15 seconds

        return () => clearInterval(loop);
    }, [isAiActive]);

    const toggleSystem = () => setIsAiActive(!isAiActive);

    const analyzeImage = async (imageUrl) => {
        setSystemStatus('analyzing');
        return new Promise(resolve => {
            setTimeout(() => {
                setSystemStatus('idle');
                resolve({
                    detected: ['Leaf Spot', 'Healthy Fruit'],
                    confidence: 0.94,
                    recommendation: 'Apply organic fungicide'
                });
            }, 2500);
        });
    };

    const value = {
        systemStatus,
        activeNodes,
        lastInsight,
        notifications,
        isAiActive,
        toggleSystem,
        analyzeImage
    };

    return (
        <DeepAgriContext.Provider value={value}>
            {children}
        </DeepAgriContext.Provider>
    );
};
