import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Menu = () => {
    const container = useRef(null);
    const trackRef = useRef(null);

    const menuPages = [
        { id: 1, image: "/menu-pages/page-01.jpg", alt: "Baramasa Menu Front Cover" },
        { id: 2, image: "/menu-pages/page-02.jpg", alt: "Baramasa Menu Appetizers" },
        { id: 3, image: "/menu-pages/page-03.jpg", alt: "Baramasa Menu Main Course" },
        { id: 4, image: "/menu-pages/page-04.jpg", alt: "Baramasa Menu Specialties" },
        { id: 5, image: "/menu-pages/page-05.jpg", alt: "Baramasa Menu Drinks" },
        { id: 6, image: "/menu-pages/page-06.jpg", alt: "Baramasa Menu Desserts" },
        { id: 7, image: "/menu-pages/page-07.jpg", alt: "Baramasa Menu Back Cover" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(trackRef.current, {
                x: () => -(trackRef.current.scrollWidth - window.innerWidth) + "px",
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "+=300%",
                    scrub: 1.5,
                    pin: true,
                    invalidateOnRefresh: true
                }
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section id="menu" ref={container} className="w-full relative h-screen overflow-hidden">
            <div className="absolute top-12 md:top-24 left-6 lg:left-12 z-20">
                <p className="font-modern uppercase tracking-widest text-olive text-sm font-semibold mb-2">
                    Seasonal Artifacts
                </p>
                <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
                    <h2 className="font-display text-4xl md:text-5xl lg:text-5xl text-charcoal">
                        The Menu
                    </h2>
                    <a
                        href="/Baramasa.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-text="View PDF"
                        className="inline-flex items-center gap-2 text-olive hover:text-terracotta transition-colors font-modern uppercase tracking-widest text-xs font-semibold group pb-2 md:mb-1"
                    >
                        <span className="border-b border-olive/30 group-hover:border-terracotta transition-colors pb-1">View Full PDF</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>

            <div
                ref={trackRef}
                className="flex items-center h-full w-[max-content] px-[10vw] gap-[5vw] pt-20"
            >
                {menuPages.map((item) => {
                    const cardRef = useRef(null);

                    const handleMouseMove = (e) => {
                        if (!cardRef.current) return;
                        if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
                        const rect = cardRef.current.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;

                        const rotateX = ((y - centerY) / centerY) * -5;
                        const rotateY = ((x - centerX) / centerX) * 5;

                        gsap.to(cardRef.current, {
                            rotateX,
                            rotateY,
                            transformPerspective: 1000,
                            ease: "power2.out",
                            duration: 0.4
                        });
                    };

                    const handleMouseLeave = () => {
                        if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
                        gsap.to(cardRef.current, {
                            rotateX: 0,
                            rotateY: 0,
                            ease: "power3.out",
                            duration: 0.7
                        });
                    };

                    return (
                        <div
                            key={item.id}
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            data-cursor-text="Read"
                            className="menu-card magnetic-card group relative h-[70vh] w-[85vw] md:w-[60vw] lg:w-[45vw] max-w-[700px] shrink-0 overflow-hidden cursor-none shadow-2xl will-change-transform"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <img
                                src={item.image}
                                alt={item.alt}
                                loading="lazy"
                                className="w-full h-full object-contain pointer-events-none"
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Menu;
