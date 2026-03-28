import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import Magnetic from './Magnetic';

const Hero = ({ isPreloaderFinished }) => {
    const container = useRef(null);
    const [timeTheme, setTimeTheme] = useState("bg-transparent");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            setTimeTheme("bg-[#FDF6E3]/60 mix-blend-color-burn");
        } else if (hour >= 18 || hour < 5) {
            setTimeTheme("bg-[#1A202C]/60 mix-blend-multiply");
        } else {
            setTimeTheme("bg-transparent");
        }
    }, []);

    useEffect(() => {
        let titleSplit;
        let subtitleSplit;

        const ctx = gsap.context(() => {
            titleSplit = new SplitType('.hero-title-split', { types: 'words, chars' });
            subtitleSplit = new SplitType('.hero-subtitle-split', { types: 'lines' });

            gsap.set(titleSplit.chars, { y: 40, opacity: 0 });
            gsap.set(subtitleSplit.lines, { y: 20, opacity: 0 });
            gsap.set('.hero-btn', { scale: 0.9, opacity: 0 });
            gsap.set('.hero-divider', { y: 100, opacity: 0 });

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

            tl.to('.hero-divider', {
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

            gsap.to('.mist-layer', {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
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
        <section ref={container} className="relative w-full h-[100dvh] overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0 z-0 bg-[#E8E1CD] pointer-events-none overflow-hidden">
                <div className="anim-hero-bg absolute inset-0 w-full h-full bg-[url('/himalaya_hero.png')] bg-cover bg-center bg-no-repeat will-change-transform"></div>
                <div className={`absolute inset-0 transition-colors duration-1000 ${timeTheme}`}></div>
            </div>

            {/* Subtle Mist Layer — hidden on mobile for performance */}
            <div className="mist-layer hidden sm:block absolute inset-x-0 bottom-0 h-[40vh] z-10 pointer-events-none mix-blend-screen overflow-hidden opacity-40">
                <div className="w-[200%] h-full flex items-end animate-[marquee_50s_linear_infinite] blur-[30px]">
                    <div className="w-1/2 h-[120%] bg-gradient-to-t from-[#E8E1CD] via-[#E8E1CD]/50 to-transparent rounded-[100%] translate-y-1/3 scale-150"></div>
                    <div className="w-1/2 h-[120%] bg-gradient-to-t from-[#E8E1CD] via-[#E8E1CD]/50 to-transparent rounded-[100%] translate-y-1/3 scale-150"></div>
                </div>
            </div>

            <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center text-center px-5 mt-20 md:mt-24">
                <h1 className="hero-title-split font-display font-semibold tracking-wide text-[2rem] sm:text-[2.5rem] md:text-5xl lg:text-[4.2rem] text-[#F9F6F0] leading-[1.1] mb-4 md:mb-5">
                    Dine Above the Foothills,<br />Beneath the Peaks
                </h1>
                <p className="hero-subtitle-split font-modern text-[#F9F6F0]/90 text-sm sm:text-base md:text-[19px] max-w-xs sm:max-w-sm md:max-w-2xl leading-relaxed mb-7 md:mb-8 font-medium">
                    Authentic Himalayan cuisine, nestled between Shivalik charm and Middle Himalaya grandeur.
                </p>
                <div className="hero-btn">
                    <Magnetic>
                        <a href="#menu" data-cursor-text="Explore" className="bg-[#F0EAD6] text-[#3C2D23] hover:bg-[#E8DFBF] active:bg-[#E0D5A0] transition-colors text-base md:text-[16px] font-modern font-bold px-8 md:px-10 py-4 md:py-3.5 rounded-md shadow-lg inline-block min-h-[52px] flex items-center">
                            Explore Our Menu
                        </a>
                    </Magnetic>
                </div>
            </div>

            {/* Flowing River / Mountain Slope Section Divider */}
            <div className="hero-divider absolute bottom-[-1px] left-0 w-full z-30 pointer-events-none">
                <svg viewBox="0 0 1440 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-[#1E1008]">
                    <path d="M0,60 C240,160 480,20 720,100 C960,180 1200,80 1440,140 L1440,220 L0,220 Z" fill="currentColor"/>
                </svg>
            </div>
        </section>
    );
};

export default Hero;
