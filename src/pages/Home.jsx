import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Shield, Lock, RefreshCw, AlertTriangle } from 'lucide-react';

function Home() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDark(darkModeMediaQuery.matches);
        const handleChange = (e) => setIsDark(e.matches);
        darkModeMediaQuery.addEventListener('change', handleChange);
        return () => darkModeMediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4">
            {/* Cyber Hygiene Info Section */}
            <section className="text-center py-12 mb-12">
                <h1 className="text-xl md:text-5xl font-bold mb-6 pb-4 bg-gradient-to-r from-indigo-600 to-purple-600 
                             text-transparent bg-clip-text">
                    Cyber Hygiene: Your Digital Safety Routine
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Cyber hygiene refers to the practices and steps that users take to maintain system health and improve online security.

                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <FeatureCard
                    icon={<Shield className="w-8 h-8 text-indigo-600" />}
                    title="Prevention"
                    description="Learn how to prevent cyber attacks before they happen"
                    isDark={isDark}
                />
                <FeatureCard
                    icon={<Lock className="w-8 h-8 text-indigo-600" />}
                    title="Security"
                    description="Implement strong security measures for your devices"
                    isDark={isDark}
                />
                <FeatureCard
                    icon={<RefreshCw className="w-8 h-8 text-indigo-600" />}
                    title="Updates"
                    description="Stay current with security updates and patches"
                    isDark={isDark}
                />
                <FeatureCard
                    icon={<AlertTriangle className="w-8 h-8 text-indigo-600" />}
                    title="Awareness"
                    description="Recognize and avoid potential security threats"
                    isDark={isDark}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <CTACard
                    title="Test Your Knowledge"
                    description="Take our cyber security quiz to assess your understanding"
                    buttonText="Start Quiz"
                    to="/quiz"
                    gradient="from-indigo-600 to-purple-600"
                />
                <CTACard
                    title="Security Checklist"
                    description="Follow our comprehensive security checklist"
                    buttonText="View Checklist"
                    to="/checklist"
                    gradient="from-purple-600 to-indigo-600"
                />
            </div>

            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-12">
                <h2 className="text-2xl font-bold mb-6 text-black">Essential Cyber Hygiene Tips</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                    <Tip number="01" title="Use Strong Passwords">
                        Create unique, complex passwords for each account and consider using a password manager.
                    </Tip>
                    <Tip number="02" title="Enable Two-Factor Authentication">
                        Add an extra layer of security to your accounts with 2FA.
                    </Tip>
                    <Tip number="03" title="Regular Updates">
                        Keep your software and systems updated to protect against vulnerabilities.
                    </Tip>
                    <Tip number="04" title="Backup Your Data">
                        Regularly backup important data to prevent loss from cyber attacks.
                    </Tip>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description, isDark }) {
    return (
        <div className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow
            ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
            <div className="mb-4">{icon}</div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{description}</p>
        </div>
    );
}

function CTACard({ title, description, buttonText, to, gradient }) {
    return (
        <div className={`bg-gradient-to-r ${gradient} p-8 rounded-xl text-white`}>
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="mb-6 opacity-90">{description}</p>
            <Link
                to={to}
                className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
                {buttonText}
            </Link>
        </div>
    );
}

function Tip({ number, title, children }) {
    return (
        <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
            <div className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mb-2">{number}</div>
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{children}</p>
        </div>
    );
}

export default Home;
