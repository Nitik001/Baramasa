import React, { useState, useEffect, useRef } from 'react';
import { Mountain, Utensils, Menu as MenuIcon, X } from 'lucide-react';
import { gsap } from 'gsap';
import Magnetic from './Magnetic';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const menuRef = useRef(null);
    const linksRef = useRef([]);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!menuRef.current) return;
        
        if (isMobileMenuOpen) {
            gsap.to(menuRef.current, { yPercent: 0, duration: 0.8, ease: "power4.out" });
            gsap.fromTo(linksRef.current, 
                { y: 40, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.3 }
            );
        } else {
            gsap.to(menuRef.current, { yPercent: -100, duration: 0.8, ease: "power4.inOut" });
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-40 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300 ${isScrolled ? 'bg-[#1A1814]/90 backdrop-blur-md shadow-lg py-3' : 'bg-gradient-to-b from-[#1A1814]/80 to-transparent py-4'}`}>
                <div className="flex items-center gap-2 text-2xl font-display font-semibold tracking-wide text-[#F9F6F0]">
                    <div className="flex items-center -mt-1">
                        <Mountain className="w-6 h-6 -mr-1 text-[#F9F6F0]" />
                        <Utensils className="w-4 h-4 text-[#F9F6F0]" />
                    </div>
                    Baramasa
                </div>
                
                <div className="hidden md:flex items-center gap-8 font-modern text-[15px] font-medium text-[#F9F6F0]">
                    <a href="#" className="relative text-white transition-colors duration-300 group">
                        Home
                        <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white"></span>
                    </a>
                    <a href="#menu" className="text-[#F9F6F0]/90 hover:text-white transition-colors duration-300">Menu</a>
                    <a href="#location" className="text-[#F9F6F0]/90 hover:text-white transition-colors duration-300">Reservations</a>
                    <a href="#story" className="text-[#F9F6F0]/90 hover:text-white transition-colors duration-300">About Us</a>
                </div>
                
                <div className="flex items-center gap-4">
                    <Magnetic>
                        <a href="#location" data-cursor-text="Book" className="bg-[#CB4335] hover:bg-[#B03A2E] text-white text-[15px] font-medium px-6 py-2.5 rounded-md transition-colors shadow-sm hidden sm:block">
                            Book a Table
                        </a>
                    </Magnetic>
                    <button className="md:hidden text-[#F9F6F0] p-2" onClick={toggleMenu} aria-label="Toggle Menu">
                        <MenuIcon className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            <div 
                ref={menuRef} 
                className="fixed inset-0 z-50 bg-[#1A1814] flex flex-col justify-center items-center -translate-y-full"
            >
                <button className="absolute top-6 right-6 text-[#F9F6F0] p-2" onClick={toggleMenu} aria-label="Close Menu">
                    <X className="w-8 h-8" />
                </button>
                <div className="flex flex-col items-center gap-8 font-display text-4xl text-[#F9F6F0]">
                    <a href="#" onClick={toggleMenu} className="hover:text-terracotta transition-colors" ref={el => linksRef.current[0] = el}>Home</a>
                    <a href="#menu" onClick={toggleMenu} className="hover:text-terracotta transition-colors" ref={el => linksRef.current[1] = el}>Menu</a>
                    <a href="#location" onClick={toggleMenu} className="hover:text-terracotta transition-colors" ref={el => linksRef.current[2] = el}>Reservations</a>
                    <a href="#story" onClick={toggleMenu} className="hover:text-terracotta transition-colors" ref={el => linksRef.current[3] = el}>About Us</a>
                    <a href="#location" className="bg-[#CB4335] text-white text-lg font-modern font-medium px-8 py-3 rounded-md mt-4 text-center" ref={el => linksRef.current[4] = el} onClick={toggleMenu}>
                        Book a Table
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
