import { ArrowRight, Compass, MapPin, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const microCopy = [
    'No credit card required',
    'Free to start',
    'Upgrade anytime',
];

const destinations = ['Marrakech', 'Sahara', 'Fes', 'Chefchaouen', 'Essaouira', 'Rabat', 'Agadir', 'Ouarzazate'];

export default function FinalCTA() {
    const navigate = useNavigate();

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;0,700;1,300;1,500;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');

                .cta-root {
                    font-family: 'DM Sans', sans-serif;
                    position: relative;
                    padding: 140px 0 100px;
                    background: #0a0704;
                    overflow: hidden;
                }

                /* Layered bg image */
                .cta-bg {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                }

                .cta-bg-img {
                    width: 100%; height: 100%;
                    object-fit: cover;
                    object-position: center 40%;
                    filter: brightness(0.28) saturate(1.1);
                }

                /* Amber radial warmth, centered bottom */
                .cta-bg-glow {
                    position: absolute;
                    bottom: -80px; left: 50%;
                    transform: translateX(-50%);
                    width: 900px; height: 500px;
                    background: radial-gradient(ellipse, rgba(245,158,11,0.14) 0%, transparent 65%);
                    pointer-events: none;
                }

                /* Top amber glow */
                .cta-bg-glow-top {
                    position: absolute;
                    top: -100px; left: 50%;
                    transform: translateX(-50%);
                    width: 600px; height: 300px;
                    background: radial-gradient(ellipse, rgba(234,88,12,0.08) 0%, transparent 70%);
                    pointer-events: none;
                }

                /* Grain */
                .cta-grain {
                    position: absolute;
                    inset: 0;
                    opacity: 0.03;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
                    pointer-events: none;
                }

                /* Horizontal amber rule at the very top */
                .cta-topline {
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 3px;
                    background: linear-gradient(90deg,
                        transparent,
                        rgba(245,158,11,0.4) 25%,
                        rgba(234,88,12,0.6) 50%,
                        rgba(245,158,11,0.4) 75%,
                        transparent
                    );
                    z-index: 2;
                }

                /* Scrolling destination ticker */
                .cta-ticker-wrap {
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    height: 48px;
                    background: rgba(255,255,255,0.03);
                    border-top: 1px solid rgba(255,255,255,0.05);
                    overflow: hidden;
                    z-index: 5;
                    display: flex;
                    align-items: center;
                }

                .cta-ticker {
                    display: flex;
                    gap: 0;
                    animation: cta-ticker 22s linear infinite;
                    white-space: nowrap;
                }

                @keyframes cta-ticker {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }

                .cta-ticker-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 0 28px;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.2);
                    border-right: 1px solid rgba(255,255,255,0.05);
                }

                .cta-ticker-item:hover { color: rgba(255,255,255,0.45); }

                .cta-ticker-dot {
                    width: 4px; height: 4px;
                    border-radius: 50%;
                    background: rgba(245,158,11,0.5);
                    flex-shrink: 0;
                }

                /* Inner content */
                .cta-inner {
                    position: relative;
                    z-index: 10;
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0 36px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                @media (max-width: 640px) { .cta-inner { padding: 0 20px; } }

                /* Location pill */
                .cta-loc {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 14px;
                    border-radius: 100px;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.45);
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    margin-bottom: 28px;
                }

                /* Headline */
                .cta-headline {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(48px, 8vw, 88px);
                    font-weight: 500;
                    line-height: 1.0;
                    color: #fff;
                    letter-spacing: -0.01em;
                    margin-bottom: 24px;
                    max-width: 820px;
                }

                .cta-headline em {
                    font-style: italic;
                    background: linear-gradient(135deg, #f59e0b 20%, #fbbf24 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                @media (max-width: 480px) {
                    .cta-headline { font-size: clamp(38px, 10vw, 56px); line-height: 1.05; }
                }

                /* Sub */
                .cta-sub {
                    font-size: 16px;
                    color: rgba(255,255,255,0.45);
                    line-height: 1.7;
                    max-width: 460px;
                    margin-bottom: 48px;
                    font-weight: 400;
                }

                /* Star row */
                .cta-stars {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    margin-bottom: 40px;
                }

                .cta-star-label {
                    font-size: 12px;
                    color: rgba(255,255,255,0.35);
                    font-weight: 500;
                    margin-left: 8px;
                }

                /* CTA buttons */
                .cta-btns {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-wrap: wrap;
                    justify-content: center;
                    margin-bottom: 36px;
                }

                .cta-btn-primary {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 16px 36px;
                    border-radius: 16px;
                    border: none;
                    background: linear-gradient(135deg, #f59e0b 0%, #ea580c 55%, #f59e0b 100%);
                    background-size: 200% 100%;
                    color: #fff;
                    font-size: 15px;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    box-shadow: 0 8px 32px rgba(245,158,11,0.4), 0 2px 8px rgba(0,0,0,0.2);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .cta-btn-primary::after {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%; width: 55%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.85s;
                }

                .cta-btn-primary:hover {
                    background-position: 100% 0;
                    box-shadow: 0 14px 48px rgba(245,158,11,0.5), 0 4px 16px rgba(0,0,0,0.3);
                    transform: translateY(-2px);
                }

                .cta-btn-primary:hover::after { left: 160%; }

                .cta-btn-secondary {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 16px 30px;
                    border-radius: 16px;
                    border: 1px solid rgba(255,255,255,0.14);
                    background: rgba(255,255,255,0.05);
                    color: rgba(255,255,255,0.75);
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    backdrop-filter: blur(10px);
                    transition: all 0.22s;
                    font-family: 'DM Sans', sans-serif;
                }

                .cta-btn-secondary:hover {
                    border-color: rgba(255,255,255,0.28);
                    background: rgba(255,255,255,0.09);
                    color: #fff;
                }

                /* Micro copy */
                .cta-microcopy {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .cta-micro-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    color: rgba(255,255,255,0.3);
                    font-weight: 500;
                }

                .cta-micro-check {
                    width: 15px; height: 15px;
                    border-radius: 50%;
                    background: rgba(245,158,11,0.15);
                    border: 1px solid rgba(245,158,11,0.25);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    font-size: 8px;
                    color: #f59e0b;
                }

                .cta-micro-sep {
                    width: 3px; height: 3px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.1);
                }
            `}</style>

            <section className="cta-root">
                {/* Background */}
                <div className="cta-bg">
                    <img
                        className="cta-bg-img"
                        src="https://images.unsplash.com/photo-1731169243668-73e9e968e363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
                        alt=""
                        aria-hidden="true"
                    />
                    <div className="cta-bg-glow-top" />
                    <div className="cta-bg-glow" />
                    <div className="cta-grain" />
                </div>

                <div className="cta-topline" />

                {/* Scrolling ticker at bottom */}
                <div className="cta-ticker-wrap">
                    <div className="cta-ticker">
                        {[...destinations, ...destinations, ...destinations, ...destinations].map((d, i) => (
                            <div key={i} className="cta-ticker-item">
                                <div className="cta-ticker-dot" />
                                {d}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="cta-inner">
                    <motion.div
                        className="cta-loc"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <MapPin size={10} style={{ color: '#f59e0b' }} />
                        Morocco · Your journey starts here
                    </motion.div>

                    <motion.h2
                        className="cta-headline"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Your <em>perfect</em> Moroccan<br />adventure awaits
                    </motion.h2>

                    <motion.p
                        className="cta-sub"
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35, duration: 0.6 }}
                    >
                        Join thousands of travelers who've discovered the magic of Morocco with AI-powered personalized itineraries.
                    </motion.p>

                    <motion.div
                        className="cta-stars"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.45, duration: 0.5 }}
                    >
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                        ))}
                        <span className="cta-star-label">Trusted by 50,000+ travelers</span>
                    </motion.div>

                    <motion.div
                        className="cta-btns"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.55, duration: 0.6 }}
                    >
                        <button
                            className="cta-btn-primary"
                            onClick={() => navigate('/plan-trip')}
                        >
                            <Compass size={16} />
                            Plan your trip now
                            <ArrowRight size={15} strokeWidth={2.5} />
                        </button>
                        <button className="cta-btn-secondary">
                            View sample itineraries
                        </button>
                    </motion.div>

                    <motion.div
                        className="cta-microcopy"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        {microCopy.map((text, i) => (
                            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                {i > 0 && <div className="cta-micro-sep" />}
                                <div className="cta-micro-item">
                                    <div className="cta-micro-check">✓</div>
                                    {text}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    );
}