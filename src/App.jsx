import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Checklist from './pages/Checklist';
import Quiz from './pages/Quiz';

export const ThemeContext = createContext();

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
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
      {/* ✅ Set correct basename for GitHub Pages */}
      <BrowserRouter basename="/SecureSteps">
        <div className={`min-h-screen flex flex-col transition-colors duration-300 
          ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
          <Navbar />
          <main className="container mx-auto px-4 py-8 pt-20 flex-grow"> {/* ✅ Prevents navbar overlap */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checklist" element={<Checklist />} />
              <Route path="/quiz" element={<Quiz />} />
              {/* ✅ Redirect unmatched routes to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
