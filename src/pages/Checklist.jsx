import { useState, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ThemeContext } from "../App";
import ProgressBar from "../components/ProgressBar";
import { v4 as uuidv4 } from "uuid";
import { Shield, Key, Lock, Smartphone, Cloud, Download, AlertTriangle, Trash2, Plus, RotateCcw, ListPlus } from 'lucide-react';

const defaultTasks = [
    {
        category: "Password Security",
        icon: <Key className="w-5 h-5" />,
        items: [
            { id: uuidv4(), text: "I use different passwords for each account", completed: false, isDefault: true },
            { id: uuidv4(), text: "I change my passwords regularly", completed: false, isDefault: true },
            { id: uuidv4(), text: "My passwords combine letters, symbols, and numbers", completed: false, isDefault: true },
            { id: uuidv4(), text: "I enable MFA on all essential accounts", completed: false, isDefault: true },
        ]
    },
    {
        category: "Data Protection",
        icon: <Cloud className="w-5 h-5" />,
        items: [
            { id: uuidv4(), text: "I back up important files offline or to the cloud", completed: false, isDefault: true },
            { id: uuidv4(), text: "I wipe devices before selling or disposing of them", completed: false, isDefault: true },
        ]
    },
    {
        category: "System Security",
        icon: <Smartphone className="w-5 h-5" />,
        items: [
            { id: uuidv4(), text: "I keep apps, browsers, OS, and firmware updated", completed: false, isDefault: true },
            { id: uuidv4(), text: "I download apps only from trusted sources", completed: false, isDefault: true },
        ]
    },
    {
        category: "Safe Browsing",
        icon: <AlertTriangle className="w-5 h-5" />,
        items: [
            { id: uuidv4(), text: "I avoid clicking on suspicious links", completed: false, isDefault: true },
            { id: uuidv4(), text: "I ignore ads offering free money or prizes", completed: false, isDefault: true },
        ]
    },
    {
        category: "Custom Tasks",
        icon: <ListPlus className="w-5 h-5" />,
        items: []
    }
];

export function Checklist() {
    const { isDark } = useContext(ThemeContext);
    const [tasks, setTasks] = useLocalStorage("cyberChecklist", defaultTasks.flatMap(category => category.items));
    const [newTask, setNewTask] = useState("");
    const [expandedCategory, setExpandedCategory] = useState("Password Security");

    const handleToggle = (id) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
    };

    const handleAddTask = () => {
        if (newTask.trim() === "") return;
        const newTaskObj = {
            id: uuidv4(),
            text: newTask,
            completed: false,
            isDefault: false,
            category: "Custom Tasks"
        };
        setTasks([...tasks, newTaskObj]);
        setNewTask("");
        // Automatically expand the Custom Tasks category when adding a new task
        setExpandedCategory("Custom Tasks");
    };

    const handleReset = () => {
        setTasks(defaultTasks.flatMap(category => category.items));
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    // Function to get tasks for a category
    const getTasksForCategory = (categoryName) => {
        if (categoryName === "Custom Tasks") {
            return tasks.filter(task => !task.isDefault);
        }
        return tasks.filter(task =>
            defaultTasks
                .find(cat => cat.category === categoryName)
                ?.items
                .some(item => item.text === task.text)
        );
    };

    return (
        <div className={`max-w-lg mx-auto p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-center gap-2 mb-6">
                <Shield className="w-6 h-6 text-indigo-500" />
                <h1 className="text-2xl font-bold text-center">Cyber Hygiene Checklist</h1>
            </div>

            <ProgressBar tasks={tasks} />

            <div className="mt-6 space-y-4">
                {defaultTasks.map((category) => (
                    <div key={category.category} className={`rounded-lg overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <button
                            className={`w-full p-4 flex items-center justify-between text-left
                                ${isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                            onClick={() => setExpandedCategory(
                                expandedCategory === category.category ? null : category.category
                            )}
                        >
                            <div className="flex items-center gap-3">
                                {category.icon}
                                <span className="font-semibold">{category.category}</span>
                            </div>
                            <Lock className={`w-4 h-4 transition-transform ${expandedCategory === category.category ? 'rotate-180' : ''
                                }`} />
                        </button>

                        {expandedCategory === category.category && (
                            <div className="p-4 space-y-2">
                                {getTasksForCategory(category.category).map((task) => (
                                    <div key={task.id}
                                        className={`flex justify-between items-center p-3 rounded-md
                                        ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
                                        <div
                                            className="flex items-center space-x-3 flex-1 cursor-pointer"
                                            onClick={() => handleToggle(task.id)}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => handleToggle(task.id)}
                                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                            <span className={`${task.completed ? "line-through opacity-60" : ""} 
                                                ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                                                {task.text}
                                            </span>
                                        </div>
                                        {!task.isDefault && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(task.id);
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {category.category === "Custom Tasks" && getTasksForCategory(category.category).length === 0 && (
                                    <div className={`text-center p-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        No custom tasks added yet
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <div className="flex">
                    <input
                        type="text"
                        className={`flex-1 p-3 border rounded-l outline-none
                            ${isDark ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                        placeholder="Enter a new cybersecurity task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleAddTask();
                            }
                        }}
                    />
                    <button
                        onClick={handleAddTask}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-r hover:bg-indigo-600 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add
                    </button>
                </div>

                <button
                    onClick={handleReset}
                    className="mt-4 px-4 py-3 bg-purple-500 text-white rounded w-full hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                >
                    <RotateCcw className="w-4 h-4" /> Reset Checklist
                </button>
            </div>
        </div>
    );
}

export default Checklist;