import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Magnetic({ children }) {
    const magnetic = useRef(null);

    useEffect(() => {
        // Prevent on touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return;

        // Use quickTo for optimal performance on mousemove
        const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = magnetic.current.getBoundingClientRect();
            // Calculate distance from center of the element to the cursor
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            
            // Move the element 30% of the distance to the cursor (creating the magnetic pull)
            xTo(x * 0.3);
            yTo(y * 0.3);
        };

        const handleMouseLeave = () => {
            // Snap back to original position
            xTo(0);
            yTo(0);
        };

        const el = magnetic.current;
        if (el) {
            el.addEventListener("mousemove", handleMouseMove);
            el.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (el) {
                el.removeEventListener("mousemove", handleMouseMove);
                el.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, []);

    // Clone the child and attach our ref so we don't have to wrap in an extra div
    return React.cloneElement(children, { ref: magnetic });
}
