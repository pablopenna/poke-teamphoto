import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserOptions } from '../types';

const LOCAL_STORAGE_KEY = "user-options";

interface UserOptionsContextType {
    userOptions: UserOptions;
    updateUserOptions: (newOptions: Partial<UserOptions>) => void;
    resetUserOptions: () => void;
}

const defaultOptions: UserOptions = {
    buttonStyle: 'icon-only',
};

const OptionsContext = createContext<UserOptionsContextType | undefined>(undefined);

export const UserOptionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [options, setOptions] = useState<UserOptions>(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        return saved ? JSON.parse(saved) : defaultOptions;
    });

    const updateOptions = (newOptions: Partial<UserOptions>) => {
        setOptions(prev => {
            const updated = { ...prev, ...newOptions };
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    const resetOptions = () => {
        setOptions(defaultOptions);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    };

    return (
        <OptionsContext.Provider value={{ userOptions: options, updateUserOptions: updateOptions, resetUserOptions: resetOptions }}>
            {children}
        </OptionsContext.Provider>
    );
};

export const useUserOptions = (): UserOptionsContextType => {
    const context = useContext(OptionsContext);
    if (context === undefined) {
        throw new Error('useUserOptions must be used within an UserOptionsProvider');
    }
    return context;
};