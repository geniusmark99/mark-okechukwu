import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface GradientContextType {
    activeWord: number;
    gradients: string[];
}

const GradientContext = createContext<GradientContextType | undefined>(undefined);

const GradientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const gradients = [
        "bg-gradient-to-r from-green-400 to-blue-500",
        "bg-gradient-to-r from-purple-400 to-pink-500",
        "bg-gradient-to-r from-yellow-400 to-red-500",
        "bg-gradient-to-r from-indigo-400 to-purple-500",
        "bg-gradient-to-r from-teal-400 to-lime-500",
        "bg-gradient-to-r from-pink-400 to-orange-500",
        "bg-gradient-to-r from-red-400 to-yellow-500",
    ];

    const [activeWord, setActiveWord] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveWord((prev) => (prev + 1) % gradients.length);
        }, 1000); // 2 seconds interval

        return () => clearInterval(interval);
    }, [gradients.length]);

    return (
        <GradientContext.Provider value={{ activeWord, gradients }}>
            {children}
        </GradientContext.Provider>
    );
};

export { GradientContext, GradientProvider }