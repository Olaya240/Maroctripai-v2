import { Brain, Wallet, Hotel, Zap, ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
    {
        icon: Brain,
        title: 'Personalized Itineraries',
        description: 'AI analyzes your preferences, travel style, and interests to create a unique journey tailored just for you.',
        numeral: '01',
    },
    {
        icon: Wallet,
        title: 'Smart Budget Planning',
        description: 'Optimize your spending with intelligent recommendations that maximize value without compromising experience.',
        numeral: '02',
    },
    {
        icon: Hotel,
        title: 'Hotel & Activity Picks',
        description: 'Curated accommodations, restaurants, and experiences based on local insights and live reviews.',
        numeral: '03',
    },
    {
        icon: Zap,
        title: 'Real-Time Optimization',
        description: 'Dynamic adjustments based on weather, events, and live availability — always the best plan.',
        numeral: '04',
    },
];

const mockItinerary = [
    { time: '09:00', title: 'Breakfast at Riad El Yacout', type: 'Food', color: '#ea580c' },
    { time: '11:00', title: 'Jemaa el-Fnaa Square Tour', type: 'Culture', color: '#2563eb' },
    { time: '13:30', title: 'Rooftop Lunch — Medina Views', type: 'Food', color: '#ea580c' },
    { time: '16:00', title: 'Souk Discovery Walk', type: 'Lifestyle', color: '#9333ea' },
    { time: '19:30', title: 'Sunset at Koutoubia Mosque', type: 'Culture', color: '#2563eb' },
];

