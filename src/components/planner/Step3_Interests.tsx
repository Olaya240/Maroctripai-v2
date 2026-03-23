import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Tag, Utensils, FileText, Check, Plus, Info } from 'lucide-react';
import { TripData } from './WizardLayout';

type Step3Props = {
    data: TripData;
    updateData: (data: Partial<TripData>) => void;
    onNext: () => void;
    onBack: () => void;
};

const interestsList = [
    { label: "History & Museums", category: "Culture" },
    { label: "Nature & Outdoors", category: "Adventure" },
    { label: "Shopping & Souks", category: "Lifestyle" },
    { label: "Food & Dining", category: "Gastronomy" },
    { label: "Art & Galleries", category: "Culture" },
    { label: "Relaxation & Spa", category: "Wellness" },
    { label: "Hiking & Trekking", category: "Adventure" },
    { label: "Architecture", category: "Culture" },
    { label: "Photography", category: "Lifestyle" },
    { label: "Music & Festivals", category: "Entertainment" },
];

const categoryColors: Record<string, string> = {
    Culture: "#7c3aed",
    Adventure: "#059669",
    Lifestyle: "#db2777",
    Gastronomy: "#ea580c",
    Wellness: "#0891b2",
    Entertainment: "#d97706",
};

const dietaryOptions = [
    { label: "None", icon: "🍽️" },
    { label: "Vegetarian", icon: "🥗" },
    { label: "Vegan", icon: "🌱" },
    { label: "Halal", icon: "🌙" },
    { label: "Gluten-Free", icon: "🌾" },
];

