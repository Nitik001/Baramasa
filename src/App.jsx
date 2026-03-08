import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';
import { MapPin, Clock, Phone, Mountain, Utensils } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Custom Blended Cursor
const CustomCursor = () => {
    const cursorRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        // QuickTo for smooth tracking
        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3" });

        const moveCursor = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);

        // Expand logic on interactables
        const addHover = (e) => {
            gsap.to(cursorRef.current, { scale: 3, duration: 0.3, ease: 'power2.out', backgroundColor: '#C25934' });
            if (textRef.current && e.target.closest('.magnetic-card')) {
                gsap.to(textRef.current, { opacity: 1, duration: 0.2 });
            }
        };
        const removeHover = () => {
            gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: 'power2.out', backgroundColor: '#F9F6F0' });
            if (textRef.current) gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
        };

        const interactables = document.querySelectorAll('button, a, .magnetic-card');
        interactables.forEach((el) => {
            el.addEventListener('mouseenter', addHover);
            el.addEventListener('mouseleave', removeHover);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            interactables.forEach((el) => {
                el.removeEventListener('mouseenter', addHover);
                el.removeEventListener('mouseleave', removeHover);
            });
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-4 h-4 rounded-full bg-parchment mix-blend-difference pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        >
            <span ref={textRef} className="text-[3px] font-modern uppercase tracking-widest text-parchment opacity-0 pointer-events-none mb-[0.5px]">Discover</span>
        </div>
    );
};

// Custom Button with magnetic hover effect
const Button = ({ children, className = "", onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-3 rounded-full font-modern transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.02] ${className}`}
        >
            {children}
        </button>
    );
};

// A. NAVBAR — "The Welcoming Arch"
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 flex items-center justify-between px-6 md:px-12 py-5 ${scrolled
                ? 'bg-parchment/95 backdrop-blur-md shadow-sm border-b border-olive/10'
                : 'bg-gradient-to-b from-black/60 to-transparent'
                }`}
        >
            <div className={`flex items-center gap-2 text-2xl font-display font-semibold tracking-wide transition-colors duration-300 ${scrolled ? 'text-charcoal' : 'text-parchment'}`}>
                <div className="flex items-center -mt-1">
                    <Mountain className="w-6 h-6 -mr-1" />
                    <Utensils className="w-4 h-4" />
                </div>
                Baramasa
            </div>
            <div className={`hidden md:flex items-center gap-8 font-modern text-sm tracking-widest font-semibold uppercase transition-colors duration-300 ${scrolled ? 'text-charcoal' : 'text-parchment'}`}>
                <a href="#" className="hover:text-terracotta transition-colors duration-300">Home</a>
                <a href="#menu" className="hover:text-terracotta transition-colors duration-300">Menu</a>
                <a href="#location" className="hover:text-terracotta transition-colors duration-300">Reservations</a>
                <a href="#story" className="hover:text-terracotta transition-colors duration-300">About Us</a>
            </div>
            <Button className="bg-[#C23C34] hover:bg-[#A12E27] text-white text-sm font-semibold hidden sm:block shadow-lg">
                Book a Table
            </Button>
        </nav>
    );
};

