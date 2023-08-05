'use client'

import React, { useState, createContext, useContext } from 'react';

interface GeneralContextType {
    user: any;
    setUser: any
}

export const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

interface GeneralContextProviderProps {
    children: React.ReactNode;
}

export const GeneralContextProvider: React.FC<GeneralContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState()

    

    return (
        <GeneralContext.Provider value={{
            user,
            setUser,
        }}>
        {children}
        </GeneralContext.Provider>
    );
    }

    export const useGeneralContext = (): GeneralContextType => {
    const context = useContext(GeneralContext);
    
    if (!context) {
        throw new Error('useGeneralContext must be used within a GeneralContextProvider');
    }
    
    return context;
};
