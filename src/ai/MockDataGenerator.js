// Simulates data from Agri-Node sensors
export const generateSoilData = () => {
    return {
        moisture: (Math.random() * 20 + 40).toFixed(1), // 40-60%
        temp: (Math.random() * 10 + 15).toFixed(1), // 15-25°C
        ph: (Math.random() * 1.5 + 5.5).toFixed(1), // 5.5-7.0
        npk: {
            n: Math.floor(Math.random() * 50 + 100),
            p: Math.floor(Math.random() * 30 + 40),
            k: Math.floor(Math.random() * 40 + 80),
        }
    };
};

export const generateEnvironmentalData = () => {
    return {
        airTemp: (Math.random() * 5 + 20).toFixed(1),
        humidity: (Math.random() * 10 + 50).toFixed(0),
        light: Math.floor(Math.random() * 20000 + 30000), // Lux
        co2: Math.floor(Math.random() * 100 + 400),
    };
};

export const generateGrowthStatus = () => {
    const stages = ['Seedling', 'Vegetative', 'Flowering', 'Fruiting', 'Maturation'];
    return stages[Math.floor(Math.random() * stages.length)];
};

export const generateAIInsight = () => {
    const insights = [
        "Detected slight nitrogen deficiency in Sector B. Recommending fertigation adjustment.",
        "Soil moisture optimal. Irrigation paused to conserve water.",
        "Pest risk elevated due to high humidity. Deploying drone for visual inspection.",
        "Growth rate exceeds baseline by 15%. Yield forecast updated.",
        "Solar radiation peak approaching. Adjusting greenhouse shading.",
        "Micro-climate analysis suggests planting strawberries next week.",
    ];
    return insights[Math.floor(Math.random() * insights.length)];
};
