import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Philosophy = () => {
    const container = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.phil-text', {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 70%",
                },
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section id="story" ref={container} className="w-full px-6 py-32 lg:py-48 flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                <p className="phil-text font-modern text-parchment/80 uppercase tracking-widest text-sm mb-6 lg:mb-10 font-semibold">
                    Most kitchens follow recipes.
                </p>
                <h2 className="phil-text font-heritage italic font-bold text-4xl md:text-7xl lg:text-8xl text-gold mb-8 lg:mb-16 leading-[1.1] pb-2">
                    We follow the seasons.
                </h2>
                <p className="phil-text font-modern text-parchment/90 text-base md:text-xl max-w-2xl leading-relaxed">
                    Rooted in the Himalayan foothills of Dehradun, Baramasa honors the local harvest.
                    Gather as a family around our hearth to celebrate timeless traditions, where every
                    dish reflects the poetry of the changing calendar.
                </p>
            </div>
        </section>
    );
};

export default Philosophy;
