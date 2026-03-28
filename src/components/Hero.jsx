import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

const Hero = ({ isPreloaderFinished }) => {
    const container = useRef(null);

    useEffect(() => {
        let titleSplit;
        let subtitleSplit;

        const ctx = gsap.context(() => {
            titleSplit = new SplitType('.hero-title-split', { types: 'words, chars' });
            subtitleSplit = new SplitType('.hero-subtitle-split', { types: 'lines' });

            gsap.set(titleSplit.chars, { y: 40, opacity: 0 });
            gsap.set(subtitleSplit.lines, { y: 20, opacity: 0 });
            gsap.set('.hero-btn', { scale: 0.9, opacity: 0 });
            gsap.set('.hero-bottom-bar', { y: 100, opacity: 0 });

            if (!isPreloaderFinished) return;

            gsap.set('.anim-hero-bg', { scale: 1, transformOrigin: '50% 100%', force3D: true });

            const tl = gsap.timeline({ delay: 0.1 });

            tl.to(titleSplit.chars, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.03,
                ease: 'power3.out'
            }, 0);

            tl.to(subtitleSplit.lines, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out'
            }, 0.5);

            tl.to('.hero-btn', {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: 'back.out(1.7)'
            }, 0.8);

            tl.to('.hero-bottom-bar', {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out'
            }, 1.1);

            gsap.to('.anim-hero-bg', {
                yPercent: 15,
                ease: "none",
                force3D: true,
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

        }, container);

        return () => {
            ctx.revert();
            if (titleSplit) titleSplit.revert();
            if (subtitleSplit) subtitleSplit.revert();
        };
    }, [isPreloaderFinished]);

    return (
        <section ref={container} className="relative w-full h-[100dvh] overflow-hidden flex flex-col justify-end pb-16 md:pb-24">
            <div className="absolute inset-0 z-0 bg-[#E8E1CD] pointer-events-none overflow-hidden">
                <div className="anim-hero-bg absolute inset-0 w-full h-full bg-[url('/himalaya_hero.png')] bg-cover bg-center bg-no-repeat will-change-transform"></div>
            </div>

            <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center text-center px-6">
                <h1 className="hero-title-split font-display font-semibold tracking-wide text-4xl sm:text-[2.5rem] md:text-5xl lg:text-[4.2rem] text-[#F9F6F0] leading-[1.1] mb-5">
                    Dine Above the Foothills,<br />Beneath the Peaks
                </h1>
                <p className="hero-subtitle-split font-modern text-[#F9F6F0]/90 text-base md:text-[19px] max-w-2xl leading-relaxed mb-8 font-medium">
                    Authentic Himalayan cuisine, nestled between Shivalik charm and Middle Himalaya grandeur.
                </p>
                <a href="#menu" data-cursor-text="Explore" className="hero-btn bg-[#F0EAD6] text-[#3C2D23] hover:bg-[#E8DFBF] transition-colors text-[16px] font-modern font-bold px-10 py-3.5 rounded-md shadow-lg inline-block">
                    Explore Our Menu
                </a>
            </div>

            <div className="hero-bottom-bar absolute bottom-0 left-0 w-full bg-[#1A1814] text-[#8C8371] px-6 md:px-12 py-3 flex items-center justify-between text-xs font-modern z-30">
                <div className="flex items-center gap-4">
                    <a href="#" className="hover:text-[#F0EAD6] transition-colors" data-cursor-text="Connect">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                    </a>
                    <a href="#" className="hover:text-[#F0EAD6] transition-colors" data-cursor-text="Connect">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                    </a>
                    <a href="#" className="hover:text-[#F0EAD6] transition-colors" data-cursor-text="Connect">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                    </a>
                    <a href="#" className="hover:text-[#F0EAD6] transition-colors" data-cursor-text="Connect">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.65-5.42-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
                    </a>
                </div>
                <div className="flex items-center gap-6">
                    <span className="hidden sm:inline">Contact info</span>
                    <span>prrrestaurants.com</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
