import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import HoverRevealImage from './HoverRevealImage';

const Philosophy = () => {
    const container = useRef(null);
    const ornamentRef = useRef(null);

    useEffect(() => {
        const isTouch = window.matchMedia('(pointer: coarse)').matches;

        const ctx = gsap.context(() => {
            // Staggered text reveal — lighter on mobile
            gsap.from('.phil-text', {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 75%",
                },
                y: isTouch ? 20 : 50,
                opacity: 0,
                duration: isTouch ? 0.8 : 1.4,
                stagger: isTouch ? 0.1 : 0.18,
                ease: 'power3.out'
            });

            // Ornament fade + rotate — simplified on mobile
            gsap.from(ornamentRef.current, {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                },
                opacity: 0,
                scale: 0.85,
                rotation: isTouch ? 0 : -20,
                duration: isTouch ? 0.8 : 1.8,
                ease: 'power2.out'
            });

            // Decorative line expand
            gsap.from('.phil-line', {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 75%",
                },
                scaleX: 0,
                duration: isTouch ? 0.6 : 1.2,
                ease: 'power2.inOut'
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="story"
            ref={container}
            className="relative w-full overflow-hidden -mt-[3px]"
            style={{ backgroundColor: '#1E1008' }}
        >
            {/* Grain texture overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                }}
            />

            {/* Warm radial glow centre */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(180,80,20,0.12) 0%, transparent 70%)'
                }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-16 py-20 sm:py-28 lg:py-44">

                {/* Top label + decorative line */}
                <div className="phil-text flex items-center gap-6 mb-10 lg:mb-24">
                    <div
                        className="phil-line h-[1px] w-16 origin-left"
                        style={{ backgroundColor: '#C5A059' }}
                    />
                    <p
                        className="font-modern uppercase tracking-[0.3em] text-xs font-semibold"
                        style={{ color: '#C5A059' }}
                    >
                        Our Philosophy
                    </p>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">

                    {/* LEFT — headline */}
                    <div>
                        <p
                            className="phil-text font-modern uppercase tracking-widest text-xs mb-6 font-medium"
                            style={{ color: 'rgba(249,246,240,0.45)' }}
                        >
                            Most kitchens follow recipes.
                        </p>
                        <h2
                            className="phil-text font-heritage italic font-bold leading-[1.05]"
                            style={{
                                fontSize: 'clamp(2.6rem, 6vw, 5.5rem)',
                                color: '#F2E8D5',
                                textShadow: '0 4px 40px rgba(197,160,89,0.18)'
                            }}
                        >
                            We follow<br />
                            <span style={{ color: '#C5A059' }}>the seasons.</span>
                        </h2>

                        {/* Decorative ornament */}
                        <div ref={ornamentRef} className="mt-10 flex items-center gap-5">
                            <div
                                className="phil-line h-[1px] flex-1 origin-left"
                                style={{ background: 'linear-gradient(90deg, #C5A059 0%, transparent 100%)' }}
                            />
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="opacity-70 flex-shrink-0">
                                <circle cx="14" cy="14" r="3" fill="#C5A059"/>
                                <circle cx="14" cy="14" r="7" stroke="#C5A059" strokeWidth="0.8" strokeDasharray="2 2"/>
                                <line x1="14" y1="0" x2="14" y2="6" stroke="#C5A059" strokeWidth="0.8"/>
                                <line x1="14" y1="22" x2="14" y2="28" stroke="#C5A059" strokeWidth="0.8"/>
                                <line x1="0" y1="14" x2="6" y2="14" stroke="#C5A059" strokeWidth="0.8"/>
                                <line x1="22" y1="14" x2="28" y2="14" stroke="#C5A059" strokeWidth="0.8"/>
                            </svg>
                            <div
                                className="phil-line h-[1px] flex-1 origin-right"
                                style={{ background: 'linear-gradient(270deg, #C5A059 0%, transparent 100%)' }}
                            />
                        </div>
                    </div>

                    {/* RIGHT — body text + pull quote */}
                    <div className="flex flex-col gap-10">
                        <p
                            className="phil-text font-modern text-base md:text-lg leading-[1.9]"
                            style={{ color: 'rgba(249,246,240,0.72)' }}
                        >
                            Rooted in the{' '}
                            <HoverRevealImage text="Himalayan foothills" imageSrc="/menu-pages/page-01.jpg" />{' '}
                            of Dehradun, Baramasa honors the{' '}
                            <HoverRevealImage text="local harvest" imageSrc="/menu-pages/page-02.jpg" />.
                            Gather as a family around our hearth to celebrate{' '}
                            <HoverRevealImage text="timeless traditions" imageSrc="/menu-pages/page-06.jpg" />,
                            where every dish reflects the poetry of the changing calendar.
                        </p>

                        {/* Pull quote */}
                        <blockquote
                            className="phil-text border-l-2 pl-6"
                            style={{ borderColor: '#C25934' }}
                        >
                            <p
                                className="font-heritage italic text-xl md:text-2xl leading-relaxed"
                                style={{ color: '#E8C98A' }}
                            >
                                "Every plate is a letter written to the season that grew it."
                            </p>
                            <cite
                                className="font-modern uppercase tracking-widest text-xs mt-3 block not-italic"
                                style={{ color: 'rgba(249,246,240,0.4)' }}
                            >
                                — Chef's Table, Baramasa
                            </cite>
                        </blockquote>
                    </div>
                </div>
            </div>

            {/* Torn Parchment Section Divider → into Menu (Parchment) */}
            <div className="absolute bottom-[-1px] left-0 w-full z-30 pointer-events-none">
                <svg viewBox="0 0 1440 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path d="M0,130 L1440,130 L1440,65 C1320,130 1180,10 1050,75 C920,140 780,25 640,90 C500,155 340,35 200,100 C100,145 50,70 0,95 Z" fill="#F9F6F0"/>
                </svg>
            </div>
        </section>
    );
};

export default Philosophy;
