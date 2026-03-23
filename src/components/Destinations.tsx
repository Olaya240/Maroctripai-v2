import { motion } from 'motion/react';
import { ArrowRight, MapPin } from 'lucide-react';

const destinations = [
    {
        name: 'Marrakech',
        tag: 'Imperial City',
        description: 'Vibrant souks, majestic palaces, and the legendary Jemaa el-Fnaa square.',
        image: 'https://images.unsplash.com/photo-1628962600458-1704b2cb1fb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        size: 'tall', // spans 2 rows
    },
    {
        name: 'Fes',
        tag: 'Ancient Medina',
        description: 'Traditional tanneries and the spiritual heart of Morocco.',
        image: 'https://images.unsplash.com/photo-1742434790127-55e03b30455e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        size: 'normal',
    },
    {
        name: 'Chefchaouen',
        tag: 'Blue Pearl',
        description: 'Nestled in the Rif Mountains — a photographer\'s paradise.',
        image: 'https://images.unsplash.com/photo-1707400015348-b0a5851ab163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        size: 'normal',
    },
    {
        name: 'Sahara Desert',
        tag: 'Golden Dunes',
        description: 'Starlit nights and unforgettable camel treks into the desert.',
        image: 'https://images.unsplash.com/photo-1731169243668-73e9e968e363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        size: 'wide', // spans 2 cols
    },
    {
        name: 'Essaouira',
        tag: 'Coastal Gem',
        description: 'Windswept beaches, fresh seafood, and bohemian coastal vibes.',
        image: 'https://images.unsplash.com/photo-1668335554961-4f9c1ec5cec9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        size: 'normal',
    },
];

