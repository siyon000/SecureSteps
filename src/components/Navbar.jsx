import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import DarkModeToggle from './DarkModeToggle';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 px-4 py-3 shadow-lg">
            <div className="max-w-7xl mx-auto">
                {/* Desktop Navigation */}
                <div className="flex justify-between items-center">
                    <Logo />

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg text-white hover:bg-indigo-600 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Desktop Menu Items */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/checklist">Checklist</NavLink>
                        <NavLink to="/quiz">Quiz</NavLink>
                        <DarkModeToggle />
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} pt-4`}>
                    <div className="flex flex-col space-y-3 pb-3">
                        <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
                        <MobileNavLink to="/checklist" onClick={() => setIsOpen(false)}>Checklist</MobileNavLink>
                        <MobileNavLink to="/quiz" onClick={() => setIsOpen(false)}>Quiz</MobileNavLink>
                        <div className="flex justify-center pt-2">
                            <DarkModeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function NavLink({ to, children }) {
    return (
        <Link
            to={to}
            className="text-indigo-100 hover:text-white font-medium transition-all duration-200 
                       hover:scale-105 transform px-3 py-2 rounded-lg hover:bg-indigo-600"
        >
            {children}
        </Link>
    );
}

function MobileNavLink({ to, children, onClick }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="text-white text-center block py-2 px-4 rounded-lg 
                       hover:bg-indigo-600 transition-colors duration-200"
        >
            {children}
        </Link>
    );
}
export default Navbar;
