import { configureStore } from "@reduxjs/toolkit";
import checklistReducer from "../reducers/checklistReducer"; // Ensure this path is correct
import quizReducer from "../reducers/quizReducer";

export const store = configureStore({
    reducer: {
        checklist: checklistReducer,
        quiz: quizReducer,
    },
});
