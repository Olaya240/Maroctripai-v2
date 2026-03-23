import { Shield, Heart, Globe, Award, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const reasons = [
    {
        icon: Heart,
        title: 'Authentic Local Experience',
        description: 'Built by Moroccans who know the hidden gems, local customs, and authentic experiences beyond tourist traps.',
        accent: '#ea580c',
        bg: '#fff7ed',
        border: '#fed7aa',
    },
    {
        icon: Globe,
        title: 'AI-Powered Intelligence',
        description: 'Cutting-edge technology analyzes millions of data points to craft the perfect itinerary for your unique journey.',
        accent: '#2563eb',
        bg: '#eff6ff',
        border: '#bfdbfe',
    },
    {
        icon: Shield,
        title: 'Trusted & Secure',
        description: 'Your data and travel plans are protected with enterprise-grade security. Plan with complete peace of mind.',
        accent: '#059669',
        bg: '#ecfdf5',
        border: '#a7f3d0',
    },
    {
        icon: Award,
        title: 'Award-Winning Support',
        description: '24/7 multilingual support to assist you before, during, and after your Moroccan adventure.',
        accent: '#9333ea',
        bg: '#fdf4ff',
        border: '#e9d5ff',
    },
];

const metrics = [
    { value: '50K+', label: 'Happy Travelers' },
    { value: '200+', label: 'Destinations' },
    { value: '4.9', label: 'Average Rating', unit: '★' },
    { value: '24/7', label: 'Support Available' },
];

export default function WhyMarocTrip() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

                .why-root {
                    font-family: 'DM Sans', sans-serif;
                    padding: 120px 0;
                    background: #f9fafb;
                    position: relative;
                    overflow: hidden;
                }

                /* Amber radial warmth behind metrics */
                .why-root::after {
                    content: '';
                    position: absolute;
                    bottom: 0; left: 50%;
                    transform: translateX(-50%);
                    width: 800px; height: 320px;
                    background: radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 70%);
                    pointer-events: none;
                }

                .why-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 36px;
                    position: relative;
                    z-index: 1;
                }

                @media (max-width: 640px) { .why-inner { padding: 0 20px; } }

                /* Header */
                .why-header {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 32px;
                    margin-bottom: 56px;
                    flex-wrap: wrap;
                }

                .why-overline {
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

                .why-overline-dot {
                    width: 20px; height: 1.5px;
                    background: linear-gradient(90deg, #f59e0b, #ea580c);
                    border-radius: 2px;
                }

                .why-headline {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(36px, 4.5vw, 56px);
                    font-weight: 600;
                    line-height: 1.08;
                    color: #111827;
                    letter-spacing: -0.01em;
                }

                .why-headline em {
                    font-style: italic;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .why-sub {
                    font-size: 14px;
                    color: #6b7280;
                    line-height: 1.7;
                    max-width: 300px;
                    text-align: right;
                    align-self: flex-end;
                }

                @media (max-width: 640px) { .why-sub { text-align: left; max-width: 100%; } }

                /* Reason grid */
                .why-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                    margin-bottom: 80px;
                }

                @media (max-width: 960px) { .why-grid { grid-template-columns: repeat(2, 1fr); } }
                @media (max-width: 520px) { .why-grid { grid-template-columns: 1fr; } }

                /* Card */
                .why-card {
                    background: #fff;
                    border: 1.5px solid #f3f4f6;
                    border-radius: 24px;
                    padding: 26px 22px;
                    position: relative;
                    overflow: hidden;
                    cursor: default;
                    transition: all 0.28s ease;
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                }

                .why-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 16px 40px rgba(0,0,0,0.07);
                }

                /* Dynamic top accent per card */
                .why-card-accent {
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 3px;
                    border-radius: 0;
                    opacity: 0;
                    transition: opacity 0.28s;
                }

                .why-card:hover .why-card-accent { opacity: 1; }

                /* Corner decoration */
                .why-card-corner {
                    position: absolute;
                    top: 0; right: 0;
                    width: 64px; height: 64px;
                    border-radius: 0 24px 0 100%;
                    opacity: 0;
                    transition: opacity 0.28s;
                }

                .why-card:hover .why-card-corner { opacity: 1; }

                /* Icon */
                .why-icon-wrap {
                    width: 48px; height: 48px;
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 18px;
                    flex-shrink: 0;
                    border: 1.5px solid;
                    transition: all 0.28s;
                }

                .why-card-title {
                    font-size: 15px;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 8px;
                    letter-spacing: -0.01em;
                    line-height: 1.3;
                }

                .why-card-desc {
                    font-size: 13px;
                    color: #6b7280;
                    line-height: 1.65;
                    flex: 1;
                }

                /* ── Metrics section ── */
                .why-metrics {
                    position: relative;
                    background: #fff;
                    border: 1.5px solid #f3f4f6;
                    border-radius: 28px;
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
                }

                @media (max-width: 640px) {
                    .why-metrics { grid-template-columns: repeat(2, 1fr); }
                }

                .why-metric {
                    padding: 36px 24px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    border-right: 1px solid #f3f4f6;
                    position: relative;
                    transition: background 0.25s;
                    cursor: default;
                }

                .why-metric:hover { background: #fffbeb; }

                .why-metric:last-child { border-right: none; }

                @media (max-width: 640px) {
                    .why-metric:nth-child(2) { border-right: none; }
                    .why-metric:nth-child(3) { border-top: 1px solid #f3f4f6; }
                    .why-metric:nth-child(4) { border-top: 1px solid #f3f4f6; border-right: none; }
                }

                /* Amber top accent on hover */
                .why-metric::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #f59e0b, #ea580c);
                    opacity: 0;
                    transition: opacity 0.25s;
                }

                .why-metric:hover::before { opacity: 1; }

                .why-metric-val {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(36px, 4vw, 52px);
                    font-weight: 600;
                    color: #111827;
                    line-height: 1;
                    margin-bottom: 6px;
                    letter-spacing: -0.02em;
                    display: flex;
                    align-items: baseline;
                    gap: 2px;
                }

                .why-metric-unit {
                    font-size: 0.55em;
                    color: #f59e0b;
                    font-style: italic;
                }

                .why-metric-label {
                    font-size: 11px;
                    font-weight: 600;
                    color: #9ca3af;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }

                /* Divider between grid and metrics */
                .why-section-divider {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 28px;
                }

                .why-divider-line {
                    flex: 1;
                    height: 1px;
                    background: #f3f4f6;
                }

                .why-divider-label {
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.16em;
                    text-transform: uppercase;
                    color: #d1d5db;
                }
            `}</style>

            <section className="why-root">
                <div className="why-inner">

                    {/* Header */}
                    <motion.div
                        className="why-header"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div>
                            <div className="why-overline">
                                <div className="why-overline-dot" />
                                Why MarocTrip
                            </div>
                            <h2 className="why-headline">
                                Morocco, planned<br />
                                <em>the right way</em>
                            </h2>
                        </div>
                        <p className="why-sub">
                            Moroccan hospitality meets cutting-edge AI — for journeys that feel both authentic and effortless.
                        </p>
                    </motion.div>

                    {/* Reason cards */}
                    <div className="why-grid">
                        {reasons.map((reason, idx) => {
                            const Icon = reason.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    className="why-card"
                                    initial={{ opacity: 0, y: 28 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{
                                        delay: idx * 0.09,
                                        duration: 0.55,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                >
                                    {/* Top accent */}
                                    <div
                                        className="why-card-accent"
                                        style={{ background: `linear-gradient(90deg, ${reason.accent}, ${reason.accent}88)` }}
                                    />

                                    {/* Corner */}
                                    <div
                                        className="why-card-corner"
                                        style={{ background: reason.bg }}
                                    />

                                    {/* Icon */}
                                    <div
                                        className="why-icon-wrap"
                                        style={{
                                            background: reason.bg,
                                            borderColor: reason.border,
                                            color: reason.accent,
                                        }}
                                    >
                                        <Icon size={21} strokeWidth={1.75} />
                                    </div>

                                    <div className="why-card-title">{reason.title}</div>
                                    <div className="why-card-desc">{reason.description}</div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Divider */}
                    <motion.div
                        className="why-section-divider"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className="why-divider-line" />
                        <span className="why-divider-label">By the numbers</span>
                        <div className="why-divider-line" />
                    </motion.div>

                    {/* Metrics strip */}
                    <motion.div
                        className="why-metrics"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {metrics.map((m, idx) => (
                            <motion.div
                                key={m.label}
                                className="why-metric"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + idx * 0.08, duration: 0.5 }}
                            >
                                <div className="why-metric-val">
                                    {m.value}
                                    {m.unit && <span className="why-metric-unit">{m.unit}</span>}
                                </div>
                                <div className="why-metric-label">{m.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </section>
        </>
    );
}