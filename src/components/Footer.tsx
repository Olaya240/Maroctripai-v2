import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const footerLinks = {
    Product: ['Features', 'Destinations', 'Pricing', 'How it Works', 'Mobile App'],
    Company: ['About Us', 'Careers', 'Press', 'Blog', 'Partners'],
    Support: ['Help Center', 'Contact Us', 'Terms of Service', 'Privacy Policy', 'Cookie Policy'],
    Destinations: ['Marrakech', 'Fes', 'Chefchaouen', 'Sahara', 'Essaouira'],
};

const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const contact = [
    { icon: Mail, text: 'hello@maroctrip.ai' },
    { icon: Phone, text: '+212 5XX-XXXXXX' },
    { icon: MapPin, text: 'Marrakech, Morocco' },
];

export default function Footer() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');

                .ft2-root {
                    font-family: 'DM Sans', sans-serif;
                    background: #0a0704;
                    color: #fff;
                    position: relative;
                    overflow: hidden;
                }

                /* Subtle amber glow at the top */
                .ft2-root::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 50%;
                    transform: translateX(-50%);
                    width: 700px; height: 200px;
                    background: radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 70%);
                    pointer-events: none;
                }

                /* Top amber line (continuation from FinalCTA ticker) */
                .ft2-topline {
                    height: 1px;
                    background: linear-gradient(90deg,
                        transparent,
                        rgba(245,158,11,0.2) 25%,
                        rgba(234,88,12,0.3) 50%,
                        rgba(245,158,11,0.2) 75%,
                        transparent
                    );
                }

                .ft2-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 36px;
                    position: relative;
                    z-index: 1;
                }

                @media (max-width: 640px) { .ft2-inner { padding: 0 20px; } }

                /* ── Main grid ── */
                .ft2-main {
                    display: grid;
                    grid-template-columns: 1.6fr repeat(4, 1fr);
                    gap: 48px;
                    padding: 72px 0 56px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                @media (max-width: 1024px) {
                    .ft2-main {
                        grid-template-columns: 1fr 1fr 1fr;
                        gap: 36px;
                    }
                    .ft2-brand { grid-column: 1 / 4; }
                }

                @media (max-width: 640px) {
                    .ft2-main { grid-template-columns: 1fr 1fr; gap: 28px; }
                    .ft2-brand { grid-column: 1 / 3; }
                }

                /* Brand col */
                .ft2-brand {}

                .ft2-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                    cursor: pointer;
                    width: fit-content;
                }

                .ft2-logo-mark {
                    width: 34px; height: 34px;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    display: flex; align-items: center; justify-content: center;
                    color: #fff; font-weight: 800; font-size: 15px;
                    box-shadow: 0 4px 14px rgba(245,158,11,0.3);
                    flex-shrink: 0;
                    transition: transform 0.2s, box-shadow 0.2s;
                }

                .ft2-logo:hover .ft2-logo-mark {
                    transform: scale(1.05) rotate(3deg);
                    box-shadow: 0 6px 20px rgba(245,158,11,0.45);
                }

                .ft2-logo-name {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 18px;
                    font-weight: 500;
                    color: #fff;
                    letter-spacing: 0.02em;
                }

                .ft2-tagline {
                    font-size: 13px;
                    color: rgba(255,255,255,0.35);
                    line-height: 1.7;
                    margin-bottom: 28px;
                    max-width: 280px;
                }

                /* Newsletter */
                .ft2-newsletter {
                    display: flex;
                    gap: 0;
                    margin-bottom: 28px;
                    max-width: 300px;
                }

                .ft2-newsletter-input {
                    flex: 1;
                    padding: 10px 14px;
                    border-radius: 10px 0 0 10px;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-right: none;
                    background: rgba(255,255,255,0.05);
                    color: #fff;
                    font-size: 12px;
                    font-family: 'DM Sans', sans-serif;
                    outline: none;
                    transition: border-color 0.2s;
                }

                .ft2-newsletter-input::placeholder { color: rgba(255,255,255,0.2); }
                .ft2-newsletter-input:focus { border-color: rgba(245,158,11,0.4); }

                .ft2-newsletter-btn {
                    padding: 10px 14px;
                    border-radius: 0 10px 10px 0;
                    border: none;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    color: #fff;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: opacity 0.2s;
                    flex-shrink: 0;
                }

                .ft2-newsletter-btn:hover { opacity: 0.85; }

                /* Contact items */
                .ft2-contact {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .ft2-contact-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 12px;
                    color: rgba(255,255,255,0.3);
                    text-decoration: none;
                    transition: color 0.2s;
                    cursor: pointer;
                }

                .ft2-contact-item:hover { color: rgba(255,255,255,0.65); }

                .ft2-contact-icon {
                    width: 28px; height: 28px;
                    border-radius: 8px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.07);
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                    transition: all 0.2s;
                }

                .ft2-contact-item:hover .ft2-contact-icon {
                    background: rgba(245,158,11,0.12);
                    border-color: rgba(245,158,11,0.2);
                    color: #f59e0b;
                }

                /* Link columns */
                .ft2-col-title {
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(245,158,11,0.6);
                    margin-bottom: 18px;
                }

                .ft2-links {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .ft2-link {
                    font-size: 13px;
                    color: rgba(255,255,255,0.35);
                    text-decoration: none;
                    transition: color 0.18s, padding-left 0.18s;
                    display: block;
                    cursor: pointer;
                }

                .ft2-link:hover {
                    color: rgba(255,255,255,0.8);
                    padding-left: 4px;
                }

                /* ── Bottom bar ── */
                .ft2-bottom {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 24px 0;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .ft2-copy {
                    font-size: 12px;
                    color: rgba(255,255,255,0.2);
                    font-weight: 500;
                }

                .ft2-copy em {
                    font-style: normal;
                    color: rgba(245,158,11,0.5);
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 14px;
                }

                /* Language selector */
                .ft2-lang {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 11px;
                    color: rgba(255,255,255,0.25);
                    font-weight: 600;
                    letter-spacing: 0.06em;
                    cursor: pointer;
                    padding: 6px 12px;
                    border-radius: 8px;
                    border: 1px solid rgba(255,255,255,0.06);
                    background: rgba(255,255,255,0.02);
                    transition: all 0.2s;
                }

                .ft2-lang:hover {
                    border-color: rgba(255,255,255,0.12);
                    color: rgba(255,255,255,0.5);
                }

                /* Social icons */
                .ft2-socials {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .ft2-social {
                    width: 34px; height: 34px;
                    border-radius: 10px;
                    border: 1px solid rgba(255,255,255,0.07);
                    background: rgba(255,255,255,0.03);
                    display: flex; align-items: center; justify-content: center;
                    color: rgba(255,255,255,0.3);
                    cursor: pointer;
                    text-decoration: none;
                    transition: all 0.22s;
                }

                .ft2-social:hover {
                    background: rgba(245,158,11,0.14);
                    border-color: rgba(245,158,11,0.25);
                    color: #f59e0b;
                    transform: translateY(-2px);
                }

                /* Made with love badge */
                .ft2-made {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 11px;
                    color: rgba(255,255,255,0.15);
                    font-weight: 500;
                }

                .ft2-heart {
                    color: #ea580c;
                    font-size: 12px;
                }
            `}</style>

            <footer className="ft2-root">
                <div className="ft2-topline" />

                <div className="ft2-inner">
                    <div className="ft2-main">

                        {/* Brand column */}
                        <motion.div
                            className="ft2-brand"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="ft2-logo">
                                <div className="ft2-logo-mark">M</div>
                                <span className="ft2-logo-name">MarocTrip AI</span>
                            </div>

                            <p className="ft2-tagline">
                                Discover Morocco like never before — AI-powered itineraries for authentic, seamless adventures.
                            </p>

                            {/* Newsletter */}
                            <div className="ft2-newsletter">
                                <input
                                    className="ft2-newsletter-input"
                                    type="email"
                                    placeholder="Your email address"
                                />
                                <button className="ft2-newsletter-btn" aria-label="Subscribe">
                                    <ArrowRight size={14} strokeWidth={2.5} />
                                </button>
                            </div>

                            <div className="ft2-contact">
                                {contact.map(({ icon: Icon, text }) => (
                                    <div key={text} className="ft2-contact-item">
                                        <div className="ft2-contact-icon">
                                            <Icon size={13} />
                                        </div>
                                        {text}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Link columns */}
                        {Object.entries(footerLinks).map(([category, links], idx) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="ft2-col-title">{category}</div>
                                <ul className="ft2-links">
                                    {links.map(link => (
                                        <li key={link}>
                                            <a href="#" className="ft2-link">{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom bar */}
                    <motion.div
                        className="ft2-bottom"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className="ft2-copy">
                            © 2026 <em>MarocTrip AI</em> · All rights reserved
                        </div>

                        <div className="ft2-made">
                            Crafted with <span className="ft2-heart">♥</span> in Marrakech
                        </div>

                        <div className="ft2-socials">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="ft2-social"
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </footer>
        </>
    );
}