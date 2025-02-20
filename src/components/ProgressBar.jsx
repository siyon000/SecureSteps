import { useContext } from 'react';
import { ThemeContext } from '../App';

export default function ProgressBar({ tasks }) {
    const { isDark } = useContext(ThemeContext);

    if (!tasks || tasks.length === 0) {
        return null;
    }

    const completed = tasks.filter(task => task.completed).length;
    const percentage = (completed / tasks.length) * 100;

    return (
        <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {completed} of {tasks.length} completed
                </span>
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {Math.round(percentage)}%
                </span>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 
                             transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}