export default function Destinations() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');

                .dst-root {
                    font-family: 'DM Sans', sans-serif;
                    padding: 120px 0;
                    background: #f9fafb;
                    position: relative;
                    overflow: hidden;
                }

                .dst-root::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse 55% 40% at 80% 10%, rgba(245,158,11,0.04) 0%, transparent 70%);
                    pointer-events: none;
                }

                .dst-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 36px;
                    position: relative;
                    z-index: 1;
                }

                @media (max-width: 640px) { .dst-inner { padding: 0 20px; } }

                /* Header */
                .dst-header {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 32px;
                    margin-bottom: 52px;
                    flex-wrap: wrap;
                }

                .dst-overline {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: #d97706;
                    margin-bottom: 14px;
                }

                .dst-overline-dot {
                    width: 20px;
                    height: 1.5px;
                    background: linear-gradient(90deg, #f59e0b, #ea580c);
                    border-radius: 2px;
                }

                .dst-headline {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(36px, 4.5vw, 56px);
                    font-weight: 600;
                    line-height: 1.08;
                    color: #111827;
                    letter-spacing: -0.01em;
                }

                .dst-headline em {
                    font-style: italic;
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .dst-header-right {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 14px;
                    flex-shrink: 0;
                }

                @media (max-width: 640px) {
                    .dst-header-right { align-items: flex-start; }
                }

                .dst-sub {
                    font-size: 14px;
                    color: #6b7280;
                    line-height: 1.7;
                    max-width: 300px;
                    text-align: right;
                }

                @media (max-width: 640px) { .dst-sub { text-align: left; max-width: 100%; } }

                .dst-view-all {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 10px 20px;
                    border-radius: 100px;
                    border: 1.5px solid #e5e7eb;
                    background: #fff;
                    color: #374151;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.04em;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: 'DM Sans', sans-serif;
                }

                .dst-view-all:hover {
                    border-color: #f59e0b;
                    color: #d97706;
                    background: #fffbeb;
                    box-shadow: 0 4px 14px rgba(245,158,11,0.12);
                }

                /* Bento grid */
                .dst-grid {
                    display: grid;
                    grid-template-columns: repeat(12, 1fr);
                    grid-template-rows: 280px 280px;
                    gap: 16px;
                }

                @media (max-width: 900px) {
                    .dst-grid {
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: auto;
                    }
                    .dst-cell-tall { grid-row: span 1 !important; }
                    .dst-cell-wide { grid-column: span 2 !important; }
                }

                @media (max-width: 560px) {
                    .dst-grid { grid-template-columns: 1fr; }
                    .dst-cell-wide { grid-column: span 1 !important; }
                }

                /* Cell placement */
                .dst-cell-0 { grid-column: span 5; grid-row: span 2; } /* Marrakech: tall */
                .dst-cell-1 { grid-column: span 4; grid-row: span 1; } /* Fes: normal */
                .dst-cell-2 { grid-column: span 3; grid-row: span 1; } /* Chefchaouen: normal */
                .dst-cell-3 { grid-column: span 7; grid-row: span 1; } /* Sahara: wide */
                .dst-cell-4 { grid-column: span 0; grid-row: span 1; } /* Essaouira: normal */

                /* Recalc: 5+4+3=12 top row, 5(cont)+7=12 but 5 is spanning 2 rows */
                /* So: col 1-5 = Marrakech (rows 1-2), col 6-9 = Fes (row1), col 10-12 = Chefchaouen (row1) */
                /* Row 2: col 6-12 = Sahara (7 cols) — but Essaouira needs space */
                /* Let's redo: Marrakech 5col×2row, Fes 4col row1, Chef 3col row1, Sahara 4col row2, Essaouira 3col row2 */

                .dst-cell-0 { grid-column: 1 / 6; grid-row: 1 / 3; }
                .dst-cell-1 { grid-column: 6 / 10; grid-row: 1 / 2; }
                .dst-cell-2 { grid-column: 10 / 13; grid-row: 1 / 2; }
                .dst-cell-3 { grid-column: 6 / 10; grid-row: 2 / 3; }
                .dst-cell-4 { grid-column: 10 / 13; grid-row: 2 / 3; }

                @media (max-width: 900px) {
                    .dst-cell-0 { grid-column: 1 / 3; grid-row: auto; height: 300px; }
                    .dst-cell-1 { grid-column: 1 / 2; grid-row: auto; }
                    .dst-cell-2 { grid-column: 2 / 3; grid-row: auto; }
                    .dst-cell-3 { grid-column: 1 / 3; grid-row: auto; }
                    .dst-cell-4 { grid-column: 1 / 3; grid-row: auto; }
                    .dst-grid {
                        grid-template-rows: 300px 220px 220px 220px 220px;
                    }
                }

                @media (max-width: 560px) {
                    .dst-cell-0,
                    .dst-cell-1,
                    .dst-cell-2,
                    .dst-cell-3,
                    .dst-cell-4 {
                        grid-column: 1 / 2;
                        grid-row: auto;
                        height: 240px;
                    }
                    .dst-grid { grid-template-rows: repeat(5, 240px); }
                }

                /* Card */
                .dst-card {
                    position: relative;
                    border-radius: 24px;
                    overflow: hidden;
                    cursor: pointer;
                    background: #111;
                    height: 100%;
                    min-height: 200px;
                }

                .dst-card-img {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.4s;
                    filter: brightness(0.82) saturate(1.1);
                    will-change: transform;
                }

                .dst-card:hover .dst-card-img {
                    transform: scale(1.07);
                    filter: brightness(0.65) saturate(1.2);
                }

                /* Base overlay */
                .dst-card-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        to top,
                        rgba(0,0,0,0.85) 0%,
                        rgba(0,0,0,0.3) 40%,
                        rgba(0,0,0,0.05) 100%
                    );
                    transition: opacity 0.4s;
                }

                /* Hover amber tint */
                .dst-card-hover-tint {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        135deg,
                        rgba(245,158,11,0.22) 0%,
                        rgba(234,88,12,0.15) 100%
                    );
                    opacity: 0;
                    transition: opacity 0.4s;
                }

                .dst-card:hover .dst-card-hover-tint { opacity: 1; }

                /* Content */
                .dst-card-content {
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    padding: 22px;
                    z-index: 2;
                    transition: transform 0.35s ease;
                }

                .dst-card:hover .dst-card-content {
                    transform: translateY(-4px);
                }

                .dst-card-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    padding: 4px 10px;
                    border-radius: 100px;
                    background: rgba(245,158,11,0.2);
                    border: 1px solid rgba(245,158,11,0.35);
                    color: #fbbf24;
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    margin-bottom: 8px;
                    backdrop-filter: blur(8px);
                }

                .dst-card-name {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(22px, 2.5vw, 30px);
                    font-weight: 600;
                    color: #fff;
                    line-height: 1.1;
                    margin-bottom: 6px;
                    letter-spacing: 0.01em;
                }

                .dst-card-desc {
                    font-size: 12px;
                    color: rgba(255,255,255,0.6);
                    line-height: 1.55;
                    max-width: 280px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    transition: color 0.3s;
                }

                .dst-card:hover .dst-card-desc { color: rgba(255,255,255,0.8); }

                /* Explore arrow — appears on hover */
                .dst-card-arrow {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 11px;
                    font-weight: 700;
                    color: #f59e0b;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    margin-top: 12px;
                    opacity: 0;
                    transform: translateY(8px);
                    transition: all 0.3s ease 0.05s;
                }

                .dst-card:hover .dst-card-arrow {
                    opacity: 1;
                    transform: translateY(0);
                }

                .dst-card-arrow-icon {
                    width: 24px; height: 24px;
                    border-radius: 50%;
                    background: rgba(245,158,11,0.2);
                    border: 1px solid rgba(245,158,11,0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                }

                .dst-card:hover .dst-card-arrow-icon { background: rgba(245,158,11,0.35); }

                /* Count badge (top-right corner) */
                .dst-card-count {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    width: 32px; height: 32px;
                    border-radius: 10px;
                    background: rgba(0,0,0,0.4);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255,255,255,0.12);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 13px;
                    font-weight: 600;
                    color: rgba(255,255,255,0.6);
                    z-index: 3;
                    transition: all 0.25s;
                }

                .dst-card:hover .dst-card-count {
                    background: rgba(245,158,11,0.25);
                    border-color: rgba(245,158,11,0.4);
                    color: #fbbf24;
                }
            `}</style>

            <section id="destinations" className="dst-root">
                <div className="dst-inner">

                    {/* Header */}
                    <motion.div
                        className="dst-header"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div>
                            <div className="dst-overline">
                                <div className="dst-overline-dot" />
                                Destinations
                            </div>
                            <h2 className="dst-headline">
                                Morocco's <em>finest</em><br />treasures await
                            </h2>
                        </div>

                        <div className="dst-header-right">
                            <p className="dst-sub">
                                From imperial cities to desert dunes — discover the places that make Morocco unforgettable.
                            </p>
                            <button className="dst-view-all">
                                View all destinations
                                <ArrowRight size={13} strokeWidth={2.5} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Bento grid */}
                    <div className="dst-grid">
                        {destinations.map((dest, idx) => (
                            <motion.div
                                key={dest.name}
                                className={`dst-cell-${idx}`}
                                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    delay: idx * 0.09,
                                    duration: 0.6,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                            >
                                <div className="dst-card">
                                    <img
                                        className="dst-card-img"
                                        src={dest.image}
                                        alt={dest.name}
                                        loading="lazy"
                                    />
                                    <div className="dst-card-overlay" />
                                    <div className="dst-card-hover-tint" />

                                    {/* Corner index */}
                                    <div className="dst-card-count">
                                        {String(idx + 1).padStart(2, '0')}
                                    </div>

                                    <div className="dst-card-content">
                                        <div className="dst-card-tag">
                                            <MapPin size={9} />
                                            {dest.tag}
                                        </div>
                                        <div className="dst-card-name">{dest.name}</div>
                                        <div className="dst-card-desc">{dest.description}</div>
                                        <div className="dst-card-arrow">
                                            Explore
                                            <div className="dst-card-arrow-icon">
                                                <ArrowRight size={11} strokeWidth={2.5} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>
        </>
    );
}