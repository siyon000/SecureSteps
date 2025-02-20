import { useState, useEffect } from "react";

// Custom hook to sync with Local Storage
export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        // Check if the value is in localStorage
        if (typeof window !== "undefined") {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        return initialValue;
    });

    const setValue = (value) => {
        // Check if value is a function (for cases like updating based on the old state)
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        // Save to localStorage
        localStorage.setItem(key, JSON.stringify(valueToStore));

        // Update state
        setStoredValue(valueToStore);
    };

    return [storedValue, setValue];
}
