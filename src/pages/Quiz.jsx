import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { answerQuestion, resetQuiz } from '../reducers/quizReducer';
import { ThemeContext } from '../App';

export function Quiz() {
    const dispatch = useDispatch();
    const { questions, userAnswers, score } = useSelector(state => state.quiz);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [isCompleted, setIsCompleted] = React.useState(false);
    const { isDark } = useContext(ThemeContext);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsCompleted(true);
        }
    };

    const handleResetQuiz = () => {
        dispatch(resetQuiz());
        setCurrentQuestionIndex(0);
        setIsCompleted(false);
    };

    const currentQuestion = questions[currentQuestionIndex];

    if (isCompleted) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className={`rounded-2xl shadow-xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                        <h1 className="text-2xl font-bold text-white text-center">Quiz Complete!</h1>
                    </div>
                    <div className="p-6">
                        <div className={`rounded-xl p-8 text-center ${isDark ? 'bg-gray-700' : 'bg-indigo-50'}`}>
                            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                Congratulations!
                            </h2>
                            <p className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-indigo-800'}`}>
                                Your Final Score: {score} / {questions.length}
                            </p>
                            <button
                                onClick={handleResetQuiz}
                                className="bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-200 transform hover:scale-105 w-full sm:w-auto"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className={`rounded-2xl shadow-xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                    <h1 className="text-2xl font-bold text-white text-center">Security Knowledge Quiz</h1>
                </div>
                <div className="p-6">
                    <div className={`rounded-xl p-6 transition-all duration-300 hover:shadow-md ${isDark ? 'bg-gray-700' : 'bg-indigo-50'}`}>
                        <h3 className={`text-lg sm:text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            {currentQuestion.question}
                        </h3>
                        <div className="space-y-3">
                            {currentQuestion.options.map((option) => (
                                <label
                                    key={option}
                                    className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors duration-200 ${isDark
                                        ? 'bg-gray-600 hover:bg-gray-500 text-gray-100'
                                        : 'bg-white hover:bg-gray-50 text-gray-900'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestion.id}`}
                                        value={option}
                                        checked={userAnswers[currentQuestion.id] === option}
                                        onChange={() => {
                                            dispatch(answerQuestion({
                                                questionId: currentQuestion.id,
                                                selectedOption: option
                                            }));
                                        }}
                                        className="w-4 h-4 text-indigo-600"
                                    />
                                    <span className="ml-3">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleNextQuestion}
                            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
                        >
                            {currentQuestionIndex === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
                        </button>

                        <button
                            onClick={handleResetQuiz}
                            className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-200 transform hover:scale-105"
                        >
                            Reset Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quiz;
