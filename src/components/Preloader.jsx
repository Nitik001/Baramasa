import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

const Preloader = ({ onComplete }) => {
    const container = useRef(null);
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            const titleText = new SplitType('.preloader-title span', { types: 'words, chars' });

            gsap.set('.spice-item', { opacity: 0, xPercent: -50, yPercent: -50, z: -500 });
            gsap.set('.dust-splash', { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });
            gsap.set(titleText.chars, { yPercent: 100, opacity: 0, rotateX: -90 });
            gsap.set('.preloader-subtitle span', { yPercent: 100, opacity: 0 });

            const isMobile = window.innerWidth < 768;
            const flightDistX = isMobile ? 120 : 200;
            const flightDistY = isMobile ? 100 : 160;

            tl.fromTo('.spice-1',
                { x: -window.innerWidth, y: -window.innerHeight, rotation: -180, scale: 0.5, opacity: 0 },
                { x: -flightDistX, y: -flightDistY, rotation: 45, scale: 1, opacity: 1, duration: 1.8, ease: 'power3.out' },
                0.1
            )
                .fromTo('.spice-2',
                    { x: window.innerWidth, y: -window.innerHeight, rotation: 180, scale: 0.5, opacity: 0 },
                    { x: flightDistX + 20, y: -flightDistY + 20, rotation: -30, scale: 1, opacity: 1, duration: 1.8, ease: 'power3.out' },
                    0.2
                )
                .fromTo('.spice-3',
                    { x: -window.innerWidth, y: window.innerHeight, rotation: -90, scale: 0.5, opacity: 0 },
                    { x: -flightDistX + 20, y: flightDistY, rotation: 60, scale: 1, opacity: 1, duration: 1.8, ease: 'power3.out' },
                    0.3
                )
                .fromTo('.spice-4',
                    { x: window.innerWidth, y: window.innerHeight, rotation: 90, scale: 0.5, opacity: 0 },
                    { x: flightDistX, y: flightDistY - 10, rotation: -45, scale: 1, opacity: 1, duration: 1.8, ease: 'power3.out' },
                    0.4
                );

            tl.fromTo('.dust-splash',
                { scale: 0.5, opacity: 0 },
                { scale: 2, opacity: 1, duration: 1.5, ease: 'power2.out' },
                1.0
            );

            tl.to(titleText.chars, {
                yPercent: 0,
                opacity: 1,
                rotateX: 0,
                duration: 1.2,
                stagger: 0.05,
                ease: 'power4.out',
                transformOrigin: "bottom center"
            }, 1.5);

            tl.to('.preloader-subtitle span', {
                yPercent: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out'
            }, 1.8);

            tl.to('.spice-item', {
                y: '+=30',
                scale: 0.95,
                rotation: '+=8',
                duration: 2.5,
                ease: 'elastic.out(1, 0.3)',
                stagger: 0.05
            }, 2.4);

            tl.to('.dust-splash', { opacity: 0, duration: 1 }, 4.0);
            tl.to('.spice-item', { opacity: 0, scale: 1.2, y: '+=30', duration: 0.8, ease: 'power2.inOut', stagger: 0.05 }, 4.3);

            tl.to(titleText.chars, {
                yPercent: -100,
                opacity: 0,
                duration: 0.6,
                stagger: 0.02,
                ease: 'power2.in'
            }, 4.5);

            tl.to('.preloader-subtitle span', {
                yPercent: -100,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in'
            }, 4.7);

            if (onComplete) {
                tl.to(container.current, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: 'expo.inOut',
                    onComplete
                }, 5.0);
            }

        }, container);
        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div ref={container} className="fixed inset-0 z-[100] flex items-center justify-center bg-parchment overflow-hidden" style={isTouch ? {} : { perspective: '800px' }}>
            {!isTouch && (
                <div
                    className="dust-splash absolute top-1/2 left-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full mix-blend-multiply pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(194,89,52,0.15) 0%, rgba(197,160,89,0.08) 40%, rgba(249,246,240,0) 70%)',
                        filter: 'blur(30px)'
                    }}
                ></div>
            )}
            {isTouch && (
                <div
                    className="dust-splash absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(194,89,52,0.1) 0%, rgba(249,246,240,0) 70%)'
                    }}
                ></div>
            )}

            <img src="/spices/star_anise_isolated_1772801555117.png" className={`spice-item spice-1 absolute z-0 top-1/2 left-1/2 w-48 h-48 md:w-72 md:h-72 object-contain pointer-events-none will-change-transform ${isTouch ? '' : 'mix-blend-multiply'}`} alt="" />
            <img src="/spices/cinnamon_sticks_isolated_1772801570251.png" className={`spice-item spice-2 absolute z-0 top-1/2 left-1/2 w-64 h-64 md:w-96 md:h-96 object-contain pointer-events-none will-change-transform ${isTouch ? '' : 'mix-blend-multiply'}`} alt="" />

            <div className="preloader-logo relative z-10 flex flex-col items-center text-center will-change-transform">
                <h1 className="preloader-title font-display font-semibold text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] text-charcoal tracking-wide mb-2 overflow-hidden drop-shadow-md">
                    <span className="inline-block relative">Baramasa</span>
                </h1>
                <p className="preloader-subtitle font-heritage italic text-lg sm:text-xl md:text-2xl text-terracotta tracking-widest overflow-hidden drop-shadow-md">
                    <span className="inline-block relative z-10 px-4 py-1">12 months of flavour.</span>
                </p>
            </div>

            <img src="/spices/chili_isolated_1772801607119.png" className={`spice-item spice-3 absolute z-20 top-1/2 left-1/2 w-48 h-48 md:w-72 md:h-72 object-contain pointer-events-none will-change-transform ${isTouch ? '' : 'mix-blend-multiply'}`} alt="" />
            <img src="/spices/cardamom_isolated_1772801626708.png" className={`spice-item spice-4 absolute z-20 top-1/2 left-1/2 w-32 h-32 md:w-48 md:h-48 object-contain pointer-events-none will-change-transform ${isTouch ? '' : 'mix-blend-multiply'}`} alt="" />
        </div>
    );
};

export default Preloader;