// A.5 PRELOADER — "The Dust Settles"
const Preloader = ({ onComplete }) => {
    const container = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            const titleText = new SplitType('.preloader-title span', { types: 'chars' });

            // Initial states
            gsap.set('.spice-item', { opacity: 0, xPercent: -50, yPercent: -50, z: -500 });
            gsap.set('.dust-splash', { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });
            gsap.set(titleText.chars, { yPercent: 100, opacity: 0, rotateX: -90 });
            gsap.set('.preloader-subtitle span', { yPercent: 100, opacity: 0 });

            const isMobile = window.innerWidth < 768;
            const flightDist = isMobile ? 80 : 140;

            // Spices flying in towards CENTER
            tl.fromTo('.spice-1',
                { x: -window.innerWidth / 2, y: -window.innerHeight / 2, rotation: -180, scale: 0.2, opacity: 0, z: 200 },
                { x: -flightDist, y: -flightDist + 20, rotation: 45, scale: 1, z: 0, opacity: 1, duration: 2, ease: 'expo.out' },
                0.1
            )
                .fromTo('.spice-2',
                    { x: window.innerWidth / 2, y: -window.innerHeight / 2, rotation: 180, scale: 0.2, opacity: 0, z: 300 },
                    { x: flightDist + 20, y: -flightDist + 40, rotation: -30, scale: 1, z: 0, opacity: 1, duration: 2, ease: 'expo.out' },
                    0.2
                )
                .fromTo('.spice-3',
                    { x: -window.innerWidth / 2, y: window.innerHeight / 2, rotation: -90, scale: 0.2, opacity: 0, z: 100 },
                    { x: -flightDist + 20, y: flightDist, rotation: 60, scale: 1, z: 0, opacity: 1, duration: 2, ease: 'expo.out' },
                    0.3
                )
                .fromTo('.spice-4',
                    { x: window.innerWidth / 2, y: window.innerHeight / 2, rotation: 90, scale: 0.2, opacity: 0, z: 400 },
                    { x: flightDist, y: flightDist - 20, rotation: -45, scale: 1, z: 0, opacity: 1, duration: 2, ease: 'expo.out' },
                    0.4
                );

            // Dust splash explosion centered
            tl.fromTo('.dust-splash',
                { scale: 0.5, opacity: 0 },
                { scale: 2, opacity: 1, duration: 1.5, ease: 'power2.out' },
                1.0
            );

            // Logo Title characters emerge dynamically
            tl.to(titleText.chars, {
                yPercent: 0,
                opacity: 1,
                rotateX: 0,
                duration: 1.2,
                stagger: 0.05,
                ease: 'power4.out',
                transformOrigin: "bottom center"
            }, 1.2);

            // Subtitle emerges
            tl.to('.preloader-subtitle span', {
                yPercent: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out'
            }, 1.6);

            // Spices settle with heavy bounce
            tl.to('.spice-item', {
                y: '+=50',
                scale: 0.95,
                rotation: '+=8',
                duration: 2.5,
                ease: 'elastic.out(1, 0.3)',
                stagger: 0.05
            }, 1.8);

            // Exit Sequence
            tl.to('.dust-splash', { opacity: 0, duration: 1 }, 3.5);
            tl.to('.spice-item', { opacity: 0, scale: 1.2, y: '+=30', duration: 0.8, ease: 'power2.inOut', stagger: 0.05 }, 3.8);

            tl.to(titleText.chars, {
                yPercent: -100,
                opacity: 0,
                duration: 0.6,
                stagger: 0.02,
                ease: 'power2.in'
            }, 4.0);

            tl.to('.preloader-subtitle span', {
                yPercent: -100,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in'
            }, 4.2);

            if (onComplete) {
                tl.to(container.current, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: 'expo.inOut',
                    onComplete
                }, 4.5);
            }

        }, container);
        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div ref={container} className="fixed inset-0 z-[100] flex items-center justify-center bg-parchment overflow-hidden" style={{ perspective: '800px' }}>
            <div
                className="dust-splash absolute top-1/2 left-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full mix-blend-multiply pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(194,89,52,0.15) 0%, rgba(197,160,89,0.08) 40%, rgba(249,246,240,0) 70%)',
                    filter: 'blur(30px)'
                }}
            ></div>

            <img src="/spices/star_anise_isolated_1772801555117.png" className="spice-item spice-1 absolute top-1/2 left-1/2 w-32 h-32 md:w-48 md:h-48 object-contain mix-blend-multiply pointer-events-none" alt="" />
            <img src="/spices/cinnamon_sticks_isolated_1772801570251.png" className="spice-item spice-2 absolute top-1/2 left-1/2 w-48 h-48 md:w-64 md:h-64 object-contain mix-blend-multiply pointer-events-none" alt="" />
            <img src="/spices/chili_isolated_1772801607119.png" className="spice-item spice-3 absolute top-1/2 left-1/2 w-32 h-32 md:w-48 md:h-48 object-contain mix-blend-multiply pointer-events-none" alt="" />
            <img src="/spices/cardamom_isolated_1772801626708.png" className="spice-item spice-4 absolute top-1/2 left-1/2 w-24 h-24 md:w-32 md:h-32 object-contain mix-blend-multiply pointer-events-none" alt="" />

            <div className="preloader-logo relative z-10 flex flex-col items-center text-center mt-[-30px]">
                <h1 className="preloader-title font-display font-semibold text-5xl md:text-8xl lg:text-[7rem] text-charcoal tracking-wide mb-2 overflow-hidden">
                    <span className="inline-block relative">Baramasa</span>
                </h1>
                <p className="preloader-subtitle font-heritage italic text-lg md:text-2xl text-terracotta tracking-widest overflow-hidden">
                    <span className="inline-block">12 months of flavour.</span>
                </p>
            </div>
        </div>
    );
};

