import { motion, AnimatePresence } from 'framer-motion';
import {
    Wallet,
    Wine,
    Compass,
    Palmtree,
    Camera,
    PartyPopper,
    Utensils,
    ArrowRight,
    ArrowLeft,
    Check,
    Sparkles,
    Building2,
    Home,
    Tent,
    Hotel
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { TripData } from './WizardLayout';

type Step2Props = {
    data: TripData;
    updateData: (data: Partial<TripData>) => void;
    onNext: () => void;
    onBack: () => void;
};

const stylesList = [
    { id: 'romantic', label: 'Romantic', icon: Wine, desc: "Couples & sunsets" },
    { id: 'relax', label: 'Relax', icon: Palmtree, desc: "Chill & unwind" },
    { id: 'adventure', label: 'Adventure', icon: Compass, desc: "Thrills & nature" },
    { id: 'culture', label: 'Culture', icon: Camera, desc: "History & art" },
    { id: 'foodie', label: 'Foodie', icon: Utensils, desc: "Culinary tours" },
    { id: 'nightlife', label: 'Nightlife', icon: PartyPopper, desc: "Parties & events" },
];

const budgetLevels = [
    { id: 'Budget', label: 'Budget', sub: 'Save more, travel simpler', symbol: '$', bars: 1 },
    { id: 'Standard', label: 'Standard', sub: 'Balanced comfort & cost', symbol: '$$', bars: 2 },
    { id: 'Luxury', label: 'Luxury', sub: 'Premium & exclusive stays', symbol: '$$$', bars: 3 },
];

const accommodationTypes = [
    { id: 'Hotel', label: 'Hotel', icon: Building2 },
    { id: 'Riad', label: 'Riad', icon: Home },
    { id: 'Resort', label: 'Resort', icon: Hotel },
    { id: 'Hostel', label: 'Hostel', icon: Tent },
];

export default function Step2_StyleBudget({ data, updateData, onNext, onBack }: Step2Props) {
    const [budget, setBudget] = useState(data.budget || 'Standard');
    const [selectedStyles, setSelectedStyles] = useState<string[]>(data.styles || []);
    const [accommodation, setAccommodation] = useState(data.accommodation || 'Hotel');

    useEffect(() => {
        setBudget(data.budget || 'Standard');
        setSelectedStyles(data.styles || []);
        setAccommodation(data.accommodation || 'Hotel');
    }, [data]);

    const toggleStyle = (id: string) => {
        setSelectedStyles(prev => {
            if (prev.includes(id)) return prev.filter(s => s !== id);
            if (prev.length >= 3) return prev;
            return [...prev, id];
        });
    };

    const handleNext = () => {
        if (selectedStyles.length === 0) return;
        updateData({ budget, styles: selectedStyles, accommodation });
        onNext();
    };

    const isValid = selectedStyles.length > 0;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');

                .s2-root {
                    font-family: 'DM Sans', sans-serif;
                    background: #fff;
                    color: #111827;
                    position: relative;
                }

                .s2-root::before {
                    content: '';
                    position: fixed;
                    bottom: -20%;
                    left: -10%;
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(ellipse, rgba(251,191,36,0.1) 0%, transparent 65%);
                    pointer-events: none;
                    z-index: 0;
                }

                .s2-serif { font-family: 'Playfair Display', serif; }

                .s2-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 7px 16px;
                    background: #fff8eb;
                    border: 1px solid #fde68a;
                    border-radius: 100px;
                    color: #d97706;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                }

                .s2-label {
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #9ca3af;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 14px;
                }

                /* Budget cards */
                .s2-budget-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                }

                @media (max-width: 560px) {
                    .s2-budget-grid { grid-template-columns: 1fr; }
                }

                .s2-budget-card {
                    padding: 22px 20px;
                    border-radius: 24px;
                    border: 2px solid #f3f4f6;
                    background: #fafafa;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    transition: all 0.22s ease;
                    text-align: left;
                    position: relative;
                    overflow: hidden;
                }

                .s2-budget-card:hover:not(.sel) {
                    border-color: #fcd34d;
                    background: #fffbeb;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 28px rgba(245,158,11,0.08);
                }

                .s2-budget-card.sel {
                    border-color: #f59e0b;
                    background: #fff;
                    box-shadow: 0 0 0 4px rgba(245,158,11,0.08), 0 12px 32px rgba(245,158,11,0.12);
                }

                .s2-budget-card.sel::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; height: 3px;
                    background: linear-gradient(90deg, #f59e0b, #ea580c);
                }

                .s2-budget-symbol {
                    font-family: 'Playfair Display', serif;
                    font-size: 22px;
                    font-weight: 700;
                    color: #d1d5db;
                    transition: color 0.22s;
                    letter-spacing: 0.05em;
                }

                .s2-budget-card.sel .s2-budget-symbol {
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .s2-budget-name {
                    font-size: 16px;
                    font-weight: 700;
                    color: #111827;
                }

                .s2-budget-sub {
                    font-size: 12px;
                    color: #9ca3af;
                    line-height: 1.5;
                }

                .s2-bars {
                    display: flex;
                    gap: 3px;
                    margin-top: 2px;
                }

                .s2-bar {
                    height: 4px;
                    width: 20px;
                    border-radius: 100px;
                    background: #f3f4f6;
                    transition: background 0.22s;
                }

                .s2-bar.lit {
                    background: linear-gradient(90deg, #f59e0b, #ea580c);
                }

                /* Style grid */
                .s2-styles-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px;
                }

                @media (max-width: 560px) {
                    .s2-styles-grid { grid-template-columns: repeat(2, 1fr); }
                }

                .s2-style-card {
                    padding: 20px 16px;
                    border-radius: 22px;
                    border: 2px solid #f3f4f6;
                    background: #fafafa;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 10px;
                    transition: all 0.2s ease;
                    position: relative;
                    overflow: hidden;
                    text-align: left;
                    min-height: 130px;
                    justify-content: space-between;
                }

                .s2-style-card:hover:not(.sel) {
                    border-color: #fcd34d;
                    background: #fffbeb;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 24px rgba(245,158,11,0.08);
                }

                .s2-style-card.sel {
                    border-color: #f59e0b;
                    background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
                    color: #fff;
                    box-shadow: 0 10px 28px rgba(245,158,11,0.35);
                }

                .s2-style-card.sel::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 55%);
                    pointer-events: none;
                }

                .s2-style-icon {
                    width: 38px;
                    height: 38px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #fff3d0;
                    color: #f59e0b;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }

                .s2-style-card.sel .s2-style-icon {
                    background: rgba(255,255,255,0.22);
                    color: #fff;
                }

                .s2-style-name {
                    font-size: 14px;
                    font-weight: 700;
                    color: #111827;
                    transition: color 0.2s;
                }

                .s2-style-card.sel .s2-style-name { color: #fff; }

                .s2-style-desc {
                    font-size: 11px;
                    color: #9ca3af;
                    transition: color 0.2s;
                }

                .s2-style-card.sel .s2-style-desc { color: rgba(255,255,255,0.7); }

                .s2-check {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    width: 22px;
                    height: 22px;
                    background: #fff;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    z-index: 2;
                }

                .s2-style-counter {
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    padding: 4px 12px;
                    border-radius: 100px;
                    background: #fff8eb;
                    border: 1px solid #fde68a;
                    color: #d97706;
                }

                /* Accommodation */
                .s2-accom-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                }

                @media (max-width: 560px) {
                    .s2-accom-grid { grid-template-columns: repeat(2, 1fr); }
                }

                .s2-accom-card {
                    padding: 16px 12px;
                    border-radius: 18px;
                    border: 2px solid #f3f4f6;
                    background: #fafafa;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s ease;
                    color: #6b7280;
                    font-family: 'DM Sans', sans-serif;
                }

                .s2-accom-card:hover:not(.sel) {
                    border-color: #fcd34d;
                    background: #fffbeb;
                    color: #d97706;
                    transform: translateY(-2px);
                }

                .s2-accom-card.sel {
                    border-color: #f59e0b;
                    background: #fff;
                    color: #d97706;
                    box-shadow: 0 0 0 3px rgba(245,158,11,0.1), 0 8px 20px rgba(245,158,11,0.1);
                }

                .s2-accom-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f3f4f6;
                    transition: all 0.2s;
                }

                .s2-accom-card.sel .s2-accom-icon,
                .s2-accom-card:hover:not(.sel) .s2-accom-icon {
                    background: #fff3d0;
                }

                .s2-accom-name {
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.04em;
                }

                /* Footer */
                .s2-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #f3f4f6, transparent);
                }

                .s2-back-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 22px;
                    border-radius: 100px;
                    border: 1.5px solid #e5e7eb;
                    background: #fff;
                    color: #6b7280;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: 'DM Sans', sans-serif;
                }

                .s2-back-btn:hover {
                    border-color: #d1d5db;
                    color: #111827;
                    background: #f9fafb;
                }

                .s2-next-btn {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px 36px;
                    border-radius: 18px;
                    border: none;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 14px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .s2-next-btn.on {
                    background: linear-gradient(135deg, #f59e0b 0%, #ea580c 60%, #f59e0b 100%);
                    background-size: 200% 100%;
                    color: #fff;
                    box-shadow: 0 8px 28px rgba(245,158,11,0.4);
                }

                .s2-next-btn.on:hover {
                    background-position: 100% 0;
                    transform: translateY(-2px);
                    box-shadow: 0 12px 40px rgba(245,158,11,0.45);
                }

                .s2-next-btn.on::after {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%; width: 60%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.8s ease;
                }

                .s2-next-btn.on:hover::after { left: 150%; }

                .s2-next-btn.off {
                    background: #f3f4f6;
                    color: #d1d5db;
                    cursor: not-allowed;
                }
            `}</style>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="s2-root"
                style={{ padding: "40px 0", position: "relative", zIndex: 1 }}
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ marginBottom: 48 }}
                >
                    <div style={{ marginBottom: 16 }}>
                        <span className="s2-badge">
                            <Sparkles size={12} style={{ color: "#f59e0b" }} />
                            AI Personalization
                        </span>
                    </div>

                    <h2 className="s2-serif" style={{
                        fontSize: "clamp(36px, 5vw, 62px)",
                        fontWeight: 700,
                        lineHeight: 1.1,
                        color: "#111827",
                        letterSpacing: "-0.01em",
                        marginBottom: 14,
                    }}>
                        Craft your{" "}
                        <span style={{
                            background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            fontStyle: "italic",
                        }}>
                            experience
                        </span>
                    </h2>

                    <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.65, maxWidth: 460, fontWeight: 500 }}>
                        Tell us how you like to travel — our AI will tailor every activity, stay, and hidden gem just for you.
                    </p>
                </motion.div>

                <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>

                    {/* Budget */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="s2-label">
                            <Wallet size={12} style={{ color: "#f59e0b" }} /> Budget Level
                        </div>
                        <div className="s2-budget-grid">
                            {budgetLevels.map((level, idx) => (
                                <motion.button
                                    key={level.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.22 + idx * 0.06 }}
                                    whileHover={budget !== level.id ? { y: -4 } : {}}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setBudget(level.id)}
                                    className={`s2-budget-card ${budget === level.id ? "sel" : ""}`}
                                >
                                    <div className="s2-budget-symbol">{level.symbol}</div>
                                    <div>
                                        <div className="s2-budget-name">{level.label}</div>
                                        <div className="s2-budget-sub">{level.sub}</div>
                                    </div>
                                    <div className="s2-bars">
                                        {[1, 2, 3].map(b => (
                                            <div key={b} className={`s2-bar ${budget === level.id && b <= level.bars ? "lit" : ""}`} />
                                        ))}
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Trip Vibe */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                            <div className="s2-label" style={{ marginBottom: 0 }}>
                                Trip Vibe
                            </div>
                            <span className="s2-style-counter">{selectedStyles.length} / 3</span>
                        </div>

                        <div className="s2-styles-grid">
                            {stylesList.map((style, idx) => (
                                <motion.button
                                    key={style.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.32 + idx * 0.05 }}
                                    whileHover={!selectedStyles.includes(style.id) ? { y: -4 } : {}}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => toggleStyle(style.id)}
                                    className={`s2-style-card ${selectedStyles.includes(style.id) ? "sel" : ""}`}
                                >
                                    <div className="s2-style-icon">
                                        <style.icon size={18} />
                                    </div>
                                    <div>
                                        <div className="s2-style-name">{style.label}</div>
                                        <div className="s2-style-desc">{style.desc}</div>
                                    </div>

                                    <AnimatePresence>
                                        {selectedStyles.includes(style.id) && (
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                transition={{ type: "spring", bounce: 0.4, duration: 0.35 }}
                                                className="s2-check"
                                            >
                                                <Check size={12} style={{ color: "#f59e0b" }} strokeWidth={3} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Accommodation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="s2-label">
                            <Building2 size={12} style={{ color: "#f59e0b" }} /> Accommodation
                        </div>
                        <div className="s2-accom-grid">
                            {accommodationTypes.map((type, idx) => (
                                <motion.button
                                    key={type.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.42 + idx * 0.05 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => setAccommodation(type.id)}
                                    className={`s2-accom-card ${accommodation === type.id ? "sel" : ""}`}
                                >
                                    <div className="s2-accom-icon">
                                        <type.icon size={18} />
                                    </div>
                                    <span className="s2-accom-name">{type.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    style={{ marginTop: 52, display: "flex", flexDirection: "column", gap: 20 }}
                >
                    <div className="s2-divider" />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <button onClick={onBack} className="s2-back-btn">
                            <ArrowLeft size={16} />
                            Back
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!isValid}
                            className={`s2-next-btn ${isValid ? "on" : "off"}`}
                        >
                            <span style={{ position: "relative", zIndex: 1 }}>Continue</span>
                            {isValid && <ArrowRight size={17} strokeWidth={2.5} style={{ position: "relative", zIndex: 1 }} />}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}