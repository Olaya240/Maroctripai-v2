import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Calendar, Share2, Download, CloudSun,
    Hotel, Utensils, Camera, Plus, MessageSquare,
    Map as MapIcon, ChevronRight, Sparkles, Filter,
    MoreHorizontal, Luggage, Wallet, Plane, Wand2,
    Navigation, Settings, Check
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { TripData } from './WizardLayout';

type Step5Props = {
    data: TripData;
};

const generateItinerary = (data: any) => {
    const days = 4;
    return Array.from({ length: days }).map((_, i) => ({
        day: i + 1,
        date: `Oct ${15 + i}`,
        summary: i === 0 ? "Arrival & Heritage" : i === 1 ? "Desert Adventures" : i === 2 ? "Coastal Charm" : "Relaxation",
        weather: "24°C Sunny",
        activities: [
            { id: 10 + i, time: "09:00 AM", title: "Traditional Breakfast", type: "Food", icon: Utensils, description: "Authentic local flavors at a hidden courtyard garden.", duration: "1.5h" },
            { id: 20 + i, time: "11:00 AM", title: "Historic Landmark Tour", type: "Culture", icon: Camera, description: "Skip-the-line access to the city's most iconic sites.", duration: "2h" },
            { id: 30 + i, time: "01:30 PM", title: "Rooftop Lunch", type: "Food", icon: Utensils, description: "Modern fusion cuisine with panoramic city views.", duration: "1.5h" },
            { id: 40 + i, time: "04:00 PM", title: "Local Market Discovery", type: "Lifestyle", icon: Navigation, description: "Guided exploration of craftsman workshops and spice shops.", duration: "2.5h" },
        ]
    }));
};

const typeConfig: Record<string, { bg: string; color: string; label: string }> = {
    Food: { bg: "#fff7ed", color: "#ea580c", label: "Gastronomy" },
    Culture: { bg: "#eff6ff", color: "#2563eb", label: "Culture" },
    Lifestyle: { bg: "#fdf4ff", color: "#9333ea", label: "Lifestyle" },
};