// B. HERO SECTION — "The First Taste"
const Hero = ({ isPreloaderFinished }) => {
    const container = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!isPreloaderFinished) return;

            const titleSplit = new SplitType('.hero-title-split', { types: 'chars' });
            const subtitleSplit = new SplitType('.hero-subtitle-split', { types: 'lines' });

            // Fly-through initial state: Scaled up by 2.5x, focused on the bottom middle (the path)
            // By setting transformOrigin to "bottom center", it looks like we are flying forward from the path.
            gsap.set('.anim-hero-bg', { scale: 2.5, transformOrigin: '50% 100%' });

            gsap.set(titleSplit.chars, { y: 40, opacity: 0 });
            gsap.set(subtitleSplit.lines, { y: 20, opacity: 0 });
            gsap.set('.hero-btn', { scale: 0.9, opacity: 0 });

            const tl = gsap.timeline({ delay: 0.1 });

            // The Cinematic Fly-through transition
            tl.to('.anim-hero-bg', {
                scale: 1,
                transformOrigin: '50% 50%',
                duration: 4.5,
                ease: "power2.inOut" // Smooth acceleration and deceleration for drone-like movement
            }, 0);

            // Animate title characters
            tl.to(titleSplit.chars, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.03,
                ease: 'power3.out'
            }, 3.0); // start appearing near the end of flythrough

            // Animate subtitle lines
            tl.to(subtitleSplit.lines, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out'
            }, 3.4);

            // Animate Button
            tl.to('.hero-btn', {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: 'back.out(1.7)'
            }, 3.7);

            // Optional: Parallax on scroll for hero image
            gsap.to('.anim-hero-bg', {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

        }, container);

        return () => ctx.revert();
    }, [isPreloaderFinished]);

    return (
        <section ref={container} className="relative w-full h-[100dvh] overflow-hidden flex items-end justify-center pb-20 md:pb-28">
            {/* Background Image with flythrough animation target */}
            <div className="absolute inset-0 z-0 bg-charcoal pointer-events-none">
                <div className="anim-hero-bg absolute inset-0 w-full h-full bg-[url('/himalaya_hero.png')] bg-cover bg-center bg-no-repeat"></div>
                {/* Gradient overlay so the text remains readable over the landscape */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 z-10"></div>
            </div>

            {/* Overlay Text */}
            <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center text-center px-6">
                <h1 className="hero-title-split font-display font-semibold tracking-wide text-5xl md:text-6xl lg:text-7xl text-parchment leading-[1.1] mb-6 drop-shadow-2xl">
                    Dine Above the Foothills,<br />Beneath the Peaks
                </h1>
                <p className="hero-subtitle-split font-modern text-parchment/90 text-sm md:text-lg max-w-2xl leading-relaxed mb-10 drop-shadow-md font-medium">
                    Authentic Himalayan cuisine, nestled between Shivalik charm and Middle Himalaya grandeur.
                </p>
                <a href="#menu" className="hero-btn bg-parchment text-[#443C30] hover:bg-gold transition-colors text-sm font-modern font-bold uppercase tracking-widest px-8 md:px-10 py-4 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] inline-block">
                    Explore Our Menu
                </a>
            </div>
        </section>
    );
};

// C. PHILOSOPHY — "The Valley's Rhythm"
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

