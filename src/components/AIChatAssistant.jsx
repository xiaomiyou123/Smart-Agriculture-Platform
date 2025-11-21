import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { useDeepAgri } from '../ai/DeepAgriContext';

const AIChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, type: 'ai', text: '你好！我是 Deep-Agri 农业助手。我可以帮你分析地块数据、生成种植策略或解答农业问题。' }
    ]);
    const messagesEndRef = useRef(null);
    const { analyzeImage } = useDeepAgri();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate AI processing
        setTimeout(() => {
            let aiResponse = "我正在分析相关数据...";

            if (input.includes('番茄') || input.includes('西红柿')) {
                aiResponse = "根据当前 B 区传感器数据，番茄处于开花期。建议将夜间温度控制在 15-18°C，并适当补充磷钾肥以促进坐果。";
            } else if (input.includes('草莓')) {
                aiResponse = "草莓地块湿度偏高 (78%)，存在灰霉病风险。建议开启通风设备，并暂停今日下午的自动喷灌计划。";
            } else if (input.includes('浇水') || input.includes('灌溉')) {
                aiResponse = "已为您生成智能灌溉方案：今日蒸腾量预测为 4.2mm，建议在 18:00 开启滴灌 45 分钟。是否立即执行？";
            } else {
                aiResponse = "收到。Deep-Agri 正在调用知识图谱进行分析，请稍候...";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', text: aiResponse }]);
        }, 1000);
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000,
            fontFamily: 'Inter, sans-serif'
        }}>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <MessageSquare size={28} />
                </button>
            )}

            {isOpen && (
                <div style={{
                    width: '350px',
                    height: '500px',
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    animation: 'slideUp 0.3s ease-out'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '1rem',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Bot size={20} />
                            <span style={{ fontWeight: '600' }}>Deep-Agri Assistant</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div style={{
                        flex: 1,
                        padding: '1rem',
                        overflowY: 'auto',
                        backgroundColor: '#f9fafb',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        {messages.map(msg => (
                            <div key={msg.id} style={{
                                display: 'flex',
                                justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start'
                            }}>
                                <div style={{
                                    maxWidth: '80%',
                                    padding: '0.8rem 1rem',
                                    borderRadius: '12px',
                                    backgroundColor: msg.type === 'user' ? '#3b82f6' : 'white',
                                    color: msg.type === 'user' ? 'white' : '#1f2937',
                                    boxShadow: msg.type === 'ai' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                    borderTopLeftRadius: msg.type === 'ai' ? '2px' : '12px',
                                    borderTopRightRadius: msg.type === 'user' ? '2px' : '12px',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.5'
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div style={{
                        padding: '1rem',
                        borderTop: '1px solid #e5e7eb',
                        display: 'flex',
                        gap: '0.5rem'
                    }}>
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSend()}
                            placeholder="输入您的问题..."
                            style={{
                                flex: 1,
                                padding: '0.6rem 1rem',
                                borderRadius: '20px',
                                border: '1px solid #e5e7eb',
                                outline: 'none',
                                fontSize: '0.9rem'
                            }}
                        />
                        <button
                            onClick={handleSend}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default AIChatAssistant;
