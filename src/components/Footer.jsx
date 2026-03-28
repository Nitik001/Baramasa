import React from 'react';
import Button from './Button';
import { MapPin, Clock, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="location" className="w-full text-parchment px-6 py-24 lg:py-32 rounded-t-[3rem] lg:rounded-t-[4rem] relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
                <div className="w-[200vw] overflow-hidden whitespace-nowrap mb-12 opacity-10 pointer-events-none -ml-[50vw]" aria-hidden="true">
                    <h1 className="font-display text-[10vw] md:text-[8vw] leading-none inline-block origin-left animate-[marquee_20s_linear_infinite]">
                        12 MONTHS OF FLAVOUR • SENSORY HERITAGE • MOUNTAIN ROOTS •
                    </h1>
                    <h1 className="font-display text-[10vw] md:text-[8vw] leading-none inline-block origin-left animate-[marquee_20s_linear_infinite]" aria-hidden="true">
                        12 MONTHS OF FLAVOUR • SENSORY HERITAGE • MOUNTAIN ROOTS •
                    </h1>
                </div>

                <h2 className="font-heritage italic text-4xl md:text-7xl lg:text-8xl mb-8 md:mb-12 px-4">
                    Save your seat at the table.
                </h2>
                <Button data-cursor-text="Reserve" className="bg-terracotta text-parchment text-lg px-10 py-4 mb-24">
                    Reserve a Table
                </Button>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 pt-16 border-t border-parchment/10 text-left">
                    <div className="flex flex-col gap-4">
                        <h4 className="font-modern uppercase tracking-widest text-gold text-sm font-semibold mb-2">Location</h4>
                        <div className="flex items-start gap-4 opacity-80 font-modern text-sm">
                            <MapPin className="w-5 h-5 mt-0.5 text-terracotta" />
                            <p>Mothorowala road, Bangali kothi<br />Dehradun, Uttarakhand-248001</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 md:items-center text-left md:text-center">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-modern uppercase tracking-widest text-gold text-sm font-semibold mb-2">Hours</h4>
                            <div className="flex items-start md:justify-center gap-4 opacity-80 font-modern text-sm">
                                <Clock className="w-5 h-5 mt-0.5 text-terracotta md:hidden" />
                                <p>Monday - Sunday<br />7:00 AM - 10:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 md:items-end text-left md:text-right">
                        <h4 className="font-modern uppercase tracking-widest text-gold text-sm font-semibold mb-2">Contact</h4>
                        <div className="flex flex-col gap-4 opacity-80 font-modern text-sm">
                            <div className="flex items-center gap-4 md:justify-end max-w-max transition-colors cursor-pointer group" data-cursor-text="Call">
                                <Phone className="w-4 h-4 md:hidden" />
                                <a href="tel:+919675508626" className="group-hover:text-terracotta transition-colors duration-300">+91 96755 08626</a>
                            </div>
                            <div className="flex items-center gap-4 md:justify-end max-w-max transition-colors cursor-pointer group" data-cursor-text="Email">
                                <a href="mailto:hello@baramasa.in" className="group-hover:text-terracotta transition-colors duration-300">hello@baramasa.in</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-24 flex flex-col md:flex-row items-center justify-between opacity-50 font-modern text-xs uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} Baramasa.</p>
                    <div className="flex gap-6 mt-6 md:mt-0">
                        <a href="#" className="hover:text-gold transition-colors" data-cursor-text="Connect">Instagram</a>
                        <a href="#" className="hover:text-gold transition-colors" data-cursor-text="Connect">Facebook</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
