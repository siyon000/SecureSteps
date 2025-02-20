import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../App';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
    const { isDark, setIsDark } = useContext(ThemeContext);

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white"
            aria-label="Toggle Dark Mode"
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}