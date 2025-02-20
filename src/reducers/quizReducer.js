import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: [
        { id: 1, question: "What is the first step to protect your accounts?", options: ["Using a strong password", "Sharing passwords", "Using the same password for all accounts"], answer: "Using a strong password" },
        { id: 2, question: "What does 2FA stand for?", options: ["Two-Factor Authentication", "Two-Firewall Access", "Two-Fake Accounts"], answer: "Two-Factor Authentication" },
        { id: 3, question: "Why is it important to update software regularly?", options: ["To fix bugs and security vulnerabilities", "To make the computer slow", "To waste storage"], answer: "To fix bugs and security vulnerabilities" },
        { id: 4, question: "Which of the following is a phishing attack?", options: ["An email asking for your login details", "Downloading software from the official store", "Using a VPN"], answer: "An email asking for your login details" },
        { id: 5, question: "How can you recognize a secure website?", options: ["It has HTTPS and a padlock symbol", "It has many pop-ups", "It asks for your password via email"], answer: "It has HTTPS and a padlock symbol" },
    ],
    userAnswers: {},
    score: 0,
};

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        answerQuestion: (state, action) => {
            const { questionId, selectedOption } = action.payload;
            state.userAnswers[questionId] = selectedOption;

            // Update score
            const correctAnswer = state.questions.find(q => q.id === questionId).answer;
            if (selectedOption === correctAnswer) {
                state.score += 1;
            }
        },
        resetQuiz: (state) => {
            state.userAnswers = {};
            state.score = 0;
        },
    }
});

export const { answerQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
