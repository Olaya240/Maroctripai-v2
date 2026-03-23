import { Check, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const plans = [
    {
        id: 'free',
        name: 'Free Explorer',
        price: '0',
        period: 'forever',
        description: 'Perfect for trying out AI trip planning',
        features: [
            'Basic AI-powered itinerary',
            'Up to 3 destinations',
            'Standard recommendations',
            'Community support',
            'Mobile app access',
        ],
        cta: 'Start for free',
        ctaIcon: ArrowRight,
        highlighted: false,
    },
    {
        id: 'pro',
        name: 'Pro Traveler',
        price: '29',
        period: 'per month',
        description: 'For serious travelers seeking the ultimate experience',
        features: [
            'Advanced AI personalization',
            'Unlimited destinations',
            'Premium hotel & restaurant picks',
            'Real-time itinerary optimization',
            'Priority 24/7 support',
            'Offline access',
            'Budget optimization tools',
            'Local expert consultations',
        ],
        cta: 'Start Pro trial',
        ctaIcon: Zap,
        highlighted: true,
    },
];

const guarantee = [
    '14-day money-back guarantee',
    'No credit card for free plan',
    'Cancel anytime',
];

export default function Pricing() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

                .pr-root {
                    font-family: 'DM Sans', sans-serif;
                    padding: 120px 0;
                    background: #fff;
                    position: relative;
                    overflow: hidden;
                }

                .pr-root::before {
                    content: '';
                    position: absolute;
                    top: 40%; left: 50%;
                    transform: translate(-50%, -50%);
                    width: 700px; height: 400px;
                    background: radial-gradient(ellipse, rgba(245,158,11,0.05) 0%, transparent 65%);
                    pointer-events: none;
                }

                .pr-inner {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 0 36px;
                    position: relative;
                    z-index: 1;
                }

                @media (max-width: 640px) { .pr-inner { padding: 0 20px; } }

                /* Header */
                .pr-header {
                    text-align: center;
                    margin-bottom: 56px;
                }

                .pr-overline {
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

                .pr-overline-dot {
                    width: 20px; height: 1.5px;
                    background: linear-gradient(90deg, #f59e0b, #ea580c);
                    border-radius: 2px;
                }

                .pr-headline {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(36px, 4.5vw, 56px);
                    font-weight: 600;
                    line-height: 1.08;
                    color: #111827;
                    letter-spacing: -0.01em;
                    margin-bottom: 14px;
                }

                .pr-headline em {
                    font-style: italic;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .pr-sub {
                    font-size: 15px;
                    color: #6b7280;
                    line-height: 1.6;
                    max-width: 380px;
                    margin: 0 auto;
                }

                /* Grid */
                .pr-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.08fr;
                    gap: 20px;
                    align-items: start;
                }

                @media (max-width: 720px) {
                    .pr-grid { grid-template-columns: 1fr; }
                }

                /* ── Free card ── */
                .pr-card {
                    border-radius: 28px;
                    position: relative;
                    overflow: hidden;
                }

                .pr-card-free {
                    background: #fafafa;
                    border: 1.5px solid #f3f4f6;
                    padding: 36px 32px 32px;
                    transition: all 0.28s ease;
                }

                .pr-card-free:hover {
                    border-color: #fde68a;
                    background: #fffbeb;
                    box-shadow: 0 12px 36px rgba(245,158,11,0.08);
                    transform: translateY(-4px);
                }

                .pr-card-free::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #f59e0b, #ea580c);
                    opacity: 0;
                    transition: opacity 0.28s;
                }

                .pr-card-free:hover::before { opacity: 1; }

                /* ── Pro card ── */
                .pr-card-pro {
                    background: linear-gradient(160deg, #111827 0%, #1c1410 60%, #0d0a06 100%);
                    padding: 38px 32px 32px;
                    box-shadow:
                        0 0 0 1px rgba(245,158,11,0.2),
                        0 24px 64px rgba(0,0,0,0.25),
                        0 8px 24px rgba(245,158,11,0.12);
                    transition: all 0.28s ease;
                }

                .pr-card-pro:hover {
                    transform: translateY(-6px);
                    box-shadow:
                        0 0 0 1px rgba(245,158,11,0.3),
                        0 32px 80px rgba(0,0,0,0.3),
                        0 12px 32px rgba(245,158,11,0.18);
                }

                /* Amber shimmer top on pro */
                .pr-pro-topbar {
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #f59e0b, #ea580c, #f59e0b);
                    background-size: 200% 100%;
                    animation: pr-gradshift 3s linear infinite;
                }

                @keyframes pr-gradshift {
                    0% { background-position: 0%; }
                    100% { background-position: 200%; }
                }

                /* Glow orb behind pro */
                .pr-pro-glow {
                    position: absolute;
                    top: -40px; right: -40px;
                    width: 200px; height: 200px;
                    background: radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%);
                    pointer-events: none;
                }

                /* Popular badge */
                .pr-popular-badge {
                    position: absolute;
                    top: 20px; right: 20px;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    padding: 5px 12px;
                    border-radius: 100px;
                    background: rgba(245,158,11,0.18);
                    border: 1px solid rgba(245,158,11,0.3);
                    color: #fbbf24;
                }

                /* Plan name */
                .pr-plan-name {
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    margin-bottom: 20px;
                }

                .pr-plan-name-free { color: #9ca3af; }
                .pr-plan-name-pro { color: rgba(245,158,11,0.7); }

                /* Price */
                .pr-price-row {
                    display: flex;
                    align-items: baseline;
                    gap: 4px;
                    margin-bottom: 8px;
                    line-height: 1;
                }

                .pr-currency {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 22px;
                    font-weight: 500;
                    margin-top: 6px;
                }

                .pr-currency-free { color: #9ca3af; }
                .pr-currency-pro { color: rgba(255,255,255,0.5); }

                .pr-amount {
                    font-family: 'Cormorant Garamond', serif;
                    font-weight: 600;
                    letter-spacing: -0.03em;
                    font-size: clamp(56px, 8vw, 72px);
                    line-height: 1;
                }

                .pr-amount-free { color: #111827; }
                .pr-amount-pro { color: #fff; }

                .pr-period {
                    font-size: 12px;
                    font-weight: 600;
                    margin-left: 4px;
                    margin-bottom: 2px;
                }

                .pr-period-free { color: #9ca3af; }
                .pr-period-pro { color: rgba(255,255,255,0.4); }

                .pr-desc {
                    font-size: 13px;
                    line-height: 1.6;
                    margin-bottom: 28px;
                    padding-bottom: 28px;
                }

                .pr-desc-free {
                    color: #6b7280;
                    border-bottom: 1px solid #f3f4f6;
                }

                .pr-desc-pro {
                    color: rgba(255,255,255,0.45);
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                }

                /* Feature list */
                .pr-features {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 28px;
                }

                .pr-feature {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    font-size: 13px;
                    line-height: 1.5;
                }

                .pr-feature-free { color: #374151; }
                .pr-feature-pro { color: rgba(255,255,255,0.75); }

                .pr-check {
                    width: 18px; height: 18px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    margin-top: 1px;
                }

                .pr-check-free {
                    background: #fff8eb;
                    border: 1.5px solid #fde68a;
                }

                .pr-check-pro {
                    background: rgba(245,158,11,0.18);
                    border: 1px solid rgba(245,158,11,0.3);
                }

                /* CTA buttons */
                .pr-cta-free {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 14px;
                    border-radius: 14px;
                    border: 1.5px solid #e5e7eb;
                    background: #fff;
                    color: #374151;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    transition: all 0.22s;
                    letter-spacing: 0.01em;
                }

                .pr-cta-free:hover {
                    border-color: #f59e0b;
                    color: #d97706;
                    background: #fffbeb;
                    box-shadow: 0 4px 16px rgba(245,158,11,0.1);
                }

                .pr-cta-pro {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 15px;
                    border-radius: 14px;
                    border: none;
                    background: linear-gradient(135deg, #f59e0b 0%, #ea580c 55%, #f59e0b 100%);
                    background-size: 200% 100%;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    box-shadow: 0 8px 28px rgba(245,158,11,0.38);
                    transition: all 0.28s ease;
                    letter-spacing: 0.01em;
                    position: relative;
                    overflow: hidden;
                }

                .pr-cta-pro::after {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%; width: 55%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.85s;
                }

                .pr-cta-pro:hover {
                    background-position: 100% 0;
                    box-shadow: 0 12px 40px rgba(245,158,11,0.5);
                    transform: translateY(-1px);
                }

                .pr-cta-pro:hover::after { left: 160%; }

                /* Guarantee row */
                .pr-guarantee {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 24px;
                    margin-top: 40px;
                    flex-wrap: wrap;
                }

                .pr-guarantee-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    color: #9ca3af;
                    font-weight: 500;
                }

                .pr-guarantee-check {
                    width: 16px; height: 16px;
                    border-radius: 50%;
                    background: #fff8eb;
                    border: 1.5px solid #fde68a;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .pr-guarantee-dot {
                    width: 3px; height: 3px;
                    border-radius: 50%;
                    background: #e5e7eb;
                }
            `}</style>

            <section id="pricing" className="pr-root">
                <div className="pr-inner">

                    {/* Header */}
                    <motion.div
                        className="pr-header"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="pr-overline" style={{ justifyContent: 'center' }}>
                            <div className="pr-overline-dot" />
                            Pricing
                            <div className="pr-overline-dot" style={{ background: 'linear-gradient(90deg, #ea580c, transparent)' }} />
                        </div>
                        <h2 className="pr-headline">
                            One price for your<br />
                            <em>perfect journey</em>
                        </h2>
                        <p className="pr-sub">
                            Start exploring for free, or unlock everything with Pro — no hidden fees, ever.
                        </p>
                    </motion.div>

                    {/* Cards */}
                    <div className="pr-grid">

                        {/* Free card */}
                        <motion.div
                            className="pr-card pr-card-free"
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="pr-plan-name pr-plan-name-free">Free Explorer</div>

                            <div className="pr-price-row">
                                <span className="pr-currency pr-currency-free">$</span>
                                <span className="pr-amount pr-amount-free">0</span>
                                <span className="pr-period pr-period-free">/ forever</span>
                            </div>

                            <p className="pr-desc pr-desc-free">
                                Perfect for trying out AI trip planning — no commitment needed.
                            </p>

                            <ul className="pr-features">
                                {plans[0].features.map((f, i) => (
                                    <motion.li
                                        key={i}
                                        className="pr-feature pr-feature-free"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                                    >
                                        <div className="pr-check pr-check-free">
                                            <Check size={10} style={{ color: '#f59e0b' }} strokeWidth={3} />
                                        </div>
                                        {f}
                                    </motion.li>
                                ))}
                            </ul>

                            <button className="pr-cta-free">
                                Start for free
                                <ArrowRight size={14} strokeWidth={2.5} />
                            </button>
                        </motion.div>

                        {/* Pro card */}
                        <motion.div
                            className="pr-card pr-card-pro"
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="pr-pro-topbar" />
                            <div className="pr-pro-glow" />

                            <div className="pr-popular-badge">
                                <Sparkles size={9} />
                                Most Popular
                            </div>

                            <div className="pr-plan-name pr-plan-name-pro">Pro Traveler</div>

                            <div className="pr-price-row">
                                <span className="pr-currency pr-currency-pro">$</span>
                                <span className="pr-amount pr-amount-pro">29</span>
                                <span className="pr-period pr-period-pro">/ month</span>
                            </div>

                            <p className="pr-desc pr-desc-pro">
                                For serious travelers who want the ultimate AI-powered experience.
                            </p>

                            <ul className="pr-features">
                                {plans[1].features.map((f, i) => (
                                    <motion.li
                                        key={i}
                                        className="pr-feature pr-feature-pro"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                                    >
                                        <div className="pr-check pr-check-pro">
                                            <Check size={10} style={{ color: '#f59e0b' }} strokeWidth={3} />
                                        </div>
                                        {f}
                                    </motion.li>
                                ))}
                            </ul>

                            <button className="pr-cta-pro">
                                <Zap size={14} strokeWidth={2.5} />
                                Start Pro trial
                                <ArrowRight size={14} strokeWidth={2.5} />
                            </button>
                        </motion.div>
                    </div>

                    {/* Guarantees */}
                    <motion.div
                        className="pr-guarantee"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                    >
                        {guarantee.map((text, i) => (
                            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                                {i > 0 && <div className="pr-guarantee-dot" />}
                                <div className="pr-guarantee-item">
                                    <div className="pr-guarantee-check">
                                        <Check size={9} style={{ color: '#f59e0b' }} strokeWidth={3} />
                                    </div>
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