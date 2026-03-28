import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Menu from './components/Menu';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const isTouchDevice = () =>
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

export default function App() {
    const [preloaderFinished, setPreloaderFinished] = useState(false);
    const transitionOverlayRef = useRef(null);

    // 1. Initialize Lenis — DESKTOP ONLY (causes jank on mobile)
    useEffect(() => {
        if (isTouchDevice()) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    // 2. Handle Preloader Scroll Lock & ScrollTriggers
    useEffect(() => {
        if (!preloaderFinished) {
            document.body.style.overflow = 'hidden';
            return;
        }

        document.body.style.overflow = '';

        let ctx = gsap.context(() => {
            // Parallax layers — desktop only
            if (!isTouchDevice()) {
                gsap.utils.toArray('[data-speed]').forEach(layer => {
                    gsap.to(layer, {
                        y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
                        ease: "none",
                        scrollTrigger: {
                            trigger: "body",
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 1
                        }
                    });
                });
            }

            // Global Body Color Transitions
            const sections = [
                { trigger: '#hero', color: '#F9F6F0' },
                { trigger: '#story', color: '#1E1008' },
                { trigger: '#menu', color: '#F9F6F0' },
                { trigger: '#location', color: '#1A1A1A' }
            ];

            gsap.set('body', { backgroundColor: '#F9F6F0' });
            let currentColor = '#F9F6F0';

            sections.forEach((sec) => {
                const triggerCircleTransition = (targetColor, direction) => {
                    if (currentColor === targetColor || !transitionOverlayRef.current) return;

                    // On mobile, just instant-swap the color (no clip-path animation)
                    if (isTouchDevice()) {
                        gsap.set('body', { backgroundColor: targetColor });
                        currentColor = targetColor;
                        return;
                    }

                    const origin = direction === "down" ? "50% 100%" : "50% 0%";

                    gsap.killTweensOf(transitionOverlayRef.current);
                    gsap.set(transitionOverlayRef.current, {
                        backgroundColor: targetColor,
                        clipPath: `circle(0% at ${origin})`
                    });

                    gsap.to(transitionOverlayRef.current, {
                        clipPath: `circle(150% at ${origin})`,
                        duration: 1.2,
                        ease: "power2.out",
                        onComplete: () => {
                            gsap.set('body', { backgroundColor: targetColor });
                            currentColor = targetColor;
                            gsap.set(transitionOverlayRef.current, { clipPath: `circle(0% at ${origin})` });
                        }
                    });
                };

                ScrollTrigger.create({
                    trigger: sec.trigger,
                    start: "top 95%",
                    end: "bottom 5%",
                    onEnter: () => triggerCircleTransition(sec.color, "down"),
                    onEnterBack: () => triggerCircleTransition(sec.color, "up")
                });
            });

            ScrollTrigger.refresh();
        });

        return () => ctx.revert();
    }, [preloaderFinished]);

    const isTouch = isTouchDevice();

    return (
        <div id="hero" className="w-full mx-auto relative antialiased text-charcoal md:cursor-none cursor-auto">
            {/* Circle transition overlay — desktop only */}
            {!isTouch && (
                <div ref={transitionOverlayRef} className="fixed inset-0 z-[-1] pointer-events-none will-change-[clip-path]" style={{ clipPath: 'circle(0% at 50% 50%)' }}></div>
            )}

            <CustomCursor />
            <div className="pointer-events-none fixed inset-0 z-[40] shadow-[inset_0_0_150px_rgba(26,26,26,0.15)] mix-blend-multiply transition-opacity duration-1000"></div>

            {/* Parallax spice images — HIDDEN on mobile for performance */}
            {!isTouch && (
                <>
                    <img src="/spices/star_anise_isolated_1772801555117.png" className="absolute top-[80vh] left-[5%] w-24 h-24 object-contain mix-blend-multiply opacity-20 blur-[2px] will-change-transform" data-speed="0.8" loading="lazy" alt="" />
                    <img src="/spices/cardamom_isolated_1772801626708.png" className="absolute top-[160vh] right-[10%] w-16 h-16 object-contain mix-blend-multiply opacity-30 blur-[4px] will-change-transform" data-speed="1.2" loading="lazy" alt="" />
                </>
            )}

            {!preloaderFinished && <Preloader onComplete={() => setPreloaderFinished(true)} />}
            <Navbar />
            <Hero isPreloaderFinished={preloaderFinished} />
            <Philosophy />
            <Menu />
            <Footer />
        </div>
    );
}
