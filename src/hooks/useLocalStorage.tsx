import { useEffect, useState } from 'react';

const isDataExpired = (timestamp: number, expiryTimeInMs: number): boolean => {
    return Date.now() - timestamp > expiryTimeInMs;
};

export const useLocalStorage = (key: string, expiryTimeInMs: number) => {
    const [data, setData] = useState<any | null>(null);

    const getFromLocalStorage = () => {
        const storedData = localStorage.getItem(key);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const { data, timestamp } = parsedData;
            if (isDataExpired(timestamp, expiryTimeInMs)) {
                return null;
            }
            return data;
        }
        return null;
    };

    const setToLocalStorage = (data: any) => {
        const timestamp = Date.now();
        localStorage.setItem(key, JSON.stringify({ data, timestamp }));
        setData(data);
    };

    useEffect(() => {
        const localData = getFromLocalStorage();
        setData(localData);
    }, []);

    return { cachedData: data, setData: setToLocalStorage };
};
