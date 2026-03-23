import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Step1_Destination from './Step1_Destination';
import Step2_StyleBudget from './Step2_StyleBudget';
import Step3_Interests from './Step3_Interests';
import Step4_Processing from './Step4_Processing';
import Step5_Dashboard from './Step5_Dashboard';

export interface TripData {
    destination?: string;
    dates?: { start?: Date; end?: Date };
    travelers?: string;
    budget?: string;
    styles?: string[];
    accommodation?: string;
    interests?: string[];
    diet?: string;
    notes?: string;
}

const steps = [
    { number: 1, label: 'Destination', desc: 'Where & When' },
    { number: 2, label: 'Preferences', desc: 'Style & Budget' },
    { number: 3, label: 'Interests', desc: 'Final Details' },
];

export default function WizardLayout() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<TripData>({});
    const navigate = useNavigate();

    const updateData = (data: Partial<TripData>) => setFormData(prev => ({ ...prev, ...data }));
    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    if (step === 5) return <Step5_Dashboard data={formData} />;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');

                *, *::before, *::after { box-sizing: border-box; }

                .wiz-root {
                    min-height: 100vh;
                    background: #f9fafb;
                    font-family: 'DM Sans', sans-serif;
                    position: relative;
                    overflow-x: hidden;
                }

                /* Subtle bg texture */
                .wiz-root::before {
                    content: '';
                    position: fixed;
                    top: -20%;
                    right: -15%;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 65%);
                    pointer-events: none;
                    z-index: 0;
                }

                .wiz-root::after {
                    content: '';
                    position: fixed;
                    bottom: -15%;
                    left: -10%;
                    width: 480px;
                    height: 480px;
                    background: radial-gradient(ellipse, rgba(234,88,12,0.05) 0%, transparent 65%);
                    pointer-events: none;
                    z-index: 0;
                }

                /* Navbar */
                .wiz-nav {
                    position: fixed;
                    top: 0; left: 0; right: 0;
                    z-index: 100;
                    height: 68px;
                    background: rgba(255,255,255,0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(243,244,246,0.8);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 32px;
                }

                .wiz-logo-wrap {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    text-decoration: none;
                }

                .wiz-logo-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 11px;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-weight: 800;
                    font-size: 16px;
                    box-shadow: 0 4px 12px rgba(245,158,11,0.35);
                    transition: transform 0.2s, box-shadow 0.2s;
                }

                .wiz-logo-wrap:hover .wiz-logo-icon {
                    transform: scale(1.05) rotate(3deg);
                    box-shadow: 0 6px 18px rgba(245,158,11,0.4);
                }

                .wiz-logo-text {
                    font-size: 16px;
                    font-weight: 700;
                    background: linear-gradient(135deg, #111827, #374151);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    letter-spacing: -0.01em;
                }

                @media (max-width: 480px) { .wiz-logo-text { display: none; } }

                /* Step indicator */
                .wiz-steps {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    align-items: center;
                    gap: 0;
                }

                @media (max-width: 768px) { .wiz-steps { display: none; } }

                .wiz-step-item {
                    display: flex;
                    align-items: center;
                    gap: 0;
                }

                .wiz-step-inner {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 6px 14px 6px 6px;
                    border-radius: 100px;
                    transition: all 0.3s ease;
                }

                .wiz-step-inner.active {
                    background: #fff8eb;
                    border: 1px solid #fde68a;
                }

                .wiz-step-inner.pending {
                    background: transparent;
                }

                .wiz-step-num {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: 700;
                    flex-shrink: 0;
                    transition: all 0.3s ease;
                }

                .wiz-step-num.active {
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    color: #fff;
                    box-shadow: 0 4px 10px rgba(245,158,11,0.35);
                }

                .wiz-step-num.done {
                    background: #fff8eb;
                    color: #d97706;
                    border: 1.5px solid #fde68a;
                }

                .wiz-step-num.pending {
                    background: #f3f4f6;
                    color: #9ca3af;
                }

                .wiz-step-label {
                    font-size: 12px;
                    font-weight: 700;
                    transition: color 0.3s;
                    white-space: nowrap;
                }

                .wiz-step-label.active { color: #d97706; }
                .wiz-step-label.done { color: #9ca3af; }
                .wiz-step-label.pending { color: #d1d5db; }

                /* Connector */
                .wiz-connector {
                    width: 32px;
                    height: 2px;
                    background: #f3f4f6;
                    border-radius: 100px;
                    margin: 0 4px;
                    overflow: hidden;
                    position: relative;
                    flex-shrink: 0;
                }

                .wiz-connector-fill {
                    position: absolute;
                    top: 0; left: 0; height: 100%;
                    background: linear-gradient(90deg, #f59e0b, #ea580c);
                    border-radius: 100px;
                    transition: width 0.5s ease;
                }

                /* Right nav actions */
                .wiz-nav-right {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .wiz-back-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 16px;
                    border-radius: 10px;
                    border: 1.5px solid #e5e7eb;
                    background: #fff;
                    color: #6b7280;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: 'DM Sans', sans-serif;
                }

                .wiz-back-btn:hover {
                    border-color: #d1d5db;
                    color: #111827;
                    background: #f9fafb;
                }

                .wiz-cancel-btn {
                    padding: 8px 16px;
                    border-radius: 10px;
                    border: none;
                    background: none;
                    color: #9ca3af;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: color 0.2s;
                    font-family: 'DM Sans', sans-serif;
                }

                .wiz-cancel-btn:hover { color: #374151; }

                /* Main content area */
                .wiz-main {
                    padding-top: 68px;
                    min-height: 100vh;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    padding-left: 20px;
                    padding-right: 20px;
                    padding-bottom: 48px;
                    position: relative;
                    z-index: 1;
                }

                .wiz-card-wrap {
                    width: 100%;
                    max-width: 860px;
                    margin-top: 40px;
                }

                .wiz-card {
                    background: #fff;
                    border-radius: 32px;
                    border: 1px solid #f3f4f6;
                    box-shadow:
                        0 4px 6px rgba(0,0,0,0.02),
                        0 20px 48px rgba(0,0,0,0.05),
                        0 0 0 1px rgba(255,255,255,0.8) inset;
                    position: relative;
                    overflow: hidden;
                }

                /* Amber progress top bar */
                .wiz-progress-bar {
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 3px;
                    background: #f3f4f6;
                    z-index: 2;
                }

                .wiz-progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #f59e0b, #ea580c, #f59e0b);
                    background-size: 200% 100%;
                    border-radius: 0 100px 100px 0;
                    transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
                    animation: wiz-gradshift 2s linear infinite;
                }

                @keyframes wiz-gradshift {
                    0% { background-position: 0% 0%; }
                    100% { background-position: 200% 0%; }
                }

                /* Step counter pill — mobile only */
                .wiz-mobile-steps {
                    display: none;
                    position: absolute;
                    top: 16px;
                    right: 20px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    padding: 4px 12px;
                    border-radius: 100px;
                    background: #fff8eb;
                    border: 1px solid #fde68a;
                    color: #d97706;
                    z-index: 3;
                }

                @media (max-width: 768px) { .wiz-mobile-steps { display: block; } }

                .wiz-content {
                    padding: 52px 52px 48px;
                }

                @media (max-width: 768px) {
                    .wiz-content { padding: 40px 24px 36px; }
                    .wiz-card { border-radius: 24px; }
                }

                @media (max-width: 480px) {
                    .wiz-content { padding: 36px 18px 28px; }
                }
            `}</style>

            <div className="wiz-root">
                {/* Navbar */}
                <nav className="wiz-nav">
                    {/* Logo */}
                    <div className="wiz-logo-wrap" onClick={() => navigate('/')}>
                        <div className="wiz-logo-icon">M</div>
                        <span className="wiz-logo-text">MarocTrip AI</span>
                    </div>

                    {/* Step indicators */}
                    {step < 5 && (
                        <div className="wiz-steps">
                            {steps.map((s, idx) => {
                                const isActive = step === s.number;
                                const isDone = step > s.number;
                                const state = isActive ? "active" : isDone ? "done" : "pending";

                                return (
                                    <div key={s.number} className="wiz-step-item">
                                        <div className={`wiz-step-inner ${state}`}>
                                            <div className={`wiz-step-num ${state}`}>
                                                {isDone
                                                    ? <Check size={14} strokeWidth={3} />
                                                    : s.number
                                                }
                                            </div>
                                            {(isActive || isDone) && (
                                                <span className={`wiz-step-label ${state}`}>
                                                    {s.label}
                                                </span>
                                            )}
                                        </div>
                                        {idx < steps.length - 1 && (
                                            <div className="wiz-connector">
                                                <div
                                                    className="wiz-connector-fill"
                                                    style={{ width: isDone ? "100%" : "0%" }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Right actions */}
                    <div className="wiz-nav-right">
                        {step > 1 && step < 4 && (
                            <button className="wiz-back-btn" onClick={prevStep}>
                                <ArrowLeft size={14} />
                                Back
                            </button>
                        )}
                        {step === 1 && (
                            <button className="wiz-cancel-btn" onClick={() => navigate('/')}>
                                Cancel
                            </button>
                        )}
                    </div>
                </nav>

                {/* Content */}
                <main className="wiz-main">
                    <div className="wiz-card-wrap">
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="wiz-card"
                        >
                            {/* Progress top bar */}
                            <div className="wiz-progress-bar">
                                <div
                                    className="wiz-progress-fill"
                                    style={{ width: `${(Math.min(step, 3) / 3) * 100}%` }}
                                />
                            </div>

                            {/* Mobile step counter */}
                            {step < 4 && (
                                <div className="wiz-mobile-steps">
                                    Step {step} of 3
                                </div>
                            )}

                            <div className="wiz-content">
                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <Step1_Destination
                                            key="step1"
                                            data={formData}
                                            updateData={updateData}
                                            onNext={nextStep}
                                        />
                                    )}
                                    {step === 2 && (
                                        <Step2_StyleBudget
                                            key="step2"
                                            data={formData}
                                            updateData={updateData}
                                            onNext={nextStep}
                                            onBack={prevStep}
                                        />
                                    )}
                                    {step === 3 && (
                                        <Step3_Interests
                                            key="step3"
                                            data={formData}
                                            updateData={updateData}
                                            onNext={nextStep}
                                            onBack={prevStep}
                                        />
                                    )}
                                    {step === 4 && (
                                        <Step4_Processing
                                            key="step4"
                                            onComplete={nextStep}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </>
    );
}