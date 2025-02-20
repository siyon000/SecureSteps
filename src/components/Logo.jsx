import { Link } from 'react-router-dom';

export function Logo() {
    return (
        <Link to="/" className="flex items-center space-x-4 hover:opacity-90 transition-all duration-300 group">
            <svg
                className="w-12 h-12 text-indigo-600 transform group-hover:scale-105 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 2L3 7V13C3 17.4183 7.02944 21.4183 12 23C16.9706 21.4183 21 17.4183 21 13V7L12 2Z"
                    className="fill-indigo-100 dark:fill-indigo-900"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path
                    d="M8 12H16M12 8V16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="opacity-70"
                />
                <circle
                    cx="12"
                    cy="12"
                    r="3"
                    className="fill-indigo-600 dark:fill-indigo-400"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
            </svg>
            <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r text-white bg-clip-text ">
                    SecureSteps
                </span>
            </div>
        </Link>
    );
}
