import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    tasks: [
        { id: uuidv4(), text: "I use different passwords for each account", completed: false, isDefault: true },
        { id: uuidv4(), text: "I change my passwords regularly", completed: false, isDefault: true },
        { id: uuidv4(), text: "My passwords combine letters, symbols, and numbers", completed: false, isDefault: true },
        { id: uuidv4(), text: "I enable MFA on all essential accounts", completed: false, isDefault: true },
        { id: uuidv4(), text: "I back up important files offline or to the cloud", completed: false, isDefault: true },
        { id: uuidv4(), text: "I keep apps, browsers, OS, and firmware updated", completed: false, isDefault: true },
        { id: uuidv4(), text: "I download apps only from trusted sources", completed: false, isDefault: true },
        { id: uuidv4(), text: "I avoid clicking on suspicious links", completed: false, isDefault: true },
        { id: uuidv4(), text: "I ignore ads offering free money or prizes", completed: false, isDefault: true },
        { id: uuidv4(), text: "I wipe devices before selling or disposing of them", completed: false, isDefault: true }
    ]
};

const checklistSlice = createSlice({
    name: "checklist",
    initialState,
    reducers: {
        toggleTask: (state, action) => {
            const task = state.tasks.find(t => t.id === action.payload);
            if (task) task.completed = !task.completed;
        },
        addTask: (state, action) => {
            state.tasks.push({ id: uuidv4(), text: action.payload, completed: false, isDefault: false });
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        resetTasks: (state) => {
            state.tasks = initialState.tasks;
        },
    }
});

export const { toggleTask, addTask, deleteTask, resetTasks } = checklistSlice.actions;
export default checklistSlice.reducer;
