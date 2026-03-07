import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';
import { MapPin, Clock, Phone } from 'lucide-react';

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
            className={`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] z-40 transition-all duration-500 rounded-full flex items-center justify-between px-6 py-3 ${scrolled
                ? 'bg-parchment/80 backdrop-blur-md border border-olive/30 shadow-sm'
                : 'bg-transparent border border-transparent'
                }`}
        >
            <div className="text-2xl font-display font-semibold tracking-wide text-charcoal">
                Baramasa
            </div>
            <div className="hidden md:flex items-center gap-8 font-modern text-sm tracking-widest uppercase text-charcoal">
                <a href="#story" className="hover:text-terracotta transition-colors duration-300">Our Story</a>
                <a href="#menu" className="hover:text-terracotta transition-colors duration-300">The 12 Months</a>
                <a href="#location" className="hover:text-terracotta transition-colors duration-300">Location</a>
            </div>
            <Button className="bg-terracotta text-parchment text-sm hidden sm:block">
                Reserve a Table
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

            // Spices flying in towards CENTER
            tl.fromTo('.spice-1',
                { x: -window.innerWidth / 2, y: -window.innerHeight / 2, rotation: -180, scale: 0.2, opacity: 0, z: 200 },
                { x: -140, y: -120, rotation: 45, scale: 1, z: 0, opacity: 1, duration: 2, ease: 'expo.out' },
                0.1
            )
                .fromTo('.spice-2',
                    { x: window.innerWidth / 2, y: -window.innerHeight / 2, rotation: 180, scale: 0.2, opacity: 0, z: 300 },
                    { x: 160, y: -100, rotation: -30, scale: 1, z: 0, opacity: 1, duration: 2, ease: 'expo.out' },
                    0.2
                )
                .fromTo('.spice-3',
                    { x: -window.innerWidth / 2, y: window.innerHeight / 2, rotation: -90, scale: 0.2, opacity: 0, z: 100 },
                    { x: -120, y: 140, rotation: 60, scale: 1, z: 0, opacity: 1, duration: 2, ease: 'expo.out' },
                    0.3
                )
                .fromTo('.spice-4',
                    { x: window.innerWidth / 2, y: window.innerHeight / 2, rotation: 90, scale: 0.2, opacity: 0, z: 400 },
                    { x: 140, y: 120, rotation: -45, scale: 1, z: 0, opacity: 1, duration: 2, ease: 'expo.out' },
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
                <h1 className="preloader-title font-display font-semibold text-6xl md:text-8xl lg:text-[7rem] text-charcoal tracking-wide mb-2 overflow-hidden">
                    <span className="inline-block relative">Baramasa</span>
                </h1>
                <p className="preloader-subtitle font-heritage italic text-xl md:text-2xl text-terracotta tracking-widest overflow-hidden">
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

            // Split the text into characters and lines
            const titleSplit = new SplitType('.hero-title-split', { types: 'chars' });
            const subtitleSplit = new SplitType('.hero-subtitle-split', { types: 'lines' });

            // Setup initial states
            gsap.set(titleSplit.chars, { y: 100, opacity: 0, rotateX: -90 });
            gsap.set(subtitleSplit.lines, { y: 30, opacity: 0 });
            gsap.set('.hero-image-container', { clipPath: 'inset(100% 0% 0% 0% round 40px)' });
            gsap.set('.hero-image', { scale: 1.2 });

            const tl = gsap.timeline({ delay: 0.2 });

            // Animate title characters
            tl.to(titleSplit.chars, {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 1.2,
                stagger: 0.02,
                ease: 'power4.out',
                transformOrigin: "bottom center"
            }, 0);

            // Animate subtitle lines
            tl.to(subtitleSplit.lines, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out'
            }, 0.5);

            // Animate image clip-path reveal
            tl.to('.hero-image-container', {
                clipPath: 'inset(0% 0% 0% 0% round 40px)',
                duration: 1.8,
                ease: 'power3.inOut'
            }, 0.2);

            // Animate image parallax scale down
            tl.to('.hero-image', {
                scale: 1.0,
                duration: 3,
                ease: 'power2.out'
            }, 0.2);

            // Optional: Parallax on scroll for hero image
            gsap.to('.hero-image', {
                yPercent: 20,
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
        <section ref={container} className="relative w-full h-[100dvh] flex items-center justify-center px-6 lg:px-12 pt-20">
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8 h-full">
                {/* Left Side: Text */}
                <div className="flex-1 w-full order-2 lg:order-1 flex flex-col justify-center z-10 lg:pr-10">
                    <p className="hero-subtitle-split font-modern uppercase tracking-widest text-olive text-sm md:text-base font-semibold mb-6 lg:mb-8">
                        Dehradun, Uttarakhand
                    </p>
                    <div className="flex flex-col gap-2 md:gap-4 mb-8" style={{ perspective: '1000px' }}>
                        <h1 className="hero-title-split font-display text-5xl md:text-7xl lg:text-8xl text-charcoal leading-none">
                            12 months of
                        </h1>
                        <h1 className="hero-title-split font-heritage italic font-bold text-6xl md:text-[6.5rem] lg:text-[8rem] text-terracotta leading-none lg:-ml-2 pb-2">
                            flavour.
                        </h1>
                    </div>
                    <p className="hero-subtitle-split font-modern text-charcoal/80 text-lg max-w-md leading-relaxed">
                        A premium, modern-heritage dining experience celebrating seasonal Indian cuisine, mountain roots, and the joy of gathering.
                    </p>
                </div>

                {/* Right Side: Image */}
                <div className="hero-image-container flex-1 w-full h-[50vh] lg:h-[80vh] order-1 lg:order-2 overflow-hidden relative mt-10 lg:mt-0">
                    <img
                        src="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=1400"
                        alt="Rustic Indian Thali"
                        className="hero-image absolute inset-0 w-full h-full object-cover sepia-[.15] contrast-[.95]"
                    />
                    <div className="absolute inset-0 bg-charcoal/10 mix-blend-multiply rounded-[2.5rem]"></div>
                </div>
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
                <h2 className="phil-text font-heritage italic font-bold text-5xl md:text-7xl lg:text-8xl text-gold mb-12 lg:mb-16 leading-[1.1] pb-2">
                    We follow the seasons.
                </h2>
                <p className="phil-text font-modern text-parchment/90 text-lg md:text-xl max-w-2xl leading-relaxed">
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

    const menuItems = [
        {
            id: 1,
            title: "The Signature Doon Thali",
            desc: "A hearty tribute to our roots. Bringing together local grains, wild greens, and mountain spices.",
            image: "https://images.unsplash.com/photo-1628294895950-980562beecfa?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: 2,
            title: "Charcoal-Smoked Dal",
            desc: "Simmered overnight on a slow wood fire. Rich, earthy, and deeply comforting.",
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: 3,
            title: "The Evergreen Swaad",
            desc: "A dish that changes with the calendar. Reflecting the valley's current harvest.",
            image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=1000"
        }
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
                    end: "+=200%", // 200% gives plenty of scrolling room
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
                <h2 className="font-display text-4xl md:text-5xl lg:text-5xl text-charcoal">
                    The 12 Months
                </h2>
            </div>

            <div
                ref={trackRef}
                className="flex items-center h-full w-[max-content] px-[10vw] gap-[10vw] lg:gap-[15vw] pt-20"
            >
                {menuItems.map((item) => {
                    const cardRef = useRef(null);

                    const handleMouseMove = (e) => {
                        if (!cardRef.current) return;
                        const rect = cardRef.current.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;

                        const rotateX = ((y - centerY) / centerY) * -15;
                        const rotateY = ((x - centerX) / centerX) * 15;

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
                            className="menu-card magnetic-card group relative h-[50vh] md:h-[60vh] w-[80vw] md:w-[50vw] lg:w-[40vw] max-w-[600px] shrink-0 rounded-3xl overflow-hidden border border-gold/30 bg-parchment cursor-none shadow-2xl"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out sepia-[.15] contrast-[.95]"
                                />
                                <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/20 transition-colors duration-700"></div>
                            </div>

                            <div className="relative z-10 flex flex-col justify-end h-full p-8 lg:p-12 text-parchment drop-shadow-lg" style={{ transform: 'translateZ(60px)' }}>
                                <h3 className="font-heritage italic text-4xl lg:text-5xl mb-4 font-semibold">
                                    {item.title}
                                </h3>
                                <p className="font-modern text-sm lg:text-lg opacity-90 leading-relaxed mb-6 max-w-sm">
                                    {item.desc}
                                </p>
                            </div>
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
                <div className="w-[200vw] overflow-hidden whitespace-nowrap mb-16 opacity-10 pointer-events-none -ml-[50vw]">
                    <h1 className="font-display text-[10vw] leading-none inline-block origin-left animate-[marquee_20s_linear_infinite]">
                        12 MONTHS OF FLAVOUR • SENSORY HERITAGE • MOUNTAIN ROOTS •
                    </h1>
                    <h1 className="font-display text-[10vw] leading-none inline-block origin-left animate-[marquee_20s_linear_infinite]">
                        12 MONTHS OF FLAVOUR • SENSORY HERITAGE • MOUNTAIN ROOTS •
                    </h1>
                </div>

                <h2 className="font-heritage italic text-5xl md:text-7xl lg:text-8xl mb-12">
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
