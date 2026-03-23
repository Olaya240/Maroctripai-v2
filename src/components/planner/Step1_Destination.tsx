import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,
    Calendar as CalendarIcon,
    User,
    Heart,
    Users,
    UsersRound,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    TrendingUp,
    Clock,
    ChevronRight,
} from "lucide-react";
import { format, differenceInDays, addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn as uiCn } from "../ui/utils";
import { TripData } from "./WizardLayout";

type Step1Props = {
    data: TripData;
    updateData: (data: Partial<TripData>) => void;
    onNext: () => void;
};

const popularDestinations = [
    { name: "Paris, France", flag: "🇫🇷", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=200", trending: true, tagline: "City of Light" },
    { name: "Tokyo, Japan", flag: "🇯🇵", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=200", trending: true, tagline: "Neon & Serenity" },
    { name: "Marrakech, Morocco", flag: "🇲🇦", image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=200", trending: false, tagline: "Maze of Wonders" },
    { name: "Bali, Indonesia", flag: "🇮🇩", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=200", trending: true, tagline: "Island of Gods" },
];

const travelerTypes = [
    { id: "Solo", label: "Solo", icon: User, desc: "Personal growth & exploration", numeral: "01" },
    { id: "Couple", label: "Couple", icon: Heart, desc: "Romantic sunsets & experiences", numeral: "02" },
    { id: "Family", label: "Family", icon: Users, desc: "Kid-friendly attractions prioritized", numeral: "03" },
    { id: "Friends", label: "Friends", icon: UsersRound, desc: "Adventure & social vibes", numeral: "04" },
];

export default function Step1_Destination({ data, updateData, onNext }: Step1Props) {
    const [destination, setDestination] = useState(data.destination || "");
    const [travelers, setTravelers] = useState(data.travelers || "Couple");
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const initialDateRange =
        data.dates?.start && data.dates?.end
            ? { from: new Date(data.dates.start), to: new Date(data.dates.end) }
            : undefined;

    const [dateRange, setDateRange] = useState<DateRange | undefined>(initialDateRange);

    useEffect(() => {
        setDestination(data.destination || "");
        setTravelers(data.travelers || "Couple");
        if (data.dates?.start && data.dates?.end) {
            setDateRange({ from: new Date(data.dates.start), to: new Date(data.dates.end) });
        }
    }, [data]);

    const nights = useMemo(() => {
        if (dateRange?.from && dateRange?.to) return differenceInDays(dateRange.to, dateRange.from);
        return 0;
    }, [dateRange]);

    const isFormValid = destination && dateRange?.from && dateRange?.to;

    const handleNext = () => {
        if (!isFormValid) return;
        updateData({ destination, dates: { start: dateRange?.from, end: dateRange?.to }, travelers });
        onNext();
    };

    const quickTrips = [
        { label: "Weekend", days: 3 },
        { label: "1 Week", days: 7 },
        { label: "2 Weeks", days: 14 },
    ];

    const filteredDestinations = useMemo(() => {
        if (!destination) return [];
        return popularDestinations.filter(d => d.name.toLowerCase().includes(destination.toLowerCase()));
    }, [destination]);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');

                .s1-root {
                    font-family: 'DM Sans', sans-serif;
                    background: #ffffff;
                    color: #1a1a1a;
                    position: relative;
                }

                .s1-root::before {
                    content: '';
                    position: fixed;
                    top: -20%;
                    right: -10%;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(ellipse, rgba(251,191,36,0.12) 0%, transparent 65%);
                    pointer-events: none;
                    z-index: 0;
                }

                .s1-serif { font-family: 'Playfair Display', serif; }

                .s1-badge {
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

                .s1-label {
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

                .s1-search-wrap {
                    position: relative;
                    background: #fafafa;
                    border: 2px solid #f3f4f6;
                    border-radius: 24px;
                    transition: all 0.25s ease;
                }

                .s1-search-wrap:focus-within {
                    border-color: #f59e0b;
                    background: #ffffff;
                    box-shadow: 0 0 0 6px rgba(245,158,11,0.08), 0 16px 40px rgba(245,158,11,0.1);
                }

                .s1-search-icon {
                    position: absolute;
                    left: 26px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #d1d5db;
                    transition: color 0.25s;
                    pointer-events: none;
                }

                .s1-search-wrap:focus-within .s1-search-icon { color: #f59e0b; }

                .s1-search-input {
                    width: 100%;
                    background: transparent;
                    border: none;
                    outline: none;
                    padding: 26px 26px 26px 70px;
                    font-size: clamp(20px, 2.5vw, 28px);
                    font-family: 'Playfair Display', serif;
                    font-weight: 400;
                    color: #111827;
                    letter-spacing: 0.01em;
                }

                .s1-search-input::placeholder {
                    color: #d1d5db;
                    font-style: italic;
                }

                .s1-suggestions {
                    position: absolute;
                    top: calc(100% + 10px);
                    left: 0;
                    right: 0;
                    background: #fff;
                    border: 1px solid #f3f4f6;
                    border-radius: 24px;
                    overflow: hidden;
                    z-index: 100;
                    box-shadow: 0 24px 60px rgba(0,0,0,0.1), 0 4px 16px rgba(245,158,11,0.06);
                }

                .s1-sugg-header {
                    padding: 14px 20px 10px;
                    border-bottom: 1px solid #f9fafb;
                }

                .s1-sugg-item {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 13px 20px;
                    cursor: pointer;
                    border: none;
                    background: none;
                    width: 100%;
                    text-align: left;
                    transition: background 0.15s;
                    border-bottom: 1px solid #f9fafb;
                    color: #111827;
                }

                .s1-sugg-item:hover { background: #fffbeb; }

                .s1-sugg-img {
                    width: 52px;
                    height: 52px;
                    border-radius: 14px;
                    object-fit: cover;
                }

                .s1-sugg-name {
                    font-family: 'Playfair Display', serif;
                    font-size: 17px;
                    color: #111827;
                }

                .s1-sugg-sub {
                    font-size: 12px;
                    color: #9ca3af;
                    margin-top: 2px;
                    letter-spacing: 0.04em;
                }

                .s1-trending-dot {
                    width: 6px;
                    height: 6px;
                    background: #f59e0b;
                    border-radius: 50%;
                    animation: s1pulse 2s infinite;
                    flex-shrink: 0;
                }

                @keyframes s1pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(0.6); }
                }

                .s1-date-trigger {
                    width: 100%;
                    background: #fafafa;
                    border: 2px solid #f3f4f6;
                    border-radius: 24px;
                    padding: 22px 26px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transition: all 0.25s ease;
                    text-align: left;
                    color: #111827;
                }

                .s1-date-trigger:hover {
                    border-color: #fcd34d;
                    background: #fff;
                    box-shadow: 0 8px 24px rgba(245,158,11,0.08);
                }

                .s1-date-trigger.active {
                    border-color: #f59e0b;
                    background: #fff;
                    box-shadow: 0 0 0 4px rgba(245,158,11,0.08), 0 16px 40px rgba(245,158,11,0.1);
                }

                .s1-date-icon {
                    width: 52px;
                    height: 52px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f3f4f6;
                    color: #9ca3af;
                    transition: all 0.3s;
                    flex-shrink: 0;
                }

                .s1-date-trigger.active .s1-date-icon {
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    color: #fff;
                    box-shadow: 0 6px 16px rgba(245,158,11,0.35);
                }

                .s1-date-display {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(18px, 2.2vw, 26px);
                    color: #111827;
                }

                .s1-date-placeholder {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(18px, 2.2vw, 26px);
                    font-style: italic;
                    color: #d1d5db;
                }

                .s1-nights {
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #f59e0b;
                    margin-top: 4px;
                }

                .s1-date-sub {
                    font-size: 12px;
                    color: #9ca3af;
                    margin-top: 4px;
                }

                .s1-chip {
                    padding: 8px 18px;
                    border: 1.5px solid #e5e7eb;
                    border-radius: 100px;
                    background: #fff;
                    color: #6b7280;
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 0.04em;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: all 0.2s;
                    font-family: 'DM Sans', sans-serif;
                }

                .s1-chip:hover {
                    border-color: #f59e0b;
                    color: #d97706;
                    background: #fffbeb;
                    box-shadow: 0 4px 12px rgba(245,158,11,0.1);
                }

                .s1-traveler-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 12px;
                }

                @media (max-width: 640px) {
                    .s1-traveler-grid { grid-template-columns: repeat(2, 1fr); }
                }

                .s1-traveler-card {
                    padding: 22px 18px;
                    border-radius: 24px;
                    border: 2px solid #f3f4f6;
                    background: #fafafa;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    transition: all 0.22s ease;
                    position: relative;
                    overflow: hidden;
                    color: #111827;
                    min-height: 160px;
                    justify-content: space-between;
                    text-align: left;
                }

                .s1-traveler-card:hover:not(.sel) {
                    border-color: #fcd34d;
                    background: #fffbeb;
                    transform: translateY(-4px);
                    box-shadow: 0 12px 32px rgba(245,158,11,0.1);
                }

                .s1-traveler-card.sel {
                    border-color: #f59e0b;
                    background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
                    color: #fff;
                    box-shadow: 0 12px 32px rgba(245,158,11,0.35);
                }

                .s1-traveler-card.sel::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
                    pointer-events: none;
                }

                .s1-traveler-num {
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    color: #d1d5db;
                    transition: color 0.22s;
                }

                .s1-traveler-card.sel .s1-traveler-num { color: rgba(255,255,255,0.5); }

                .s1-traveler-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #fff3d0;
                    color: #f59e0b;
                    transition: all 0.22s;
                }

                .s1-traveler-card.sel .s1-traveler-icon {
                    background: rgba(255,255,255,0.25);
                    color: #fff;
                }

                .s1-traveler-name {
                    font-size: 15px;
                    font-weight: 700;
                    color: #111827;
                    transition: color 0.22s;
                }

                .s1-traveler-card.sel .s1-traveler-name { color: #fff; }

                .s1-traveler-desc {
                    font-size: 11px;
                    color: #9ca3af;
                    margin-top: 2px;
                    transition: color 0.22s;
                    line-height: 1.5;
                }

                .s1-traveler-card.sel .s1-traveler-desc { color: rgba(255,255,255,0.7); }

                .s1-cta {
                    width: 100%;
                    padding: 22px 32px;
                    border-radius: 20px;
                    border: none;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 14px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .s1-cta.on {
                    background: linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #f59e0b 100%);
                    background-size: 200% 100%;
                    color: #fff;
                    box-shadow: 0 8px 32px rgba(245,158,11,0.4), 0 2px 8px rgba(234,88,12,0.2);
                }

                .s1-cta.on:hover {
                    background-position: 100% 0;
                    box-shadow: 0 14px 48px rgba(245,158,11,0.45), 0 4px 12px rgba(234,88,12,0.25);
                    transform: translateY(-2px);
                }

                .s1-cta.on::after {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%; width: 60%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.8s ease;
                }

                .s1-cta.on:hover::after { left: 150%; }

                .s1-cta.off {
                    background: #f3f4f6;
                    color: #d1d5db;
                    cursor: not-allowed;
                }

                .s1-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #f3f4f6, transparent);
                }

                .s1-security {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    font-size: 10px;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: #9ca3af;
                    font-weight: 600;
                }
            `}</style>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="s1-root"
                style={{ padding: "40px 0", position: "relative", zIndex: 1 }}
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    style={{ marginBottom: 52 }}
                >
                    <div style={{ marginBottom: 18 }}>
                        <span className="s1-badge">
                            <Sparkles size={12} style={{ color: "#f59e0b" }} />
                            AI-Powered Trip Planner
                        </span>
                    </div>

                    <h1 className="s1-serif" style={{
                        fontSize: "clamp(40px, 5.5vw, 72px)",
                        fontWeight: 700,
                        lineHeight: 1.08,
                        color: "#111827",
                        letterSpacing: "-0.01em",
                        marginBottom: 18,
                    }}>
                        Where is your next
                        <br />
                        <span style={{
                            background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            fontStyle: "italic",
                        }}>
                            adventure?
                        </span>
                    </h1>

                    <p style={{
                        fontSize: 16,
                        color: "#6b7280",
                        lineHeight: 1.65,
                        maxWidth: 480,
                        fontWeight: 500,
                    }}>
                        Tell us your dream destination and dates — our AI will craft the perfect itinerary tailored just for you.
                    </p>
                </motion.div>

                <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>

                    {/* Destination */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.45 }}
                        style={{ position: "relative", zIndex: 50 }}
                    >
                        <div className="s1-label">
                            <MapPin size={12} style={{ color: "#f59e0b" }} /> Destination
                        </div>
                        <div className="s1-search-wrap">
                            <MapPin size={22} className="s1-search-icon" />
                            <input
                                value={destination}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDestination(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                placeholder="Try 'Paris' or 'Marrakech'…"
                                className="s1-search-input"
                            />
                        </div>

                        <AnimatePresence>
                            {isSearchFocused && (
                                <motion.div
                                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                    transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                                    className="s1-suggestions"
                                >
                                    <div className="s1-sugg-header">
                                        <span className="s1-label" style={{ marginBottom: 0 }}>
                                            <TrendingUp size={11} style={{ color: "#f59e0b" }} />
                                            {destination ? "Matches" : "Trending Now"}
                                        </span>
                                    </div>
                                    {(destination ? filteredDestinations : popularDestinations).map((dest, idx) => (
                                        <motion.button
                                            key={dest.name}
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.04 }}
                                            onClick={() => setDestination(dest.name)}
                                            className="s1-sugg-item"
                                        >
                                            <img src={dest.image} alt={dest.name} className="s1-sugg-img" />
                                            <div style={{ flex: 1 }}>
                                                <div className="s1-sugg-name">{dest.name}</div>
                                                <div className="s1-sugg-sub">{dest.flag} · {dest.tagline}</div>
                                            </div>
                                            {dest.trending && <div className="s1-trending-dot" />}
                                            <ChevronRight size={16} style={{ color: "#d1d5db" }} />
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Dates */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.45 }}
                        style={{ position: "relative", zIndex: 10 }}
                    >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
                            <div className="s1-label" style={{ marginBottom: 0 }}>
                                <Clock size={12} style={{ color: "#f59e0b" }} /> When are you traveling?
                            </div>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                {quickTrips.map((trip) => (
                                    <button
                                        key={trip.label}
                                        onClick={() => setDateRange({ from: new Date(), to: addDays(new Date(), trip.days) })}
                                        className="s1-chip"
                                    >
                                        {trip.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                            <PopoverTrigger asChild>
                                <button className={`s1-date-trigger ${dateRange?.from ? "active" : ""}`}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                                        <div className="s1-date-icon">
                                            <CalendarIcon size={24} />
                                        </div>
                                        <div>
                                            {dateRange?.from ? (
                                                <>
                                                    <div className="s1-date-display">
                                                        {dateRange.to ? (
                                                            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                                {format(dateRange.from, "MMM dd")}
                                                                <ArrowRight size={18} style={{ color: "#f59e0b" }} />
                                                                {format(dateRange.to, "MMM dd, yyyy")}
                                                            </span>
                                                        ) : format(dateRange.from, "MMM dd, yyyy")}
                                                    </div>
                                                    {nights > 0 && <div className="s1-nights">{nights} magical nights</div>}
                                                </>
                                            ) : (
                                                <>
                                                    <div className="s1-date-placeholder">Pick your dates</div>
                                                    <div className="s1-date-sub">Select dates to see itinerary options</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <ChevronRight size={20} style={{ color: "#d1d5db" }} />
                                </button>
                            </PopoverTrigger>

                            <PopoverContent
                                className="p-0 w-auto"
                                align="start"
                                style={{
                                    background: "#fff",
                                    border: "1px solid #f3f4f6",
                                    borderRadius: 24,
                                    overflow: "hidden",
                                    boxShadow: "0 32px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(245,158,11,0.1)"
                                }}
                            >
                                <div style={{
                                    padding: "16px 24px",
                                    borderBottom: "1px solid #f3f4f6",
                                    background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                                }}>
                                    <span style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                        letterSpacing: "0.14em",
                                        textTransform: "uppercase" as const,
                                        color: "#fff",
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}>
                                        Select Travel Dates
                                    </span>
                                </div>
                                <Calendar
                                    mode="range"
                                    selected={dateRange}
                                    onSelect={setDateRange}
                                    numberOfMonths={2}
                                    className="p-6"
                                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                />
                                <div style={{
                                    padding: "14px 24px",
                                    borderTop: "1px solid #f3f4f6",
                                    background: "#fafafa",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}>
                                    <span style={{ fontSize: 12, color: "#9ca3af", letterSpacing: "0.04em" }}>
                                        {dateRange?.from && dateRange?.to
                                            ? `${differenceInDays(dateRange.to, dateRange.from)} nights selected`
                                            : "Choose your dates"}
                                    </span>
                                    <button
                                        onClick={() => setIsPopoverOpen(false)}
                                        style={{
                                            padding: "9px 24px",
                                            background: "#111827",
                                            border: "none",
                                            borderRadius: 10,
                                            color: "#fff",
                                            fontWeight: 700,
                                            fontSize: 12,
                                            letterSpacing: "0.06em",
                                            cursor: "pointer",
                                            fontFamily: "'DM Sans', sans-serif",
                                        }}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </motion.div>

                    {/* Traveler Type */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.45 }}
                    >
                        <div className="s1-label">
                            <UsersRound size={12} style={{ color: "#f59e0b" }} /> Who is traveling?
                        </div>
                        <div className="s1-traveler-grid">
                            {travelerTypes.map((type, idx) => (
                                <motion.button
                                    key={type.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.45 + idx * 0.06 }}
                                    whileHover={travelers !== type.id ? { y: -4 } : {}}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setTravelers(type.id)}
                                    className={`s1-traveler-card ${travelers === type.id ? "sel" : ""}`}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                        <div className="s1-traveler-icon">
                                            <type.icon size={18} />
                                        </div>
                                        <span className="s1-traveler-num">{type.numeral}</span>
                                    </div>
                                    <div>
                                        <div className="s1-traveler-name">{type.label}</div>
                                        <div className="s1-traveler-desc">{type.desc}</div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.45 }}
                    style={{ marginTop: 52, display: "flex", flexDirection: "column", gap: 18 }}
                >
                    <div className="s1-divider" />

                    <button
                        onClick={handleNext}
                        disabled={!isFormValid}
                        className={`s1-cta ${isFormValid ? "on" : "off"}`}
                    >
                        <span style={{ position: "relative", zIndex: 1 }}>
                            {isFormValid ? "Continue to Interests" : "Complete Details to Continue"}
                        </span>
                        {isFormValid && (
                            <ArrowRight size={18} strokeWidth={2.5} style={{ position: "relative", zIndex: 1 }} />
                        )}
                    </button>

                    <div className="s1-security">
                        <ShieldCheck size={12} style={{ color: "#10b981" }} />
                        Secure & Private · AI Personalization Active
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}