export default function Step5_Dashboard({ data }: Step5Props) {
    const itinerary = useMemo(() => generateItinerary(data), [data]);
    const [activeDay, setActiveDay] = useState(1);

    const activeDayData = itinerary.find(d => d.day === activeDay) || itinerary[0];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');

                .s5-root {
                    font-family: 'DM Sans', sans-serif;
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    background: #f9fafb;
                    color: #111827;
                }

                .s5-serif { font-family: 'Playfair Display', serif; }

                /* Navbar */
                .s5-nav {
                    height: 60px;
                    background: #fff;
                    border-bottom: 1px solid #f3f4f6;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 24px;
                    position: sticky;
                    top: 0;
                    z-index: 50;
                    flex-shrink: 0;
                }

                .s5-logo {
                    width: 32px;
                    height: 32px;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-weight: 800;
                    font-size: 14px;
                    box-shadow: 0 4px 10px rgba(245,158,11,0.3);
                }

                .s5-trip-name {
                    font-size: 14px;
                    font-weight: 700;
                    color: #111827;
                }

                .s5-ai-badge {
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    padding: 3px 8px;
                    border-radius: 100px;
                    background: #fff8eb;
                    border: 1px solid #fde68a;
                    color: #d97706;
                }

                .s5-nav-btn {
                    width: 34px;
                    height: 34px;
                    border-radius: 10px;
                    border: 1.5px solid #f3f4f6;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #9ca3af;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .s5-nav-btn:hover {
                    border-color: #e5e7eb;
                    color: #374151;
                    background: #f9fafb;
                }

                .s5-export-btn {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    padding: 8px 18px;
                    border-radius: 10px;
                    border: none;
                    background: #111827;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.04em;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: 'DM Sans', sans-serif;
                }

                .s5-export-btn:hover {
                    background: #000;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
                    transform: translateY(-1px);
                }

                /* Main layout */
                .s5-main {
                    display: flex;
                    flex: 1;
                    overflow: hidden;
                }

                /* Sidebar */
                .s5-sidebar {
                    width: 260px;
                    background: #fff;
                    border-right: 1px solid #f3f4f6;
                    display: flex;
                    flex-direction: column;
                    flex-shrink: 0;
                    overflow-y: auto;
                }

                @media (max-width: 1024px) { .s5-sidebar { display: none; } }

                .s5-sidebar-section {
                    padding: 20px;
                    border-bottom: 1px solid #f9fafb;
                }

                .s5-sidebar-label {
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: #9ca3af;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .s5-day-btn {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 12px;
                    border-radius: 14px;
                    border: none;
                    background: none;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: left;
                    margin-bottom: 3px;
                    font-family: 'DM Sans', sans-serif;
                }

                .s5-day-btn:hover:not(.active) {
                    background: #f9fafb;
                }

                .s5-day-btn.active {
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    box-shadow: 0 6px 16px rgba(245,158,11,0.3);
                }

                .s5-day-num {
                    width: 30px;
                    height: 30px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: 700;
                    background: #f3f4f6;
                    color: #6b7280;
                    flex-shrink: 0;
                    transition: all 0.2s;
                }

                .s5-day-btn.active .s5-day-num {
                    background: rgba(255,255,255,0.2);
                    color: #fff;
                }

                .s5-day-title {
                    font-size: 13px;
                    font-weight: 700;
                    color: #374151;
                    transition: color 0.2s;
                }

                .s5-day-btn.active .s5-day-title { color: #fff; }

                .s5-day-sub {
                    font-size: 10px;
                    color: #9ca3af;
                    transition: color 0.2s;
                    margin-top: 1px;
                }

                .s5-day-btn.active .s5-day-sub { color: rgba(255,255,255,0.65); }

                .s5-add-day-btn {
                    width: 100%;
                    padding: 10px;
                    border: 1.5px dashed #e5e7eb;
                    border-radius: 14px;
                    background: none;
                    color: #9ca3af;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    transition: all 0.2s;
                    margin-top: 6px;
                    font-family: 'DM Sans', sans-serif;
                }

                .s5-add-day-btn:hover {
                    border-color: #f59e0b;
                    color: #d97706;
                    background: #fffbeb;
                }

                .s5-stat-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 8px;
                }

                .s5-stat-card {
                    padding: 12px;
                    background: #f9fafb;
                    border-radius: 12px;
                    border: 1px solid #f3f4f6;
                }

                .s5-stat-val {
                    font-size: 14px;
                    font-weight: 700;
                    color: #111827;
                    margin-top: 6px;
                }

                .s5-stat-key {
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #9ca3af;
                    margin-top: 2px;
                }

                /* AI widget */
                .s5-ai-widget {
                    margin: 16px;
                    padding: 18px;
                    background: linear-gradient(135deg, #111827, #1f2937);
                    border-radius: 20px;
                    color: #fff;
                    position: relative;
                    overflow: hidden;
                    margin-top: auto;
                }

                .s5-ai-widget::before {
                    content: '';
                    position: absolute;
                    top: -20px; right: -20px;
                    width: 80px; height: 80px;
                    background: radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%);
                    pointer-events: none;
                }

                .s5-ai-input {
                    width: 100%;
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    padding: 8px 36px 8px 12px;
                    font-size: 11px;
                    color: #fff;
                    outline: none;
                    transition: border-color 0.2s;
                    font-family: 'DM Sans', sans-serif;
                    margin-top: 10px;
                }

                .s5-ai-input::placeholder { color: rgba(255,255,255,0.25); }
                .s5-ai-input:focus { border-color: rgba(245,158,11,0.5); }

                /* Content */
                .s5-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 32px;
                }

                @media (max-width: 768px) { .s5-content { padding: 20px; } }

                .s5-day-header {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    margin-bottom: 36px;
                    flex-wrap: wrap;
                    gap: 16px;
                }

                .s5-date-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: #d97706;
                    background: #fff8eb;
                    border: 1px solid #fde68a;
                    padding: 5px 12px;
                    border-radius: 100px;
                    margin-bottom: 10px;
                }

                .s5-day-title-text {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(28px, 4vw, 44px);
                    font-weight: 700;
                    color: #111827;
                    line-height: 1.1;
                    letter-spacing: -0.01em;
                }

                .s5-weather-chip {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 16px;
                    background: #fff;
                    border: 1.5px solid #f3f4f6;
                    border-radius: 14px;
                    font-size: 13px;
                    font-weight: 600;
                    color: #374151;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
                }

                /* Timeline */
                .s5-timeline {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .s5-timeline-line {
                    position: absolute;
                    left: 20px;
                    top: 24px;
                    bottom: 24px;
                    width: 1px;
                    background: linear-gradient(to bottom, #fde68a, #f3f4f6 80%, transparent);
                }

                .s5-activity-row {
                    display: flex;
                    gap: 20px;
                    align-items: flex-start;
                    position: relative;
                }

                .s5-timeline-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #fff;
                    border: 2px solid #f59e0b;
                    flex-shrink: 0;
                    margin-top: 20px;
                    position: relative;
                    z-index: 2;
                    box-shadow: 0 0 0 4px rgba(245,158,11,0.1);
                    transition: all 0.2s;
                }

                .s5-activity-row:hover .s5-timeline-dot {
                    border-color: #ea580c;
                    box-shadow: 0 0 0 6px rgba(245,158,11,0.12);
                    transform: scale(1.2);
                }

                .s5-activity-card {
                    flex: 1;
                    background: #fff;
                    border: 1.5px solid #f3f4f6;
                    border-radius: 22px;
                    padding: 20px;
                    transition: all 0.25s ease;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                }

                .s5-activity-card:hover {
                    border-color: #fde68a;
                    box-shadow: 0 12px 32px rgba(245,158,11,0.08), 0 4px 12px rgba(0,0,0,0.04);
                    transform: translateX(4px);
                }

                .s5-activity-card::before {
                    content: '';
                    position: absolute;
                    left: 0; top: 0; bottom: 0;
                    width: 3px;
                    border-radius: 0 2px 2px 0;
                    opacity: 0;
                    transition: opacity 0.2s;
                    background: linear-gradient(to bottom, #f59e0b, #ea580c);
                }

                .s5-activity-card:hover::before { opacity: 1; }

                .s5-activity-top {
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                }

                .s5-act-icon {
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .s5-act-meta {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-bottom: 5px;
                }

                .s5-act-time {
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    color: #9ca3af;
                    text-transform: uppercase;
                }

                .s5-act-dur {
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    color: #f59e0b;
                    text-transform: uppercase;
                }

                .s5-act-title {
                    font-size: 16px;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 4px;
                }

                .s5-act-desc {
                    font-size: 13px;
                    color: #6b7280;
                    line-height: 1.6;
                }

                .s5-act-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 14px;
                    padding-top: 14px;
                    border-top: 1px solid #f9fafb;
                }

                .s5-act-type-badge {
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    padding: 3px 10px;
                    border-radius: 100px;
                }

                .s5-act-detail-link {
                    font-size: 11px;
                    font-weight: 700;
                    color: #f59e0b;
                    display: flex;
                    align-items: center;
                    gap: 3px;
                    cursor: pointer;
                    border: none;
                    background: none;
                    font-family: 'DM Sans', sans-serif;
                    transition: color 0.2s;
                }

                .s5-act-detail-link:hover { color: #ea580c; }

                .s5-act-actions {
                    position: absolute;
                    top: 14px;
                    right: 14px;
                    display: flex;
                    gap: 4px;
                    opacity: 0;
                    transition: opacity 0.2s;
                }

                .s5-activity-card:hover .s5-act-actions { opacity: 1; }

                .s5-act-action-btn {
                    width: 28px;
                    height: 28px;
                    border-radius: 8px;
                    border: 1px solid #f3f4f6;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #9ca3af;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .s5-act-action-btn:hover {
                    border-color: #fde68a;
                    color: #d97706;
                }

                .s5-add-activity {
                    width: 100%;
                    padding: 18px;
                    border: 1.5px dashed #e5e7eb;
                    border-radius: 22px;
                    background: none;
                    color: #9ca3af;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.2s;
                    margin-top: 4px;
                    font-family: 'DM Sans', sans-serif;
                }

                .s5-add-activity:hover {
                    border-color: #f59e0b;
                    color: #d97706;
                    background: #fffbeb;
                }

                /* Right panel */
                .s5-right {
                    width: 320px;
                    background: #fff;
                    border-left: 1px solid #f3f4f6;
                    display: flex;
                    flex-direction: column;
                    flex-shrink: 0;
                    overflow-y: auto;
                }

                @media (max-width: 1280px) { .s5-right { display: none; } }

                .s5-right-inner {
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    height: 100%;
                }

                .s5-right-label {
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: #9ca3af;
                }

                .s5-map-card {
                    border-radius: 20px;
                    overflow: hidden;
                    position: relative;
                    height: 220px;
                    border: 1.5px solid #f3f4f6;
                    flex-shrink: 0;
                }

                .s5-map-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(30%) brightness(0.9);
                }

                .s5-map-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.95) 100%);
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 16px;
                }

                .s5-map-pin {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 40px;
                    height: 40px;
                    background: #fff;
                    border-radius: 50%;
                    border: 3px solid #f59e0b;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 16px rgba(245,158,11,0.3), 0 0 0 8px rgba(245,158,11,0.08);
                }

                .s5-map-btn {
                    width: 100%;
                    padding: 10px;
                    border-radius: 12px;
                    border: 1.5px solid #f3f4f6;
                    background: #fff;
                    font-size: 12px;
                    font-weight: 700;
                    color: #374151;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: 'DM Sans', sans-serif;
                }

                .s5-map-btn:hover {
                    border-color: #fde68a;
                    color: #d97706;
                    background: #fffbeb;
                }

                .s5-flight-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px 12px;
                    background: #f9fafb;
                    border-radius: 12px;
                    border: 1px solid #f3f4f6;
                }

                .s5-insight-card {
                    border-radius: 20px;
                    padding: 18px;
                    background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
                    color: #fff;
                    position: relative;
                    overflow: hidden;
                }

                .s5-insight-card::before {
                    content: '';
                    position: absolute;
                    top: -20px; right: -20px;
                    width: 100px; height: 100px;
                    background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%);
                }

                .s5-insight-label {
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.65);
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    margin-bottom: 10px;
                }

                .s5-insight-text {
                    font-family: 'Playfair Display', serif;
                    font-size: 13px;
                    font-style: italic;
                    line-height: 1.6;
                    color: rgba(255,255,255,0.9);
                    margin-bottom: 12px;
                }

                .s5-insight-btn {
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    padding: 6px 14px;
                    border-radius: 8px;
                    border: none;
                    background: rgba(255,255,255,0.2);
                    color: #fff;
                    cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    transition: background 0.2s;
                }

                .s5-insight-btn:hover { background: rgba(255,255,255,0.3); }

                /* Status dot */
                .s5-status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #10b981;
                    animation: s5blink 2s ease-in-out infinite;
                }

                @keyframes s5blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }

                /* Mobile bottom bar */
                .s5-mobile-bar {
                    height: 60px;
                    background: #fff;
                    border-top: 1px solid #f3f4f6;
                    display: none;
                    align-items: center;
                    justify-content: space-around;
                    padding: 0 16px;
                    flex-shrink: 0;
                }

                @media (max-width: 768px) { .s5-mobile-bar { display: flex; } }

                .s5-mob-btn {
                    padding: 8px;
                    color: #9ca3af;
                    border: none;
                    background: none;
                    cursor: pointer;
                    border-radius: 10px;
                    transition: all 0.2s;
                }

                .s5-mob-btn.active { color: #f59e0b; }

                .s5-mob-fab {
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    cursor: pointer;
                    box-shadow: 0 6px 16px rgba(245,158,11,0.4);
                    transform: translateY(-10px);
                }
            `}</style>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="s5-root"
            >
                {/* Navbar */}
                <header className="s5-nav">
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div className="s5-logo">M</div>
                        <div style={{ width: 1, height: 16, background: "#f3f4f6" }} />
                        <span className="s5-trip-name">Trip to {data.destination || 'Morocco'}</span>
                        <span className="s5-ai-badge">AI Generated</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginRight: 8 }} className="hidden-mobile">
                            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9ca3af" }}>Status</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#10b981", display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                                <div className="s5-status-dot" />
                                Confirmed
                            </span>
                        </div>
                        <button className="s5-nav-btn"><Share2 size={15} /></button>
                        <button className="s5-nav-btn"><Settings size={15} /></button>
                        <button className="s5-export-btn">
                            <Download size={13} />
                            Export
                        </button>
                    </div>
                </header>

                <div className="s5-main">
                    {/* Left Sidebar */}
                    <aside className="s5-sidebar">
                        <div className="s5-sidebar-section">
                            <div className="s5-sidebar-label">
                                Your Itinerary
                                <button style={{ padding: 4, borderRadius: 6, border: "none", background: "none", color: "#9ca3af", cursor: "pointer" }}>
                                    <Filter size={12} />
                                </button>
                            </div>
                            {itinerary.map(day => (
                                <button
                                    key={day.day}
                                    onClick={() => setActiveDay(day.day)}
                                    className={`s5-day-btn ${activeDay === day.day ? "active" : ""}`}
                                >
                                    <div className="s5-day-num">{day.day}</div>
                                    <div style={{ flex: 1 }}>
                                        <div className="s5-day-title">Day {day.day}</div>
                                        <div className="s5-day-sub">{day.summary}</div>
                                    </div>
                                    <ChevronRight size={13} style={{ color: activeDay === day.day ? "rgba(255,255,255,0.5)" : "#e5e7eb" }} />
                                </button>
                            ))}
                            <button className="s5-add-day-btn">
                                <Plus size={13} /> Add Day
                            </button>
                        </div>

                        <div className="s5-sidebar-section">
                            <div className="s5-sidebar-label" style={{ marginBottom: 10 }}>Trip Summary</div>
                            <div className="s5-stat-grid">
                                <div className="s5-stat-card">
                                    <Luggage size={14} style={{ color: "#f59e0b" }} />
                                    <div className="s5-stat-val">{data.travelers || "2"}</div>
                                    <div className="s5-stat-key">Travelers</div>
                                </div>
                                <div className="s5-stat-card">
                                    <Wallet size={14} style={{ color: "#ea580c" }} />
                                    <div className="s5-stat-val">{data.budget || "Standard"}</div>
                                    <div className="s5-stat-key">Budget</div>
                                </div>
                                <div className="s5-stat-card">
                                    <Calendar size={14} style={{ color: "#f59e0b" }} />
                                    <div className="s5-stat-val">4</div>
                                    <div className="s5-stat-key">Days</div>
                                </div>
                                <div className="s5-stat-card">
                                    <MapPin size={14} style={{ color: "#ea580c" }} />
                                    <div className="s5-stat-val">16</div>
                                    <div className="s5-stat-key">Activities</div>
                                </div>
                            </div>
                        </div>

                        {/* AI Widget */}
                        <div className="s5-ai-widget" style={{ margin: "auto 16px 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                <div style={{
                                    width: 24, height: 24, borderRadius: 8,
                                    background: "rgba(245,158,11,0.2)",
                                    display: "flex", alignItems: "center", justifyContent: "center"
                                }}>
                                    <Wand2 size={13} style={{ color: "#f59e0b" }} />
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 700 }}>AI Assistant</span>
                            </div>
                            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                                Swap hotels, find better routes, or adjust your schedule.
                            </p>
                            <div style={{ position: "relative", marginTop: 10 }}>
                                <input
                                    type="text"
                                    placeholder="Ask for anything…"
                                    className="s5-ai-input"
                                />
                                <MessageSquare size={12} style={{
                                    position: "absolute", right: 10, top: "50%",
                                    transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)"
                                }} />
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <section className="s5-content">
                        <div style={{ maxWidth: 680, margin: "0 auto" }}>
                            {/* Day Header */}
                            <div className="s5-day-header">
                                <div>
                                    <div className="s5-date-chip">
                                        <Calendar size={11} /> {activeDayData.date}
                                    </div>
                                    <div className="s5-day-title-text">{activeDayData.summary}</div>
                                </div>
                                <div className="s5-weather-chip">
                                    <CloudSun size={18} style={{ color: "#f59e0b" }} />
                                    {activeDayData.weather}
                                </div>
                            </div>

                            {/* Timeline */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeDay}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 12 }}
                                    transition={{ duration: 0.35 }}
                                >
                                    <div className="s5-timeline">
                                        <div className="s5-timeline-line" />

                                        {activeDayData.activities.map((item, idx) => {
                                            const tc = typeConfig[item.type] || typeConfig.Food;
                                            return (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ opacity: 0, y: 16 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.08 }}
                                                    className="s5-activity-row"
                                                >
                                                    <div className="s5-timeline-dot" />

                                                    <div className="s5-activity-card">
                                                        <div className="s5-act-actions">
                                                            <button className="s5-act-action-btn"><Settings size={12} /></button>
                                                            <button className="s5-act-action-btn"><MoreHorizontal size={12} /></button>
                                                        </div>

                                                        <div className="s5-activity-top">
                                                            <div className="s5-act-icon" style={{ background: tc.bg }}>
                                                                <item.icon size={20} style={{ color: tc.color }} />
                                                            </div>
                                                            <div style={{ flex: 1 }}>
                                                                <div className="s5-act-meta">
                                                                    <span className="s5-act-time">{item.time}</span>
                                                                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#e5e7eb", display: "inline-block" }} />
                                                                    <span className="s5-act-dur">{item.duration}</span>
                                                                </div>
                                                                <div className="s5-act-title">{item.title}</div>
                                                                <div className="s5-act-desc">{item.description}</div>
                                                            </div>
                                                        </div>

                                                        <div className="s5-act-footer">
                                                            <span
                                                                className="s5-act-type-badge"
                                                                style={{ background: tc.bg, color: tc.color }}
                                                            >
                                                                {tc.label}
                                                            </span>
                                                            <button className="s5-act-detail-link">
                                                                Details <ChevronRight size={11} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}

                                        <button className="s5-add-activity">
                                            <Plus size={16} /> Add Activity
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </section>

                    {/* Right Panel */}
                    <aside className="s5-right">
                        <div className="s5-right-inner">
                            <div className="s5-right-label">Visual Discovery</div>

                            {/* Map */}
                            <div className="s5-map-card">
                                <img
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600"
                                    alt="Map"
                                    className="s5-map-img"
                                />
                                <div className="s5-map-pin">
                                    <MapPin size={18} style={{ color: "#f59e0b" }} />
                                </div>
                                <div className="s5-map-overlay">
                                    <button className="s5-map-btn">
                                        <MapIcon size={13} style={{ display: "inline", marginRight: 6, color: "#f59e0b" }} />
                                        Launch Interactive Map
                                    </button>
                                </div>
                            </div>

                            {/* Flight info */}
                            <div className="s5-flight-row">
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 10, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Plane size={15} style={{ color: "#2563eb" }} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: "#374151" }}>Closest Airport</div>
                                        <div style={{ fontSize: 10, color: "#9ca3af" }}>Marrakech Menara</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: 12, fontWeight: 800, color: "#111827" }}>RAK · 15km</div>
                            </div>

                            {/* Insight */}
                            <div className="s5-insight-card">
                                <div className="s5-insight-label">
                                    <Sparkles size={11} /> Local Insight
                                </div>
                                <div className="s5-insight-text">
                                    "The souks are best explored 10am–4pm for the full experience. Late evenings are magical for photography."
                                </div>
                                <button className="s5-insight-btn">Read More Tips</button>
                            </div>

                            {/* Styles summary */}
                            {data.styles && data.styles.length > 0 && (
                                <div>
                                    <div className="s5-right-label" style={{ marginBottom: 10 }}>Your Vibes</div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                        {data.styles.map(s => (
                                            <span key={s} style={{
                                                fontSize: 10, fontWeight: 700,
                                                padding: "4px 10px", borderRadius: 100,
                                                background: "#fff8eb", border: "1px solid #fde68a",
                                                color: "#d97706", letterSpacing: "0.06em",
                                                textTransform: "uppercase"
                                            }}>
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>

                {/* Mobile bottom bar */}
                <div className="s5-mobile-bar">
                    <button className="s5-mob-btn active"><Calendar size={20} /></button>
                    <button className="s5-mob-btn"><MapPin size={20} /></button>
                    <button className="s5-mob-fab"><Plus size={22} /></button>
                    <button className="s5-mob-btn"><MessageSquare size={20} /></button>
                    <button className="s5-mob-btn"><Settings size={20} /></button>
                </div>
            </motion.div>
        </>
    );
}