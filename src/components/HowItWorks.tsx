import { Sparkles, MapPin, Settings, Plane, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
    {
        icon: Sparkles,
        title: 'Choose Your Preferences',
        description: 'Tell us your travel style, budget, interests, and the experiences you seek across Morocco.',
        numeral: '01',
        tag: 'Personalization',
    },
    {
        icon: MapPin,
        title: 'AI Plans Your Journey',
        description: 'Our AI creates a tailored itinerary from real-time data and your unique profile — in seconds.',
        numeral: '02',
        tag: 'Intelligence',
    },
    {
        icon: Settings,
        title: 'Customize & Refine',
        description: 'Swap destinations, adjust timings, and fine-tune every detail until it feels perfectly yours.',
        numeral: '03',
        tag: 'Flexibility',
    },
    {
        icon: Plane,
        title: 'Travel with Confidence',
        description: 'Set off with a complete plan, curated bookings, and insider recommendations from locals.',
        numeral: '04',
        tag: 'Adventure',
    },
];

export default function HowItWorks() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

                .hiw-root {
                    font-family: 'DM Sans', sans-serif;
                    padding: 120px 0;
                    background: #fff;
                    position: relative;
                    overflow: hidden;
                }

                /* Subtle background texture */
                .hiw-root::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background:
                        radial-gradient(ellipse 60% 50% at 10% 20%, rgba(245,158,11,0.04) 0%, transparent 70%),
                        radial-gradient(ellipse 50% 60% at 90% 80%, rgba(234,88,12,0.03) 0%, transparent 70%);
                    pointer-events: none;
                }

                .hiw-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 36px;
                    position: relative;
                    z-index: 1;
                }

                @media (max-width: 640px) { .hiw-inner { padding: 0 20px; } }

                /* Header */
                .hiw-header {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                    align-items: end;
                    margin-bottom: 72px;
                }

                @media (max-width: 768px) {
                    .hiw-header { grid-template-columns: 1fr; gap: 20px; margin-bottom: 48px; }
                }

                .hiw-overline {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: #d97706;
                    margin-bottom: 16px;
                }

                .hiw-overline-dot {
                    width: 20px;
                    height: 1.5px;
                    background: linear-gradient(90deg, #f59e0b, #ea580c);
                    border-radius: 2px;
                }

                .hiw-headline {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(38px, 5vw, 58px);
                    font-weight: 600;
                    line-height: 1.08;
                    color: #111827;
                    letter-spacing: -0.01em;
                }

                .hiw-headline em {
                    font-style: italic;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .hiw-sub {
                    font-size: 15px;
                    color: #6b7280;
                    line-height: 1.7;
                    max-width: 340px;
                    font-weight: 400;
                    align-self: end;
                }

                @media (max-width: 768px) { .hiw-sub { max-width: 100%; } }

                /* Step grid */
                .hiw-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 20px;
                    position: relative;
                }

                @media (max-width: 1024px) { .hiw-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; } }
                @media (max-width: 560px) { .hiw-grid { grid-template-columns: 1fr; } }

                /* Connector line */
                .hiw-connector {
                    position: absolute;
                    top: 44px;
                    left: 12.5%;
                    right: 12.5%;
                    height: 1px;
                    background: linear-gradient(90deg,
                        transparent,
                        rgba(245,158,11,0.15) 15%,
                        rgba(245,158,11,0.25) 50%,
                        rgba(245,158,11,0.15) 85%,
                        transparent
                    );
                    z-index: 0;
                    pointer-events: none;
                }

                @media (max-width: 1024px) { .hiw-connector { display: none; } }

                /* Step card */
                .hiw-card {
                    background: #fafafa;
                    border: 1.5px solid #f3f4f6;
                    border-radius: 26px;
                    padding: 28px 24px 26px;
                    position: relative;
                    overflow: hidden;
                    cursor: default;
                    transition: all 0.28s ease;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                }

                .hiw-card:hover {
                    border-color: #fde68a;
                    background: #fff;
                    box-shadow:
                        0 0 0 4px rgba(245,158,11,0.06),
                        0 16px 40px rgba(245,158,11,0.1),
                        0 4px 12px rgba(0,0,0,0.04);
                    transform: translateY(-6px);
                }

                /* Top accent bar */
                .hiw-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #f59e0b, #ea580c);
                    border-radius: 0;
                    opacity: 0;
                    transition: opacity 0.28s;
                }

                .hiw-card:hover::before { opacity: 1; }

                /* Numeral */
                .hiw-numeral {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.18em;
                    color: #d1d5db;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transition: color 0.28s;
                }

                .hiw-card:hover .hiw-numeral { color: rgba(245,158,11,0.5); }

                .hiw-tag {
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    padding: 3px 9px;
                    border-radius: 100px;
                    background: #f3f4f6;
                    color: #9ca3af;
                    transition: all 0.28s;
                }

                .hiw-card:hover .hiw-tag {
                    background: #fff8eb;
                    color: #d97706;
                    border-color: #fde68a;
                }

                /* Icon */
                .hiw-icon-wrap {
                    width: 52px;
                    height: 52px;
                    border-radius: 16px;
                    background: #fff3d0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #f59e0b;
                    margin-bottom: 20px;
                    transition: all 0.3s ease;
                    flex-shrink: 0;
                }

                .hiw-card:hover .hiw-icon-wrap {
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    color: #fff;
                    box-shadow: 0 8px 20px rgba(245,158,11,0.35);
                    transform: scale(1.06);
                }

                .hiw-title {
                    font-size: 17px;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 10px;
                    line-height: 1.3;
                    letter-spacing: -0.01em;
                }

                .hiw-desc {
                    font-size: 13px;
                    color: #6b7280;
                    line-height: 1.65;
                    font-weight: 400;
                    flex: 1;
                }

                /* Arrow link */
                .hiw-arrow {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 11px;
                    font-weight: 700;
                    color: #d1d5db;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    margin-top: 20px;
                    transition: color 0.25s;
                }

                .hiw-card:hover .hiw-arrow { color: #f59e0b; }

                /* Bottom CTA strip */
                .hiw-footer {
                    margin-top: 64px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .hiw-footer-line {
                    width: 48px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #e5e7eb);
                }

                .hiw-footer-line.right {
                    background: linear-gradient(90deg, #e5e7eb, transparent);
                }

                .hiw-footer-text {
                    font-size: 13px;
                    color: #9ca3af;
                    font-weight: 500;
                    letter-spacing: 0.04em;
                }

                .hiw-footer-cta {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 13px 28px;
                    border-radius: 14px;
                    border: none;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    color: #fff;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    box-shadow: 0 6px 24px rgba(245,158,11,0.35);
                    transition: all 0.25s ease;
                    position: relative;
                    overflow: hidden;
                }

                .hiw-footer-cta::after {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%; width: 55%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.8s;
                }

                .hiw-footer-cta:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 36px rgba(245,158,11,0.45);
                }

                .hiw-footer-cta:hover::after { left: 160%; }
            `}</style>

            <section id="how-it-works" className="hiw-root">
                <div className="hiw-inner">

                    {/* Header */}
                    <motion.div
                        className="hiw-header"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div>
                            <div className="hiw-overline">
                                <div className="hiw-overline-dot" />
                                How it works
                            </div>
                            <h2 className="hiw-headline">
                                Four steps to your<br />
                                <em>perfect journey</em>
                            </h2>
                        </div>
                        <p className="hiw-sub">
                            From your first preference to your last sunset — our AI handles everything in between, so you can focus on the adventure.
                        </p>
                    </motion.div>

                    {/* Step cards */}
                    <div className="hiw-grid">
                        {/* Connector line between cards */}
                        <div className="hiw-connector" />

                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    className="hiw-card"
                                    initial={{ opacity: 0, y: 32 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{
                                        delay: idx * 0.1,
                                        duration: 0.55,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                >
                                    {/* Top row: numeral + tag */}
                                    <div className="hiw-numeral">
                                        <span>{step.numeral}</span>
                                        <span className="hiw-tag">{step.tag}</span>
                                    </div>

                                    {/* Icon */}
                                    <div className="hiw-icon-wrap">
                                        <Icon size={22} strokeWidth={1.75} />
                                    </div>

                                    {/* Text */}
                                    <h3 className="hiw-title">{step.title}</h3>
                                    <p className="hiw-desc">{step.description}</p>

                                    {/* Arrow hint */}
                                    <div className="hiw-arrow">
                                        Learn more
                                        <ArrowRight size={12} strokeWidth={2.5} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Footer CTA */}
                    <motion.div
                        className="hiw-footer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <div className="hiw-footer-line" />
                        <span className="hiw-footer-text">Ready to start your journey?</span>
                        <button className="hiw-footer-cta">
                            <Sparkles size={15} />
                            Plan my Morocco trip
                            <ArrowRight size={14} strokeWidth={2.5} />
                        </button>
                        <div className="hiw-footer-line right" />
                    </motion.div>

                </div>
            </section>
        </>
    );
}