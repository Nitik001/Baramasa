import React, { useEffect, useState } from 'react';
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

export default function App() {
    const [preloaderFinished, setPreloaderFinished] = useState(false);

    // 1. Initialize Lenis globally exactly once
    useEffect(() => {
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
            lenis.raf(time * 1000)
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    // 2. Handle Preloader Scroll Lock & Late ScrollTriggers
    useEffect(() => {
        if (!preloaderFinished) {
            document.body.style.overflow = 'hidden';
            return;
        }

        // Unlock scroll
        document.body.style.overflow = '';

        // Give DOM a frame to update before building ScrollTriggers
        let ctx = gsap.context(() => {
            // Initialize parallax elements once preloader is done
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

            // Global Body Color Transitions
            const sections = [
                { trigger: '#hero', color: '#F9F6F0' }, // Parchment
                { trigger: '#story', color: '#4A5D23' }, // Olive Canopy
                { trigger: '#menu', color: '#F9F6F0' }, // Parchment
                { trigger: '#location', color: '#1A1A1A' } // Charcoal Ink
            ];

            gsap.set('body', { backgroundColor: '#F9F6F0' });

            sections.forEach((sec) => {
                ScrollTrigger.create({
                    trigger: sec.trigger,
                    start: "top 40%",
                    end: "bottom 40%",
                    onEnter: () => gsap.to('body', { backgroundColor: sec.color, duration: 1, ease: 'power2.inOut' }),
                    onEnterBack: () => gsap.to('body', { backgroundColor: sec.color, duration: 1, ease: 'power2.inOut' })
                });
            });

            // Refresh ScrollTrigger to recalculate everything after un-hiding overflow
            ScrollTrigger.refresh();
        });

        return () => ctx.revert();
    }, [preloaderFinished]);

    return (
        <div id="hero" className="w-full mx-auto relative antialiased text-charcoal md:cursor-none cursor-auto">
            <CustomCursor />
            <div className="pointer-events-none fixed inset-0 z-[40] shadow-[inset_0_0_150px_rgba(26,26,26,0.15)] mix-blend-multiply transition-opacity duration-1000"></div>

            {/* Atmospheric Parallax Elements */}
            <img src="/spices/star_anise_isolated_1772801555117.png" className="absolute top-[80vh] left-[5%] w-24 h-24 object-contain mix-blend-multiply opacity-20 blur-[2px] will-change-transform" data-speed="0.8" />
            <img src="/spices/cardamom_isolated_1772801626708.png" className="absolute top-[160vh] right-[10%] w-16 h-16 object-contain mix-blend-multiply opacity-30 blur-[4px] will-change-transform" data-speed="1.2" />

            {!preloaderFinished && <Preloader onComplete={() => setPreloaderFinished(true)} />}
            <Navbar />
            <Hero isPreloaderFinished={preloaderFinished} />
            <Philosophy />
            <Menu />
            <Footer />
        </div>
    );
}
