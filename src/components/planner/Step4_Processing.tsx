import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles, Globe, Database, Wand2, MapPin } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ProcessingStep {
    text: string;
    subtext: string;
    icon: LucideIcon;
    color: string;
}

type Step4Props = {
    onComplete: () => void;
};

export default function Step4_Processing({ onComplete }: Step4Props) {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);

    const steps: ProcessingStep[] = [
        { text: "Initializing AI Engine", subtext: "Connecting to global travel datasets", icon: Database, color: "#f59e0b" },
        { text: "Analyzing Your Style", subtext: "Processing preferences & interests", icon: Sparkles, color: "#ea580c" },
        { text: "Searching Destinations", subtext: "Finding hidden gems & perfect routes", icon: Globe, color: "#f59e0b" },
        { text: "Crafting Itinerary", subtext: "Finalizing your custom-made journey", icon: Wand2, color: "#ea580c" },
    ];

    useEffect(() => {
        const stepDuration = 2000;
        const totalDuration = steps.length * stepDuration;

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const next = prev + (100 / (totalDuration / 50));
                return next > 100 ? 100 : next;
            });
        }, 50);

        const stepInterval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev < steps.length - 1) return prev + 1;
                clearInterval(stepInterval);
                setTimeout(onComplete, 1000);
                return prev;
            });
        }, stepDuration);

        return () => {
            clearInterval(progressInterval);
            clearInterval(stepInterval);
        };
    }, [onComplete, steps.length]);

    const Icon = steps[currentStep].icon;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');

                .s4-root {
                    font-family: 'DM Sans', sans-serif;
                    background: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 560px;
                    padding: 60px 0;
                    position: relative;
                    overflow: hidden;
                    text-align: center;
                }

                .s4-bg-glow {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    filter: blur(60px);
                }

                .s4-serif { font-family: 'Playfair Display', serif; }

                /* Orb */
                .s4-orb-wrap {
                    position: relative;
                    width: 220px;
                    height: 220px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 52px;
                }

                .s4-ring {
                    position: absolute;
                    border-radius: 50%;
                    border-style: solid;
                    border-color: transparent;
                }

                .s4-ring-1 {
                    inset: 0;
                    border-width: 1.5px;
                    border-top-color: rgba(245,158,11,0.25);
                    border-right-color: rgba(245,158,11,0.1);
                    animation: s4spin 5s linear infinite;
                }

                .s4-ring-2 {
                    inset: 14px;
                    border-width: 1px;
                    border-bottom-color: rgba(234,88,12,0.2);
                    border-left-color: rgba(234,88,12,0.08);
                    animation: s4spin 8s linear infinite reverse;
                }

                .s4-ring-3 {
                    inset: 30px;
                    border-width: 1px;
                    border-top-color: rgba(245,158,11,0.15);
                    border-right-color: rgba(245,158,11,0.06);
                    animation: s4spin 12s linear infinite;
                }

                @keyframes s4spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .s4-orb-core {
                    position: relative;
                    z-index: 10;
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    background: #fff;
                    border: 1.5px solid #f3f4f6;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow:
                        0 0 0 8px rgba(245,158,11,0.04),
                        0 0 0 20px rgba(245,158,11,0.02),
                        0 20px 60px rgba(245,158,11,0.12),
                        0 4px 16px rgba(0,0,0,0.06);
                }

                .s4-orb-pulse {
                    position: absolute;
                    inset: 0;
                    border-radius: 50%;
                    border: 2px solid rgba(245,158,11,0.2);
                    animation: s4pulse 2.5s ease-in-out infinite;
                }

                @keyframes s4pulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.35); opacity: 0; }
                }

                .s4-icon-wrap {
                    width: 52px;
                    height: 52px;
                    border-radius: 16px;
                    background: linear-gradient(135deg, #fff8eb, #fff3d0);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px rgba(245,158,11,0.15);
                }

                /* Floating dots */
                .s4-dot {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    opacity: 0.5;
                }

                /* Steps list */
                .s4-steps-row {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-bottom: 40px;
                    flex-wrap: wrap;
                }

                .s4-step-pill {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 14px;
                    border-radius: 100px;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.04em;
                    border: 1.5px solid;
                    transition: all 0.4s ease;
                }

                .s4-step-pill.done {
                    background: #fff8eb;
                    border-color: #fde68a;
                    color: #d97706;
                }

                .s4-step-pill.active {
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    border-color: transparent;
                    color: #fff;
                    box-shadow: 0 4px 12px rgba(245,158,11,0.35);
                }

                .s4-step-pill.pending {
                    background: #fafafa;
                    border-color: #f3f4f6;
                    color: #d1d5db;
                }

                /* Progress */
                .s4-progress-wrap {
                    width: 100%;
                    max-width: 400px;
                }

                .s4-progress-track {
                    width: 100%;
                    height: 6px;
                    background: #f3f4f6;
                    border-radius: 100px;
                    overflow: hidden;
                    position: relative;
                }

                .s4-progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #f59e0b, #ea580c, #f59e0b);
                    background-size: 200% 100%;
                    border-radius: 100px;
                    position: relative;
                    animation: s4gradshift 2s linear infinite;
                }

                @keyframes s4gradshift {
                    0% { background-position: 0% 0%; }
                    100% { background-position: 200% 0%; }
                }

                .s4-progress-shimmer {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%);
                    animation: s4shimmer 1.6s linear infinite;
                }

                @keyframes s4shimmer {
                    from { transform: translateX(-200%); }
                    to { transform: translateX(300%); }
                }

                .s4-progress-labels {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 10px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: #9ca3af;
                }

                .s4-pct {
                    font-family: 'Playfair Display', serif;
                    font-size: 11px;
                    font-weight: 700;
                    color: #f59e0b;
                    font-style: normal;
                }

                /* Scan note */
                .s4-scan-note {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 11px;
                    font-weight: 600;
                    color: #d1d5db;
                    letter-spacing: 0.06em;
                    margin-top: 24px;
                }

                .s4-scan-dot {
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: #f59e0b;
                    animation: s4pulse 1.5s ease-in-out infinite;
                }
            `}</style>

            <div className="s4-root">
                {/* Background glows */}
                <div className="s4-bg-glow" style={{
                    width: 400, height: 400,
                    background: "radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)",
                    top: "50%", left: "50%",
                    transform: "translate(-50%, -60%)",
                }} />

                {/* Orb */}
                <div className="s4-orb-wrap">
                    <div className="s4-ring s4-ring-1" />
                    <div className="s4-ring s4-ring-2" />
                    <div className="s4-ring s4-ring-3" />

                    {/* Floating dots */}
                    {[...Array(5)].map((_, i) => {
                        const angle = (i / 5) * Math.PI * 2;
                        const r = 95;
                        return (
                            <motion.div
                                key={i}
                                className="s4-dot"
                                style={{
                                    left: `calc(50% + ${Math.cos(angle) * r}px - 3px)`,
                                    top: `calc(50% + ${Math.sin(angle) * r}px - 3px)`,
                                }}
                                animate={{
                                    opacity: [0.2, 0.7, 0.2],
                                    scale: [0.8, 1.3, 0.8],
                                }}
                                transition={{
                                    duration: 2.5 + i * 0.4,
                                    repeat: Infinity,
                                    delay: i * 0.5,
                                }}
                            />
                        );
                    })}

                    <motion.div
                        className="s4-orb-core"
                        animate={{ y: [0, -8, 0], scale: [1, 1.015, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="s4-orb-pulse" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ scale: 0.6, opacity: 0, rotate: -15 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 1.3, opacity: 0, rotate: 15 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                className="s4-icon-wrap"
                            >
                                <Icon size={26} style={{ color: "#f59e0b" }} strokeWidth={1.75} />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Step pills */}
                <div className="s4-steps-row">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={step.text}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            className={`s4-step-pill ${idx < currentStep ? "done" : idx === currentStep ? "active" : "pending"}`}
                        >
                            {idx < currentStep ? (
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : (
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", opacity: idx === currentStep ? 1 : 0.3, display: "inline-block" }} />
                            )}
                            {step.text}
                        </motion.div>
                    ))}
                </div>

                {/* Text */}
                <div style={{ marginBottom: 32, minHeight: 72 }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3 className="s4-serif" style={{
                                fontSize: "clamp(26px, 4vw, 38px)",
                                fontWeight: 700,
                                color: "#111827",
                                lineHeight: 1.15,
                                marginBottom: 8,
                                letterSpacing: "-0.01em",
                            }}>
                                {steps[currentStep].text}
                            </h3>
                            <p style={{
                                fontSize: 14,
                                color: "#9ca3af",
                                fontWeight: 500,
                                letterSpacing: "0.02em",
                            }}>
                                {steps[currentStep].subtext}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress bar */}
                <div className="s4-progress-wrap">
                    <div className="s4-progress-track">
                        <motion.div
                            className="s4-progress-fill"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.15 }}
                        >
                            <div className="s4-progress-shimmer" />
                        </motion.div>
                    </div>
                    <div className="s4-progress-labels">
                        <span>AI Processing</span>
                        <span className="s4-pct">{Math.round(progress)}%</span>
                    </div>
                </div>

                {/* Scan note */}
                <motion.div
                    className="s4-scan-note"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <div className="s4-scan-dot" />
                    <MapPin size={11} style={{ color: "#f59e0b" }} />
                    Scanning 1.2M+ travel combinations
                </motion.div>
            </div>
        </>
    );
}