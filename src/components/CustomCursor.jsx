import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const textRef = useRef(null);
    const [cursorText, setCursorText] = useState("Discover");
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

    useEffect(() => {
        if (isTouch) return;
        
        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3" });

        const moveCursor = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);

        const addHover = (e) => {
            // Check if there is data-cursor-text anywhere in the parent chain
            const customText = e.target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text') || "Discover";
            setCursorText(customText);

            gsap.to(cursorRef.current, { scale: 3, duration: 0.3, ease: 'power2.out', backgroundColor: '#C25934' });
            if (textRef.current) {
                gsap.to(textRef.current, { opacity: 1, duration: 0.2 });
            }
        };
        const removeHover = () => {
            gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: 'power2.out', backgroundColor: '#F9F6F0' });
            if (textRef.current) {
                gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
            }
        };

        // Select all standard interactables AND custom text targets
        const interactables = document.querySelectorAll('button, a, .magnetic-card, [data-cursor-text]');
        interactables.forEach((el) => {
            el.addEventListener('mouseenter', addHover);
            el.addEventListener('mouseleave', removeHover);
        });

        // Use MutationObserver or periodic re-bind if elements load dynamically, 
        // but for this site structure it sets correctly after initial mount
        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.querySelectorAll('button, a, .magnetic-card, [data-cursor-text]').forEach((el) => {
                el.removeEventListener('mouseenter', addHover);
                el.removeEventListener('mouseleave', removeHover);
            });
        };
    }, []);

    if (isTouch) return null;

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-4 h-4 rounded-full bg-parchment mix-blend-difference pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        >
            <span ref={textRef} className="text-[3px] font-modern uppercase tracking-widest text-parchment opacity-0 pointer-events-none mb-[0.5px]">
                {cursorText}
            </span>
        </div>
    );
};

export default CustomCursor;
