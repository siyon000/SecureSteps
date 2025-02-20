import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Checklist } from './pages/Checklist';
import { Quiz } from './pages/Quiz';

export const ThemeContext = createContext();

function App() {
  const [isDark, setIsDark] = useState(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    // Update classList and localStorage
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <Router>
        <div className={`min-h-screen transition-colors duration-300 
          ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checklist" element={<Checklist />} />
              <Route path="/quiz" element={<Quiz />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;