export default function Features() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

                .ft-root {
                    font-family: 'DM Sans', sans-serif;
                    padding: 120px 0;
                    background: #fff;
                    position: relative;
                    overflow: hidden;
                }

                .ft-root::before {
                    content: '';
                    position: absolute;
                    top: 0; right: 0;
                    width: 500px; height: 500px;
                    background: radial-gradient(ellipse, rgba(245,158,11,0.05) 0%, transparent 65%);
                    pointer-events: none;
                }

                .ft-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 36px;
                    position: relative;
                    z-index: 1;
                }

                @media (max-width: 640px) { .ft-inner { padding: 0 20px; } }

                /* Two-col layout */
                .ft-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                    align-items: start;
                }

                @media (max-width: 960px) {
                    .ft-grid { grid-template-columns: 1fr; gap: 60px; }
                }

                /* Left col */
                .ft-overline {
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

                .ft-overline-dot {
                    width: 20px; height: 1.5px;
                    background: linear-gradient(90deg, #f59e0b, #ea580c);
                    border-radius: 2px;
                }

                .ft-headline {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(36px, 4.5vw, 56px);
                    font-weight: 600;
                    line-height: 1.08;
                    color: #111827;
                    letter-spacing: -0.01em;
                    margin-bottom: 18px;
                }

                .ft-headline em {
                    font-style: italic;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .ft-sub {
                    font-size: 15px;
                    color: #6b7280;
                    line-height: 1.7;
                    max-width: 400px;
                    margin-bottom: 52px;
                }

                /* Feature list */
                .ft-list {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .ft-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                    padding: 18px 16px;
                    border-radius: 18px;
                    border: 1.5px solid transparent;
                    background: transparent;
                    transition: all 0.25s ease;
                    cursor: default;
                    position: relative;
                }

                .ft-item:hover {
                    background: #fffbeb;
                    border-color: #fde68a;
                    box-shadow: 0 4px 20px rgba(245,158,11,0.07);
                }

                .ft-item-icon {
                    width: 44px; height: 44px;
                    border-radius: 14px;
                    background: #fff3d0;
                    color: #f59e0b;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: all 0.25s;
                    border: 1.5px solid #fde68a;
                }

                .ft-item:hover .ft-item-icon {
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    color: #fff;
                    border-color: transparent;
                    box-shadow: 0 6px 16px rgba(245,158,11,0.3);
                }

                .ft-item-num {
                    position: absolute;
                    top: 18px; right: 16px;
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 11px;
                    color: #e5e7eb;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    transition: color 0.25s;
                }

                .ft-item:hover .ft-item-num { color: rgba(245,158,11,0.4); }

                .ft-item-title {
                    font-size: 15px;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 4px;
                    letter-spacing: -0.01em;
                }

                .ft-item-desc {
                    font-size: 13px;
                    color: #6b7280;
                    line-height: 1.6;
                }

                /* CTA link */
                .ft-cta-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 40px;
                    padding: 13px 26px;
                    border-radius: 14px;
                    border: none;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    color: #fff;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    box-shadow: 0 6px 24px rgba(245,158,11,0.32);
                    transition: all 0.25s;
                    position: relative;
                    overflow: hidden;
                }

                .ft-cta-link::after {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%; width: 55%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.8s;
                }

                .ft-cta-link:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 36px rgba(245,158,11,0.42);
                }

                .ft-cta-link:hover::after { left: 160%; }

                /* ── Right col: mock UI card ── */
                .ft-visual {
                    position: relative;
                    top: 0;
                }

                @media (min-width: 960px) { .ft-visual { position: sticky; top: 100px; } }

                .ft-ui-card {
                    background: #fff;
                    border: 1.5px solid #f3f4f6;
                    border-radius: 28px;
                    overflow: hidden;
                    box-shadow:
                        0 4px 6px rgba(0,0,0,0.02),
                        0 20px 60px rgba(0,0,0,0.07),
                        0 0 0 1px rgba(255,255,255,0.8) inset;
                }

                /* Card top bar */
                .ft-card-topbar {
                    height: 3px;
                    background: linear-gradient(90deg, #f59e0b, #ea580c, #f59e0b);
                    background-size: 200% 100%;
                    animation: ft-gradshift 3s linear infinite;
                }

                @keyframes ft-gradshift {
                    0% { background-position: 0%; }
                    100% { background-position: 200%; }
                }

                .ft-card-header {
                    padding: 20px 22px 16px;
                    border-bottom: 1px solid #f9fafb;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .ft-card-title-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .ft-card-logo {
                    width: 28px; height: 28px;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    display: flex; align-items: center; justify-content: center;
                    color: #fff; font-weight: 800; font-size: 12px;
                    box-shadow: 0 3px 8px rgba(245,158,11,0.3);
                }

                .ft-card-label {
                    font-size: 13px;
                    font-weight: 700;
                    color: #111827;
                }

                .ft-card-badge {
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    padding: 3px 9px;
                    border-radius: 100px;
                    background: #fff8eb;
                    border: 1px solid #fde68a;
                    color: #d97706;
                }

                /* Destination hero */
                .ft-card-dest {
                    position: relative;
                    height: 160px;
                    overflow: hidden;
                }

                .ft-card-dest-img {
                    width: 100%; height: 100%;
                    object-fit: cover;
                    filter: brightness(0.75);
                }

                .ft-card-dest-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
                }

                .ft-card-dest-text {
                    position: absolute;
                    bottom: 14px; left: 18px;
                }

                .ft-card-dest-name {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 22px;
                    font-weight: 600;
                    color: #fff;
                    line-height: 1.1;
                }

                .ft-card-dest-sub {
                    font-size: 11px;
                    color: rgba(255,255,255,0.6);
                    margin-top: 2px;
                    letter-spacing: 0.04em;
                }

                /* AI insight chip */
                .ft-card-ai-row {
                    margin: 14px 18px;
                    padding: 10px 14px;
                    border-radius: 14px;
                    background: linear-gradient(135deg, #111827, #1f2937);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .ft-card-ai-icon {
                    width: 26px; height: 26px;
                    border-radius: 8px;
                    background: rgba(245,158,11,0.2);
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }

                .ft-card-ai-text {
                    font-size: 11px;
                    color: rgba(255,255,255,0.6);
                    line-height: 1.4;
                    flex: 1;
                }

                .ft-card-ai-text strong { color: #fff; font-weight: 600; }

                /* Timeline */
                .ft-card-timeline {
                    padding: 4px 18px 18px;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .ft-card-tl-label {
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #9ca3af;
                    margin-bottom: 10px;
                    margin-top: 4px;
                }

                .ft-tl-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 9px 10px;
                    border-radius: 12px;
                    transition: background 0.2s;
                }

                .ft-tl-item:hover { background: #f9fafb; }

                .ft-tl-time {
                    font-size: 10px;
                    font-weight: 700;
                    color: #9ca3af;
                    letter-spacing: 0.04em;
                    width: 38px;
                    flex-shrink: 0;
                }

                .ft-tl-dot {
                    width: 8px; height: 8px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }

                .ft-tl-title {
                    font-size: 12px;
                    font-weight: 600;
                    color: #374151;
                    flex: 1;
                    line-height: 1.3;
                }

                .ft-tl-type {
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    padding: 2px 7px;
                    border-radius: 100px;
                }

                /* Stats row */
                .ft-card-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    border-top: 1px solid #f3f4f6;
                    margin: 0 18px;
                    padding: 14px 0;
                    gap: 0;
                }

                .ft-card-stat {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 0 8px;
                    border-right: 1px solid #f3f4f6;
                }

                .ft-card-stat:last-child { border-right: none; }

                .ft-card-stat-val {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 18px;
                    font-weight: 600;
                    color: #111827;
                    line-height: 1;
                }

                .ft-card-stat-key {
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #9ca3af;
                    margin-top: 3px;
                    text-align: center;
                }

                /* Check list */
                .ft-checks {
                    padding: 14px 18px 20px;
                    border-top: 1px solid #f3f4f6;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .ft-check-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 12px;
                    color: #6b7280;
                    font-weight: 500;
                }

                .ft-check-icon {
                    width: 18px; height: 18px;
                    border-radius: 50%;
                    background: #fff8eb;
                    border: 1.5px solid #fde68a;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
            `}</style>

            <section id="features" className="ft-root">
                <div className="ft-inner">
                    <div className="ft-grid">

                        {/* Left: Feature list */}
                        <motion.div
                            initial={{ opacity: 0, x: -32 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="ft-overline">
                                <div className="ft-overline-dot" />
                                Features
                            </div>

                            <h2 className="ft-headline">
                                Planning made<br />
                                <em>effortlessly smart</em>
                            </h2>

                            <p className="ft-sub">
                                Experience the future of travel planning with AI features designed to make your Moroccan adventure seamless and unforgettable.
                            </p>

                            <div className="ft-list">
                                {features.map((feature, idx) => {
                                    const Icon = feature.icon;
                                    return (
                                        <motion.div
                                            key={idx}
                                            className="ft-item"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-40px" }}
                                            transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <div className="ft-item-icon">
                                                <Icon size={20} strokeWidth={1.75} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div className="ft-item-title">{feature.title}</div>
                                                <div className="ft-item-desc">{feature.description}</div>
                                            </div>
                                            <div className="ft-item-num">{feature.numeral}</div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <motion.button
                                className="ft-cta-link"
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                onClick={() => {}}
                            >
                                <Brain size={15} />
                                Try AI Planning Free
                                <ArrowRight size={14} strokeWidth={2.5} />
                            </motion.button>
                        </motion.div>

                        {/* Right: Mock UI */}
                        <motion.div
                            className="ft-visual"
                            initial={{ opacity: 0, x: 32 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="ft-ui-card">
                                {/* Animated top bar */}
                                <div className="ft-card-topbar" />

                                {/* Header */}
                                <div className="ft-card-header">
                                    <div className="ft-card-title-row">
                                        <div className="ft-card-logo">M</div>
                                        <span className="ft-card-label">Day 1 · Marrakech</span>
                                    </div>
                                    <span className="ft-card-badge">AI Generated</span>
                                </div>

                                {/* Destination photo */}
                                <div className="ft-card-dest">
                                    <img
                                        className="ft-card-dest-img"
                                        src="https://images.unsplash.com/photo-1628962600458-1704b2cb1fb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                                        alt="Marrakech"
                                    />
                                    <div className="ft-card-dest-overlay" />
                                    <div className="ft-card-dest-text">
                                        <div className="ft-card-dest-name">Marrakech</div>
                                        <div className="ft-card-dest-sub">Oct 15 · Sunny · 24°C</div>
                                    </div>
                                </div>

                                {/* AI insight */}
                                <div className="ft-card-ai-row">
                                    <div className="ft-card-ai-icon">
                                        <Brain size={13} style={{ color: '#f59e0b' }} />
                                    </div>
                                    <div className="ft-card-ai-text">
                                        <strong>AI Tip:</strong> Souks are quietest before 10am — best time for photography and haggling.
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="ft-card-timeline">
                                    <div className="ft-card-tl-label">Today's Schedule</div>
                                    {mockItinerary.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="ft-tl-item"
                                            initial={{ opacity: 0, x: 10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + idx * 0.08, duration: 0.4 }}
                                        >
                                            <span className="ft-tl-time">{item.time}</span>
                                            <div className="ft-tl-dot" style={{ background: item.color }} />
                                            <span className="ft-tl-title">{item.title}</span>
                                            <span
                                                className="ft-tl-type"
                                                style={{
                                                    background: `${item.color}15`,
                                                    color: item.color,
                                                }}
                                            >
                                                {item.type}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="ft-card-stats">
                                    {[
                                        { val: '5', key: 'Activities' },
                                        { val: '4★', key: 'Avg Rating' },
                                        { val: '$180', key: 'Est. Cost' },
                                    ].map(s => (
                                        <div key={s.key} className="ft-card-stat">
                                            <div className="ft-card-stat-val">{s.val}</div>
                                            <div className="ft-card-stat-key">{s.key}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Checklist */}
                                <div className="ft-checks">
                                    {[
                                        'Bookings confirmed automatically',
                                        'Budget tracked in real-time',
                                        'Offline access included',
                                    ].map(text => (
                                        <div key={text} className="ft-check-item">
                                            <div className="ft-check-icon">
                                                <Check size={10} style={{ color: '#f59e0b' }} strokeWidth={3} />
                                            </div>
                                            {text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>
        </>
    );
}