// D. THE MENU — "Seasonal Artifacts" (Horizontal Scroll)
const Menu = () => {
    const container = useRef(null);
    const trackRef = useRef(null);

    const menuPages = [
        { id: 1, image: "/menu-pages/page-01.jpg" },
        { id: 2, image: "/menu-pages/page-02.jpg" },
        { id: 3, image: "/menu-pages/page-03.jpg" },
        { id: 4, image: "/menu-pages/page-04.jpg" },
        { id: 5, image: "/menu-pages/page-05.jpg" },
        { id: 6, image: "/menu-pages/page-06.jpg" },
        { id: 7, image: "/menu-pages/page-07.jpg" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Horizontal scroll animation
            gsap.to(trackRef.current, {
                x: () => -(trackRef.current.scrollWidth - window.innerWidth) + "px",
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "+=300%", // 300% gives more scrolling room for 7 pages
                    scrub: 1,
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
                            className="menu-card magnetic-card group relative h-[70vh] w-[85vw] md:w-[60vw] lg:w-[45vw] max-w-[700px] shrink-0 overflow-hidden cursor-none shadow-2xl"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <img
                                src={item.image}
                                alt={`Menu Page ${item.id}`}
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

// E. RESERVATION / FOOTER — "The Hearth"
const Footer = () => {
    return (
        <footer id="location" className="w-full text-parchment px-6 py-24 lg:py-32 rounded-t-[3rem] lg:rounded-t-[4rem] relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
                {/* Infinite Marquee */}
                <div className="w-[200vw] overflow-hidden whitespace-nowrap mb-12 opacity-10 pointer-events-none -ml-[50vw]">
                    <h1 className="font-display text-[15vw] md:text-[10vw] leading-none inline-block origin-left animate-[marquee_20s_linear_infinite]">
                        12 MONTHS OF FLAVOUR • SENSORY HERITAGE • MOUNTAIN ROOTS •
                    </h1>
                    <h1 className="font-display text-[15vw] md:text-[10vw] leading-none inline-block origin-left animate-[marquee_20s_linear_infinite]">
                        12 MONTHS OF FLAVOUR • SENSORY HERITAGE • MOUNTAIN ROOTS •
                    </h1>
                </div>

                <h2 className="font-heritage italic text-4xl md:text-7xl lg:text-8xl mb-8 md:mb-12 px-4">
                    Save your seat at the table.
                </h2>
                <Button className="bg-terracotta text-parchment text-lg px-10 py-4 mb-24">
                    Reserve a Table
                </Button>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 pt-16 border-t border-parchment/10 text-left">
                    <div className="flex flex-col gap-4">
                        <h4 className="font-modern uppercase tracking-widest text-gold text-sm font-semibold mb-2">Location</h4>
                        <div className="flex items-start gap-4 opacity-80 font-modern text-sm">
                            <MapPin className="w-5 h-5 mt-0.5 text-terracotta" />
                            <p>123 Forest Hill Road<br />Dehradun, Uttarakhand<br />248001</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 md:items-center text-left md:text-center">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-modern uppercase tracking-widest text-gold text-sm font-semibold mb-2">Hours</h4>
                            <div className="flex items-start md:justify-center gap-4 opacity-80 font-modern text-sm">
                                <Clock className="w-5 h-5 mt-0.5 text-terracotta md:hidden" />
                                <p>Tuesday - Sunday<br />Lunch: 12:00 PM - 3:30 PM<br />Dinner: 7:00 PM - 11:30 PM</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 md:items-end text-left md:text-right">
                        <h4 className="font-modern uppercase tracking-widest text-gold text-sm font-semibold mb-2">Contact</h4>
                        <div className="flex flex-col gap-4 opacity-80 font-modern text-sm">
                            <div className="flex items-center gap-4 md:justify-end max-w-max transition-colors cursor-pointer group">
                                <Phone className="w-4 h-4 md:hidden" />
                                <p className="group-hover:text-terracotta transition-colors duration-300">+91 98765 43210</p>
                            </div>
                            <div className="flex items-center gap-4 md:justify-end max-w-max transition-colors cursor-pointer group">
                                <p className="group-hover:text-terracotta transition-colors duration-300">hello@baramasa.in</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-24 flex flex-col md:flex-row items-center justify-between opacity-50 font-modern text-xs uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} Baramasa.</p>
                    <div className="flex gap-6 mt-6 md:mt-0">
                        <a href="#" className="hover:text-gold transition-colors">Instagram</a>
                        <a href="#" className="hover:text-gold transition-colors">Facebook</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

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
        <div id="hero" className="w-full mx-auto relative antialiased text-charcoal [cursor:none]">
            <CustomCursor />
            <div className="pointer-events-none fixed inset-0 z-[40] shadow-[inset_0_0_150px_rgba(26,26,26,0.15)] mix-blend-multiply transition-opacity duration-1000"></div>

            {/* Atmospheric Parallax Elements */}
            <img src="/spices/star_anise_isolated_1772801555117.png" className="absolute top-[80vh] left-[5%] w-24 h-24 object-contain mix-blend-multiply opacity-20 blur-[2px]" data-speed="0.8" />
            <img src="/spices/cardamom_isolated_1772801626708.png" className="absolute top-[160vh] right-[10%] w-16 h-16 object-contain mix-blend-multiply opacity-30 blur-[4px]" data-speed="1.2" />

            {!preloaderFinished && <Preloader onComplete={() => setPreloaderFinished(true)} />}
            <Navbar />
            <Hero isPreloaderFinished={preloaderFinished} />
            <Philosophy />
            <Menu />
            <Footer />
        </div>
    );
}
