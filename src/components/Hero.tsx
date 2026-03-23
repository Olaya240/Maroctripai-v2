import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Star, Compass, ChevronDown, Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'Destinations', href: '#destinations' },
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
];

const stats = [
    { value: '1.2M+', label: 'Routes Generated' },
    { value: '98%', label: 'Satisfaction' },
    { value: '40+', label: 'Moroccan Cities' },
];

const floatingCards = [
    {
        icon: '🕌',
        label: 'Marrakech Medina',
        sub: 'Heritage & Souks',
        top: '20%',
        right: '6%',
        delay: 1.1,
        floatDir: -8,
    },
    {
        icon: '🏜️',
        label: 'Sahara Desert',
        sub: '3-day camel trek',
        top: '55%',
        right: '4%',
        delay: 1.3,
        floatDir: 8,
    },
];

const trustAvatars = [
    'https://i.pravatar.cc/32?img=1',
    'https://i.pravatar.cc/32?img=5',
    'https://i.pravatar.cc/32?img=11',
    'https://i.pravatar.cc/32?img=15',
];

export default function Hero() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const { scrollY } = useScroll();
    const imgY = useTransform(scrollY, [0, 700], ['0%', '18%']);
    const contentOpacity = useTransform(scrollY, [0, 350], [1, 0]);
    const contentY = useTransform(scrollY, [0, 350], [0, -30]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const onResize = () => { if (window.innerWidth > 768) setMobileMenuOpen(false); };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;0,700;1,300;1,500;1,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                .h-root {
                    font-family: 'DM Sans', sans-serif;
                    position: relative;
                    min-height: 100vh;
                    overflow: hidden;
                    background: #0a0704;
                    color: #fff;
                }

                /* ── Background ── */
                .h-bg {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                }
                .h-bg-img {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 120%;
                    object-fit: cover;
                    object-position: center 25%;
                    will-change: transform;
                }
                .h-bg-overlay {
                    position: absolute;
                    inset: 0;
                    /* Strong left fade for readability, gentle bottom vignette */
                    background:
                        linear-gradient(105deg,
                            rgba(10,7,4,0.92) 0%,
                            rgba(10,7,4,0.75) 38%,
                            rgba(10,7,4,0.25) 65%,
                            rgba(10,7,4,0.45) 100%
                        ),
                        linear-gradient(to bottom,
                            rgba(10,7,4,0.15) 0%,
                            rgba(10,7,4,0) 40%,
                            rgba(10,7,4,0.65) 100%
                        );
                }
                /* Subtle warm amber tint at the left edge */
                .h-bg-warmth {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse 60% 80% at 0% 60%, rgba(245,158,11,0.06) 0%, transparent 70%);
                    pointer-events: none;
                }
                /* Film grain */
                .h-grain {
                    position: absolute;
                    inset: 0;
                    opacity: 0.028;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
                    pointer-events: none;
                }
                /* Thin amber vertical rule — compositional accent */
                .h-rule {
                    position: absolute;
                    left: 46%;
                    top: 8%;
                    bottom: 8%;
                    width: 1px;
                    background: linear-gradient(180deg,
                        transparent 0%,
                        rgba(245,158,11,0.18) 25%,
                        rgba(245,158,11,0.10) 75%,
                        transparent 100%
                    );
                    pointer-events: none;
                    z-index: 1;
                }
                @media (max-width: 900px) { .h-rule { display: none; } }

                /* ── Navbar ── */
                .h-nav {
                    position: fixed;
                    top: 0; left: 0; right: 0;
                    z-index: 200;
                    height: 68px;
                    display: flex;
                    align-items: center;
                    padding: 0 36px;
                    justify-content: space-between;
                    transition: background 0.4s ease, border-color 0.4s ease;
                }
                .h-nav.scrolled {
                    background: rgba(10,7,4,0.86);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                @media (max-width: 640px) { .h-nav { padding: 0 20px; } }

                /* Logo */
                .h-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    flex-shrink: 0;
                    z-index: 10;
                }
                .h-logo-mark {
                    width: 34px; height: 34px;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    display: flex; align-items: center; justify-content: center;
                    font-weight: 800; font-size: 15px; color: #fff;
                    box-shadow: 0 4px 14px rgba(245,158,11,0.38);
                    flex-shrink: 0;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .h-logo:hover .h-logo-mark {
                    transform: scale(1.06) rotate(4deg);
                    box-shadow: 0 6px 20px rgba(245,158,11,0.5);
                }
                .h-logo-name {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 19px;
                    font-weight: 500;
                    color: #fff;
                    letter-spacing: 0.02em;
                    white-space: nowrap;
                }
                @media (max-width: 440px) { .h-logo-name { display: none; } }

                /* Center pill nav */
                .h-nav-center {
                    position: absolute;
                    left: 50%; top: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    align-items: center;
                    gap: 2px;
                    padding: 4px;
                    border-radius: 100px;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.09);
                    backdrop-filter: blur(12px);
                }
                @media (max-width: 1024px) { .h-nav-center { display: none; } }
                .h-nav-link {
                    padding: 7px 17px;
                    border-radius: 100px;
                    font-size: 13px;
                    font-weight: 500;
                    color: rgba(255,255,255,0.65);
                    text-decoration: none;
                    transition: all 0.18s;
                    white-space: nowrap;
                }
                .h-nav-link:hover {
                    color: #fff;
                    background: rgba(255,255,255,0.08);
                }

                /* Right actions */
                .h-nav-right {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    z-index: 10;
                }
                .h-btn-ghost {
                    padding: 8px 18px;
                    border-radius: 100px;
                    border: 1px solid rgba(255,255,255,0.18);
                    background: transparent;
                    color: rgba(255,255,255,0.75);
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: 'DM Sans', sans-serif;
                    white-space: nowrap;
                }
                .h-btn-ghost:hover {
                    border-color: rgba(255,255,255,0.35);
                    color: #fff;
                    background: rgba(255,255,255,0.06);
                }
                @media (max-width: 640px) { .h-btn-ghost { display: none; } }

                .h-btn-cta {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    padding: 9px 20px;
                    border-radius: 100px;
                    border: none;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    color: #fff;
                    font-size: 13px;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 4px 16px rgba(245,158,11,0.38);
                    transition: all 0.25s;
                    font-family: 'DM Sans', sans-serif;
                    position: relative;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .h-btn-cta::after {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%; width: 55%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
                    transition: left 0.75s ease;
                }
                .h-btn-cta:hover { box-shadow: 0 8px 28px rgba(245,158,11,0.5); transform: translateY(-1px); }
                .h-btn-cta:hover::after { left: 160%; }

                /* Hamburger (mobile) */
                .h-hamburger {
                    width: 36px; height: 36px;
                    border-radius: 10px;
                    border: 1px solid rgba(255,255,255,0.12);
                    background: rgba(255,255,255,0.06);
                    display: none;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #fff;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }
                .h-hamburger:hover { background: rgba(255,255,255,0.12); }
                @media (max-width: 1024px) { .h-hamburger { display: flex; } }

                /* Mobile drawer */
                .h-mobile-drawer {
                    position: fixed;
                    top: 0; left: 0; right: 0;
                    z-index: 190;
                    background: rgba(10,7,4,0.97);
                    backdrop-filter: blur(24px);
                    padding: 88px 28px 36px;
                    border-bottom: 1px solid rgba(255,255,255,0.07);
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .h-mobile-link {
                    padding: 14px 16px;
                    border-radius: 14px;
                    font-size: 16px;
                    font-weight: 600;
                    color: rgba(255,255,255,0.7);
                    text-decoration: none;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                }
                .h-mobile-link:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.08);
                    color: #fff;
                }
                .h-mobile-divider {
                    height: 1px;
                    background: rgba(255,255,255,0.07);
                    margin: 8px 0;
                }
                .h-mobile-cta {
                    margin-top: 8px;
                    padding: 14px;
                    border-radius: 14px;
                    border: none;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    color: #fff;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    box-shadow: 0 6px 24px rgba(245,158,11,0.35);
                }

                /* ── Hero Content ── */
                .h-content {
                    position: relative;
                    z-index: 10;
                    max-width: 1360px;
                    margin: 0 auto;
                    padding: 0 36px;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding-top: 100px;
                    padding-bottom: 100px;
                    will-change: transform, opacity;
                }
                @media (max-width: 768px) {
                    .h-content { padding: 120px 20px 90px; }
                }

                /* Location pill */
                .h-loc {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 12px;
                    border-radius: 100px;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.45);
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    margin-bottom: 18px;
                }

                /* AI badge */
                .h-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 14px;
                    border-radius: 100px;
                    background: rgba(245,158,11,0.1);
                    border: 1px solid rgba(245,158,11,0.22);
                    color: #fbbf24;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.13em;
                    text-transform: uppercase;
                    margin-bottom: 26px;
                }
                .h-badge-dot {
                    width: 5px; height: 5px;
                    border-radius: 50%;
                    background: #f59e0b;
                    animation: bdot 2s ease-in-out infinite;
                }
                @keyframes bdot {
                    0%,100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.35; transform: scale(0.65); }
                }

                /* Headline */
                .h-headline {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(54px, 7.5vw, 100px);
                    font-weight: 500;
                    line-height: 0.98;
                    letter-spacing: -0.01em;
                    color: #fff;
                    margin-bottom: 26px;
                    max-width: 640px;
                }
                .h-headline em {
                    font-style: italic;
                    background: linear-gradient(135deg, #f59e0b 30%, #fbbf24 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                @media (max-width: 480px) {
                    .h-headline { font-size: clamp(44px, 12vw, 60px); line-height: 1.0; }
                }

                /* Sub */
                .h-sub {
                    font-size: 16px;
                    line-height: 1.72;
                    color: rgba(255,255,255,0.48);
                    max-width: 400px;
                    margin-bottom: 40px;
                    font-weight: 400;
                }
                @media (max-width: 480px) { .h-sub { font-size: 15px; max-width: 100%; } }

                /* CTAs */
                .h-ctas {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-wrap: wrap;
                    margin-bottom: 56px;
                }

                .h-cta-primary {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 15px 30px;
                    border-radius: 16px;
                    border: none;
                    background: linear-gradient(135deg, #f59e0b 0%, #ea580c 55%, #f59e0b 100%);
                    background-size: 200% 100%;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    cursor: pointer;
                    box-shadow: 0 8px 28px rgba(245,158,11,0.38);
                    transition: all 0.3s ease;
                    font-family: 'DM Sans', sans-serif;
                    position: relative;
                    overflow: hidden;
                }
                .h-cta-primary::after {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%; width: 55%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
                    transition: left 0.85s;
                }
                .h-cta-primary:hover {
                    background-position: 100% 0;
                    box-shadow: 0 14px 44px rgba(245,158,11,0.48);
                    transform: translateY(-2px);
                }
                .h-cta-primary:hover::after { left: 160%; }

                .h-cta-secondary {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 15px 26px;
                    border-radius: 16px;
                    border: 1px solid rgba(255,255,255,0.14);
                    background: rgba(255,255,255,0.05);
                    color: rgba(255,255,255,0.78);
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    backdrop-filter: blur(10px);
                    transition: all 0.22s;
                    font-family: 'DM Sans', sans-serif;
                }
                .h-cta-secondary:hover {
                    border-color: rgba(255,255,255,0.28);
                    background: rgba(255,255,255,0.09);
                    color: #fff;
                }

                /* Trust row */
                .h-trust {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 44px;
                }
                .h-avatars {
                    display: flex;
                }
                .h-avatar {
                    width: 28px; height: 28px;
                    border-radius: 50%;
                    border: 2px solid rgba(10,7,4,0.8);
                    object-fit: cover;
                    margin-left: -8px;
                    background: #222;
                }
                .h-avatar:first-child { margin-left: 0; }
                .h-trust-text {
                    font-size: 12px;
                    color: rgba(255,255,255,0.4);
                    font-weight: 500;
                    line-height: 1.5;
                }
                .h-trust-text strong {
                    color: rgba(255,255,255,0.75);
                    font-weight: 700;
                }
                .h-trust-stars {
                    display: flex;
                    gap: 2px;
                    margin-bottom: 2px;
                }

                /* Stats */
                .h-stats {
                    display: flex;
                    align-items: center;
                    gap: 0;
                    flex-wrap: wrap;
                }
                .h-stat {
                    padding-right: 28px;
                    margin-right: 28px;
                    border-right: 1px solid rgba(255,255,255,0.08);
                }
                .h-stat:last-child {
                    border-right: none;
                    padding-right: 0;
                    margin-right: 0;
                }
                .h-stat-val {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 28px;
                    font-weight: 500;
                    color: #fff;
                    line-height: 1;
                }
                .h-stat-label {
                    font-size: 10px;
                    color: rgba(255,255,255,0.35);
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    margin-top: 4px;
                }
                @media (max-width: 480px) {
                    .h-stat { padding-right: 18px; margin-right: 18px; }
                    .h-stat-val { font-size: 22px; }
                }

                /* ── Floating cards ── */
                .h-float {
                    position: absolute;
                    background: rgba(255,255,255,0.06);
                    backdrop-filter: blur(18px);
                    -webkit-backdrop-filter: blur(18px);
                    border: 1px solid rgba(255,255,255,0.11);
                    border-radius: 20px;
                    padding: 14px 18px;
                    display: flex;
                    align-items: center;
                    gap: 13px;
                    z-index: 15;
                    min-width: 196px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
                    cursor: default;
                }
                .h-float:hover {
                    background: rgba(255,255,255,0.09);
                    border-color: rgba(255,255,255,0.18);
                    box-shadow: 0 16px 48px rgba(0,0,0,0.35);
                }
                @media (max-width: 960px) { .h-float { display: none; } }

                .h-float-icon {
                    width: 42px; height: 42px;
                    border-radius: 13px;
                    background: rgba(245,158,11,0.13);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 22px;
                    flex-shrink: 0;
                    border: 1px solid rgba(245,158,11,0.15);
                }
                .h-float-name {
                    font-size: 13px;
                    font-weight: 700;
                    color: #fff;
                    line-height: 1.2;
                }
                .h-float-sub {
                    font-size: 11px;
                    color: rgba(255,255,255,0.4);
                    margin-top: 2px;
                }
                .h-float-stars {
                    display: flex;
                    gap: 2px;
                    margin-top: 5px;
                }

                /* ── Scroll cue ── */
                .h-scroll {
                    position: absolute;
                    bottom: 32px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    color: rgba(255,255,255,0.22);
                    font-size: 9px;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    font-weight: 700;
                    z-index: 10;
                    cursor: default;
                    animation: sbob 2.8s ease-in-out infinite;
                }
                @keyframes sbob {
                    0%,100% { transform: translateX(-50%) translateY(0); opacity: 0.6; }
                    50% { transform: translateX(-50%) translateY(7px); opacity: 1; }
                }
            `}</style>

            <div className="h-root" ref={heroRef}>

                {/* ── Background ── */}
                <div className="h-bg">
                    <motion.img
                        className="h-bg-img"
                        style={{ y: imgY }}
                        src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2200&auto=format&fit=crop"
                        alt=""
                        aria-hidden="true"
                    />
                    <div className="h-bg-overlay" />
                    <div className="h-bg-warmth" />
                    <div className="h-grain" />
                </div>
                <div className="h-rule" />

                {/* ── Floating cards ── */}
                {floatingCards.map((card, i) => (
                    <motion.div
                        key={card.label}
                        className="h-float"
                        style={{ top: card.top, right: card.right }}
                        initial={{ opacity: 0, x: 24, scale: 0.94 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: card.delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -6, transition: { duration: 0.3 } }}
                    >
                        <div className="h-float-icon">{card.icon}</div>
                        <div>
                            <div className="h-float-name">{card.label}</div>
                            <div className="h-float-sub">{card.sub}</div>
                            <div className="h-float-stars">
                                {[...Array(5)].map((_, s) => (
                                    <Star key={s} size={9} fill="#f59e0b" color="#f59e0b" />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* ── Navbar ── */}
                <motion.nav
                    className={`h-nav ${scrolled ? 'scrolled' : ''}`}
                    initial={{ y: -72, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="h-logo" onClick={() => navigate('/')}>
                        <div className="h-logo-mark">M</div>
                        <span className="h-logo-name">MarocTrip AI</span>
                    </div>

                    <div className="h-nav-center">
                        {navLinks.map(link => (
                            <a key={link.label} href={link.href} className="h-nav-link">
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="h-nav-right">
                        <button className="h-btn-ghost">Sign in</button>
                        <button className="h-btn-cta" onClick={() => navigate('/plan-trip')}>
                            Plan my trip
                            <ArrowRight size={13} strokeWidth={2.5} />
                        </button>
                        <button
                            className="h-hamburger"
                            onClick={() => setMobileMenuOpen(v => !v)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </motion.nav>

                {/* ── Mobile drawer ── */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="h-mobile-drawer"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {navLinks.map(link => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="h-mobile-link"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="h-mobile-divider" />
                            <button className="h-btn-ghost" style={{ textAlign: 'center', width: '100%', borderRadius: 14, padding: '14px 0' }}>
                                Sign in
                            </button>
                            <button
                                className="h-mobile-cta"
                                onClick={() => { setMobileMenuOpen(false); navigate('/plan-trip'); }}
                            >
                                Plan my trip →
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Hero Content ── */}
                <motion.div
                    className="h-content"
                    style={{ opacity: contentOpacity, y: contentY }}
                >
                    {/* Location chip */}
                    <motion.div
                        className="h-loc"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.28, duration: 0.5 }}
                    >
                        <MapPin size={11} style={{ color: '#f59e0b', flexShrink: 0 }} />
                        Morocco · North Africa
                    </motion.div>

                    {/* AI badge */}
                    <motion.div
                        className="h-badge"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.36, duration: 0.5 }}
                    >
                        <div className="h-badge-dot" />
                        AI-Powered Travel Planning
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        className="h-headline"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.46, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Your perfect
                        <br />
                        <em>Morocco</em>
                        <br />
                        journey awaits
                    </motion.h1>

                    {/* Sub */}
                    <motion.p
                        className="h-sub"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        From bustling medinas to serene Saharan dunes — our AI crafts a deeply personal itinerary shaped around your style, pace, and passions.
                    </motion.p>

                    {/* Trust row */}
                    <motion.div
                        className="h-trust"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.55 }}
                    >
                        <div className="h-avatars">
                            {trustAvatars.map((src, i) => (
                                <img key={i} className="h-avatar" src={src} alt="" aria-hidden="true" />
                            ))}
                        </div>
                        <div className="h-trust-text">
                            <div className="h-trust-stars">
                                {[...Array(5)].map((_, s) => (
                                    <Star key={s} size={11} fill="#f59e0b" color="#f59e0b" />
                                ))}
                            </div>
                            <strong>4.9/5</strong> from 12,000+ happy travelers
                        </div>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        className="h-ctas"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        <button
                            className="h-cta-primary"
                            onClick={() => navigate('/plan-trip')}
                        >
                            <Compass size={16} />
                            Plan your trip
                            <ArrowRight size={15} strokeWidth={2.5} />
                        </button>
                        <button className="h-cta-secondary">
                            Explore destinations
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="h-stats"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.95, duration: 0.6 }}
                    >
                        {stats.map((s, i) => (
                            <div key={s.label} className="h-stat">
                                <div className="h-stat-val">{s.value}</div>
                                <div className="h-stat-label">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll cue */}
                <motion.div
                    className="h-scroll"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                >
                    <ChevronDown size={16} />
                    Scroll
                </motion.div>
            </div>
        </>
    );
}