export default function Step3_Interests({ data, updateData, onNext, onBack }: Step3Props) {
    const [interests, setInterests] = useState<string[]>(data.interests || []);
    const [diet, setDiet] = useState(data.diet || 'None');
    const [notes, setNotes] = useState(data.notes || '');
    const [charCount, setCharCount] = useState((data.notes || '').length);

    useEffect(() => {
        setInterests(data.interests || []);
        setDiet(data.diet || 'None');
        setNotes(data.notes || '');
    }, [data]);

    const toggleInterest = (interest: string) => {
        setInterests(prev =>
            prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
        );
    };

    const handleNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
        setCharCount(e.target.value.length);
    };

    const handleNext = () => {
        updateData({ interests, diet, notes });
        onNext();
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');

                .s3-root {
                    font-family: 'DM Sans', sans-serif;
                    background: #fff;
                    color: #111827;
                    position: relative;
                }

                .s3-root::before {
                    content: '';
                    position: fixed;
                    top: 10%;
                    left: -15%;
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(ellipse, rgba(251,191,36,0.09) 0%, transparent 65%);
                    pointer-events: none;
                    z-index: 0;
                }

                .s3-serif { font-family: 'Playfair Display', serif; }

                .s3-badge {
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

                .s3-label {
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #9ca3af;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                /* Interest tags */
                .s3-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 9px 18px;
                    border-radius: 100px;
                    border: 1.5px solid #f3f4f6;
                    background: #fafafa;
                    font-size: 13px;
                    font-weight: 600;
                    color: #4b5563;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    position: relative;
                    overflow: hidden;
                    white-space: nowrap;
                }

                .s3-tag:hover:not(.s3-tag-sel) {
                    border-color: #fcd34d;
                    background: #fffbeb;
                    color: #d97706;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(245,158,11,0.1);
                }

                .s3-tag-sel {
                    border-color: #f59e0b;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    color: #fff;
                    box-shadow: 0 6px 18px rgba(245,158,11,0.3);
                }

                .s3-tag-cat {
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    padding: 2px 7px;
                    border-radius: 100px;
                    opacity: 0.85;
                }

                .s3-interest-count {
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    padding: 4px 12px;
                    border-radius: 100px;
                    background: #fff8eb;
                    border: 1px solid #fde68a;
                    color: #d97706;
                }

                /* Dietary */
                .s3-diet-grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 10px;
                }

                @media (max-width: 560px) {
                    .s3-diet-grid { grid-template-columns: repeat(3, 1fr); }
                }

                .s3-diet-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    padding: 16px 10px;
                    border-radius: 20px;
                    border: 2px solid #f3f4f6;
                    background: #fafafa;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-family: 'DM Sans', sans-serif;
                    position: relative;
                }

                .s3-diet-card:hover:not(.sel) {
                    border-color: #fcd34d;
                    background: #fffbeb;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(245,158,11,0.08);
                }

                .s3-diet-card.sel {
                    border-color: #f59e0b;
                    background: #fff;
                    box-shadow: 0 0 0 3px rgba(245,158,11,0.12), 0 8px 20px rgba(245,158,11,0.12);
                }

                .s3-diet-card.sel::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; height: 2px;
                    background: linear-gradient(90deg, #f59e0b, #ea580c);
                    border-radius: 20px 20px 0 0;
                }

                .s3-diet-emoji {
                    font-size: 26px;
                    line-height: 1;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.08));
                }

                .s3-diet-name {
                    font-size: 11px;
                    font-weight: 700;
                    color: #6b7280;
                    letter-spacing: 0.04em;
                    text-align: center;
                    transition: color 0.2s;
                }

                .s3-diet-card.sel .s3-diet-name {
                    color: #d97706;
                }

                /* Textarea */
                .s3-textarea-wrap {
                    position: relative;
                }

                .s3-textarea {
                    width: 100%;
                    padding: 22px 24px 48px;
                    border-radius: 22px;
                    border: 2px solid #f3f4f6;
                    background: #fafafa;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    color: #374151;
                    line-height: 1.7;
                    resize: none;
                    min-height: 150px;
                    outline: none;
                    transition: all 0.25s ease;
                }

                .s3-textarea::placeholder { color: #d1d5db; }

                .s3-textarea:hover {
                    border-color: #fcd34d;
                    background: #fff;
                }

                .s3-textarea:focus {
                    border-color: #f59e0b;
                    background: #fff;
                    box-shadow: 0 0 0 5px rgba(245,158,11,0.08), 0 12px 32px rgba(245,158,11,0.08);
                }

                .s3-textarea-footer {
                    position: absolute;
                    bottom: 14px;
                    left: 20px;
                    right: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    pointer-events: none;
                }

                .s3-ai-note {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #d1d5db;
                }

                .s3-char-count {
                    font-size: 10px;
                    font-weight: 600;
                    color: #d1d5db;
                    letter-spacing: 0.06em;
                }

                /* Divider */
                .s3-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #f3f4f6, transparent);
                }

                /* Buttons */
                .s3-back-btn {
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

                .s3-back-btn:hover {
                    border-color: #d1d5db;
                    color: #111827;
                    background: #f9fafb;
                }

                .s3-generate-btn {
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
                    background: linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%);
                    background-size: 200% 100%;
                    color: #fff;
                    box-shadow: 0 8px 28px rgba(17,24,39,0.25);
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .s3-generate-btn:hover {
                    background-position: 100% 0;
                    transform: translateY(-2px);
                    box-shadow: 0 14px 40px rgba(17,24,39,0.3);
                }

                .s3-generate-btn::after {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%; width: 60%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
                    transition: left 0.8s ease;
                }

                .s3-generate-btn:hover::after { left: 150%; }

                .s3-sparkle-wrap {
                    width: 28px;
                    height: 28px;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    box-shadow: 0 4px 10px rgba(245,158,11,0.4);
                }
            `}</style>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="s3-root"
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
                        <span className="s3-badge">
                            <Sparkles size={12} style={{ color: "#f59e0b" }} />
                            Finishing Touches
                        </span>
                    </div>

                    <h2 className="s3-serif" style={{
                        fontSize: "clamp(36px, 5vw, 62px)",
                        fontWeight: 700,
                        lineHeight: 1.1,
                        color: "#111827",
                        letterSpacing: "-0.01em",
                        marginBottom: 14,
                    }}>
                        What sparks your{" "}
                        <span style={{
                            background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            fontStyle: "italic",
                        }}>
                            interest?
                        </span>
                    </h2>

                    <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.65, maxWidth: 460, fontWeight: 500 }}>
                        Our AI uses these details to find the exact experiences that match your vibe.
                    </p>
                </motion.div>

                <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>

                    {/* Interests */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                            <div className="s3-label">
                                <Tag size={12} style={{ color: "#f59e0b" }} /> Personal Interests
                            </div>
                            {interests.length > 0 && (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="s3-interest-count"
                                >
                                    {interests.length} selected
                                </motion.span>
                            )}
                        </div>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                            {interestsList.map((item, idx) => {
                                const isSelected = interests.includes(item.label);
                                const catColor = categoryColors[item.category] || "#6b7280";
                                return (
                                    <motion.button
                                        key={item.label}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.22 + idx * 0.04 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => toggleInterest(item.label)}
                                        className={`s3-tag ${isSelected ? "s3-tag-sel" : ""}`}
                                    >
                                        <AnimatePresence mode="wait">
                                            {isSelected ? (
                                                <motion.span
                                                    key="check"
                                                    initial={{ scale: 0, rotate: -90 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    exit={{ scale: 0 }}
                                                    transition={{ type: "spring", bounce: 0.5, duration: 0.3 }}
                                                >
                                                    <Check size={13} strokeWidth={3} />
                                                </motion.span>
                                            ) : (
                                                <motion.span
                                                    key="plus"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                >
                                                    <Plus size={13} style={{ opacity: 0.4 }} />
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                        {item.label}
                                        {!isSelected && (
                                            <span
                                                className="s3-tag-cat"
                                                style={{ background: `${catColor}18`, color: catColor }}
                                            >
                                                {item.category}
                                            </span>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Dietary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="s3-label" style={{ marginBottom: 14 }}>
                            <Utensils size={12} style={{ color: "#f59e0b" }} /> Dietary Preferences
                        </div>
                        <div className="s3-diet-grid">
                            {dietaryOptions.map((option, idx) => (
                                <motion.button
                                    key={option.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.32 + idx * 0.05 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => setDiet(option.label)}
                                    className={`s3-diet-card ${diet === option.label ? "sel" : ""}`}
                                >
                                    <span className="s3-diet-emoji">{option.icon}</span>
                                    <span className="s3-diet-name">{option.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Notes */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                            <div className="s3-label">
                                <FileText size={12} style={{ color: "#f59e0b" }} /> Additional Notes
                            </div>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                                fontSize: 10,
                                fontWeight: 600,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "#9ca3af",
                                background: "#f9fafb",
                                border: "1px solid #f3f4f6",
                                padding: "4px 10px",
                                borderRadius: 100,
                            }}>
                                <Info size={10} />
                                AI will prioritize these
                            </div>
                        </div>
                        <div className="s3-textarea-wrap">
                            <textarea
                                placeholder="e.g. It's our anniversary, we love hidden gems, avoiding steep hikes…"
                                value={notes}
                                onChange={handleNotes}
                                className="s3-textarea"
                            />
                            <div className="s3-textarea-footer">
                                <span className="s3-ai-note">
                                    <Sparkles size={10} style={{ color: "#f59e0b" }} />
                                    Powered by AI
                                </span>
                                <span className="s3-char-count">{charCount} chars</span>
                            </div>
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
                    <div className="s3-divider" />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <button onClick={onBack} className="s3-back-btn">
                            <ArrowLeft size={16} />
                            Back
                        </button>

                        <motion.button
                            onClick={handleNext}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="s3-generate-btn"
                        >
                            <div className="s3-sparkle-wrap" style={{ position: "relative", zIndex: 1 }}>
                                <Sparkles size={15} color="#fff" />
                            </div>
                            <span style={{ position: "relative", zIndex: 1 }}>Generate My Trip</span>
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}