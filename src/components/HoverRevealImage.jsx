import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function HoverRevealImage({ text, imageSrc, alt = "Hover Image" }) {
    const textRef = useRef(null);
    const imageRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // Create GSAP quickTo setters for highly performant mouse tracking
    const xTo = useRef(null);
    const yTo = useRef(null);

    useEffect(() => {
        // Initialize quick setters
        xTo.current = gsap.quickTo(imageRef.current, "x", { duration: 0.5, ease: "power3" });
        yTo.current = gsap.quickTo(imageRef.current, "y", { duration: 0.5, ease: "power3" });

        // Ensure pointer-events: coarse (mobile/tablets) don't try to use this effect
        // Instead, we just show standard text and no hover effect.
    }, []);

    const handleMouseMove = (e) => {
        if (!xTo.current || !yTo.current) return;
        if (window.matchMedia('(pointer: coarse)').matches) return;
        
        // Center the image precisely on the cursor
        xTo.current(e.clientX - 150); // 150 is half the image width (300)
        yTo.current(e.clientY - 200); // 200 is half the image height (400)
    };

    const handleMouseEnter = () => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        setIsHovered(true);
        gsap.to(imageRef.current, {
            autoAlpha: 1,
            scale: 1,
            rotation: Math.random() * 10 - 5, // Subtle random tilt
            duration: 0.4,
            ease: "power3.out"
        });
    };

    const handleMouseLeave = () => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        setIsHovered(false);
        gsap.to(imageRef.current, {
            autoAlpha: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "power3.inOut"
        });
    };

    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

    return (
        <span 
            ref={textRef}
            className="relative cursor-none inline-block border-b border-gold/30 hover:border-gold hover:text-gold transition-colors duration-300"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-cursor-text="Reveal"
        >
            {text}
            
            {/* The revealed image portal — desktop only */}
            {!isTouch && (
                <span 
                    ref={imageRef}
                    className="fixed top-0 left-0 w-[300px] h-[400px] pointer-events-none z-[100] opacity-0 invisible origin-center overflow-hidden rounded-lg shadow-2xl block"
                    style={{ transform: 'scale(0.8)' }}
                >
                    <img 
                        src={imageSrc} 
                        alt={alt} 
                        className="w-full h-full object-cover object-center"
                    />
                </span>
            )}
        </span>
    );
}
