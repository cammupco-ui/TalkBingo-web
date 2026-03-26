'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styles from './InteractiveCardHero.module.css';
import { useTranslation } from '@/lib/i18n';

interface BalanceCard { type: 'balance'; question: string; choiceA: string; choiceB: string; emoji: string; preview: string; }
interface TruthCard { type: 'truth'; question: string; emoji: string; preview: string; }
type CardData = BalanceCard | TruthCard;

const CARD_DEPTHS = [-0.28, 0.22, -0.14, 0.32, -0.20, 0.18, -0.08, 0.26];
const CIRCLE_POSITIONS = Array.from({ length: 8 }).map((_, i) => {
    const angleDeg = (i * 45) - 90;
    const angleRad = angleDeg * (Math.PI / 180);
    const radiusX = 480; const radiusY = 360;
    return { xPx: Math.cos(angleRad) * radiusX, yPx: Math.sin(angleRad) * radiusY, rot: angleDeg + 90, depth: CARD_DEPTHS[i], scale: 1.0 };
});
const CARD_LERP_SPEEDS = [0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10, 0.10];

export default function InteractiveCardHero() {
    const t = useTranslation();
    const CARDS: CardData[] = t.cards as unknown as CardData[];

    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);
    // 카드별 독립 오프셋 (CARDS.length + 로고용 1개)
    const cardOffsetsRef = useRef(Array(CARDS.length + 1).fill(null).map(() => ({ x: 0, y: 0 })));
    const [cardOffsets, setCardOffsets] = useState<{ x: number, y: number }[]>(
        () => Array(CARDS.length + 1).fill(null).map(() => ({ x: 0, y: 0 }))
    );
    const [isMobile, setIsMobile] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isDone, setIsDone] = useState(false);

    // 텍스트 시퀀스 상태
    const [showWe, setShowWe] = useState(false);
    const [showBingo, setShowBingo] = useState(false);
    const [showPlay, setShowPlay] = useState(false);
    const [textFaded, setTextFaded] = useState(false);

    // 로고 시퀀스 상태
    const [showLogoIcon, setShowLogoIcon] = useState(false);
    const [showLogoText, setShowLogoText] = useState(false);

    // 코어 메시지 상태
    const [showCoreLine1, setShowCoreLine1] = useState(false);
    const [showCoreLine2, setShowCoreLine2] = useState(false);

    // 스크롤 힌트 - footer 근처에서 숨김
    const [nearFooter, setNearFooter] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const heroRef = useRef<HTMLElement>(null);

    // 카드 인터랙션 상태
    const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);
    const lastSelectedRef = useRef<number | null>(null);
    if (selectedCardIdx !== null) { lastSelectedRef.current = selectedCardIdx; }
    const [animatingOutIdx, setAnimatingOutIdx] = useState<number | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isFrozenRef = useRef(false);
    isFrozenRef.current = selectedCardIdx !== null || animatingOutIdx !== null;

    // 카드 드래그-고정 (delta offset from orbit)
    const [pinnedPositions, setPinnedPositions] = useState<({ dx: number, dy: number } | null)[]>(() => Array(CARDS.length).fill(null));
    const dragRef = useRef<{ cardIdx: number; startMX: number; startMY: number; baseDx: number; baseDy: number; hasDragged: boolean } | null>(null);

    const handleSelectCard = (index: number | null) => {
        if (index === null) {
            if (selectedCardIdx !== null) {
                setAnimatingOutIdx(selectedCardIdx);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => { setAnimatingOutIdx(null); }, 500);
            }
            setSelectedCardIdx(null);
        } else {
            setSelectedCardIdx(index);
            setAnimatingOutIdx(null);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        const timer = setTimeout(() => setIsMounted(true), 100);

        // scrollDown - footer 근처에서 숨김
        const handleScroll = () => {
            const footer = document.querySelector('footer');
            const footerHeight = footer ? footer.getBoundingClientRect().height : 150;
            const distFromBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
            setNearFooter(distFromBottom < footerHeight + 100);
            if (window.scrollY > 60) setHasScrolled(true);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => { window.removeEventListener('resize', check); window.removeEventListener('scroll', handleScroll); clearTimeout(timer); };
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        const t1 = setTimeout(() => setShowWe(true), 3000);
        const t2 = setTimeout(() => setShowBingo(true), 3600);
        const t3 = setTimeout(() => setShowPlay(true), 4200);
        const t4 = setTimeout(() => setTextFaded(true), 5500);
        const t5 = setTimeout(() => setShowLogoIcon(true), 6000);
        const t6 = setTimeout(() => setShowLogoText(true), 6500);
        const t7 = setTimeout(() => { setShowCoreLine1(true); setIsDone(true); }, 6800);
        const t8 = setTimeout(() => setShowCoreLine2(true), 7800);
        return () => { [t1, t2, t3, t4, t5, t6, t7, t8].forEach(clearTimeout); };
    }, [isMounted]);

    useEffect(() => {
        const updateOffset = () => {
            if (!isFrozenRef.current) {
                const el = containerRef.current;
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (mouseRef.current.x - cx) / (rect.width / 2);
                const dy = (mouseRef.current.y - cy) / (rect.height / 2);
                const targetX = dx * 120;
                const targetY = dy * 75;

                let changed = false;
                const prevOffsets = cardOffsetsRef.current;
                const newOffsets = prevOffsets.map((o, i) => {
                    const chainTarget = i === 0
                        ? { x: targetX, y: targetY }
                        : prevOffsets[i - 1];
                    const speed = i < CARDS.length ? CARD_LERP_SPEEDS[i] : 0.04;
                    const nx = o.x + (chainTarget.x - o.x) * speed;
                    const ny = o.y + (chainTarget.y - o.y) * speed;
                    if (Math.abs(nx - o.x) > 0.005 || Math.abs(ny - o.y) > 0.005) changed = true;
                    return { x: nx, y: ny };
                });
                cardOffsetsRef.current = newOffsets;
                if (changed) setCardOffsets([...newOffsets]);
            }
            rafRef.current = requestAnimationFrame(updateOffset);
        };
        rafRef.current = requestAnimationFrame(updateOffset);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    const handlePointerMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        const point = 'touches' in e ? e.touches[0] : e;
        mouseRef.current = { x: point.clientX, y: point.clientY };
        if (dragRef.current) {
            const { startMX, startMY, baseDx, baseDy, cardIdx } = dragRef.current;
            const rawDx = point.clientX - startMX;
            const rawDy = point.clientY - startMY;
            if (Math.abs(rawDx) > 5 || Math.abs(rawDy) > 5) {
                dragRef.current.hasDragged = true;
                setPinnedPositions(prev => {
                    const n = [...prev];
                    n[cardIdx] = { dx: baseDx + rawDx, dy: baseDy + rawDy };
                    return n;
                });
            }
        }
    }, []);

    const handleCardDragStart = (e: React.MouseEvent, cardIdx: number) => {
        if (selectedCardIdx !== null) return;
        e.stopPropagation();
        const base = pinnedPositions[cardIdx] ?? { dx: 0, dy: 0 };
        dragRef.current = { cardIdx, startMX: e.clientX, startMY: e.clientY, baseDx: base.dx, baseDy: base.dy, hasDragged: false };
    };

    const handlePointerUp = useCallback(() => { dragRef.current = null; }, []);

    const visibleCards = isMobile ? CARDS.slice(0, 8) : CARDS;

    const coreLines = t.hero.coreMessage.split('\n');

    return (
        <>
            <section ref={heroRef} className={styles.heroSection} onMouseMove={handlePointerMove} onTouchMove={handlePointerMove} onMouseUp={handlePointerUp}>
                <div className={styles.heroBackground} />

                <div className={`${styles.auroraBlob} ${styles.auroraBlob1}`} />
                <div className={`${styles.auroraBlob} ${styles.auroraBlob2}`} />
                <div className={`${styles.auroraBlob} ${styles.auroraBlob3}`} />
                <div ref={containerRef} className={styles.cardContainer}>
                    <div className={`${styles.dimOverlay} ${selectedCardIdx !== null ? styles.dimActive : ''}`} onClick={() => handleSelectCard(null)} />
                    <div className={styles.scatterWrapper}>

                        {/* 중앙 타이포그래피 영역 */}
                        <div className={styles.centerTypography} style={{ opacity: isMounted ? 1 : 0, top: isMobile ? '30%' : '40%', transform: `translate(-50%, -50%) translate(${isMobile ? 0 : cardOffsets[CARDS.length].x * 0.05}px, ${isMobile ? 0 : cardOffsets[CARDS.length].y * 0.05}px)` }}>

                            {/* 페이즈 1: We / BINGO / play */}
                            <div className={`${styles.textGroup} ${textFaded ? styles.textGroupFaded : ''}`}>
                                <div className={`${styles.weText} ${showWe ? styles.textVisible : ''}`}>{t.hero.phase1We}</div>
                                <div className={`${styles.bingoRow} ${showBingo ? styles.textVisible : ''}`}>
                                    <span className={styles.bingoHighlight}>BINGO</span>
                                </div>
                                <div className={`${styles.playText} ${showPlay ? styles.textVisible : ''}`}>{t.hero.phase1Play}</div>
                            </div>

                            {/* 페이즈 2: 로고 */}
                            <div className={`${styles.logoGroup} ${showLogoText ? styles.logoGroupVisible : ''}`}>
                                <div className={`${styles.logoIconWrap} ${showLogoIcon ? styles.logoIconVisible : ''}`}>
                                    <Image src="/logo_vector.svg" alt="TalkBingo Icon" width={64} height={64} />
                                </div>
                                <div className={`${styles.logoText} ${showLogoText ? styles.logoTextVisible : ''}`}>
                                    TALKBINGO
                                </div>
                            </div>

                        </div>

                        {/* 카드들 */}
                        {visibleCards.map((card, i) => {
                            const pos = CIRCLE_POSITIONS[i % CIRCLE_POSITIONS.length];
                            const isSelected = selectedCardIdx === i;
                            const isAnimatingOut = animatingOutIdx === i;
                            const mobileScale = isMobile ? 0.45 : 1;
                            const mobileCardScale = isMobile ? 0.6 : 1;
                            const pinned = pinnedPositions[i];
                            const currentTransform = `translate(calc(-50% + ${pos.xPx * mobileScale + (pinned?.dx ?? 0)}px), calc(-50% + ${pos.yPx * mobileScale + (pinned?.dy ?? 0)}px)) rotate(${pos.rot}deg) scale(${pos.scale * mobileCardScale})`;
                            const currentTransition = 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s';
                            const cardStyle: React.CSSProperties = isSelected
                                ? { left: isMobile ? '50%' : '35%', top: isMobile ? '22%' : '30%', transform: `translate(-50%, -50%) rotate(0deg) scale(${isMobile ? 1.5 : 2.6})`, zIndex: 999, cursor: 'default', transitionDelay: '0s', opacity: 1, transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s' }
                                : { left: '50%', top: isMobile ? '30%' : '40%', transform: currentTransform, opacity: isMounted ? 1 : 0, zIndex: isAnimatingOut ? 999 : (Math.round(Math.abs(pos.depth) * 10) + 10), cursor: isDone ? 'grab' : 'default', transition: pinned ? 'opacity 0.8s' : currentTransition, transitionDelay: (!isMounted || animatingOutIdx !== null) ? '0s' : `${0.3 + i * 0.3}s` };
                            const isSelectedStatus = isSelected || isAnimatingOut;
                            const parallaxTransform = isSelectedStatus ? `translate(0px, 0px)` : pinned ? `translate(0px, 0px)` : `translate(${isMobile ? 0 : cardOffsets[i].x * pos.depth * 2}px, ${isMobile ? 0 : cardOffsets[i].y * pos.depth * 2}px)`;
                            return (
                                <div key={i} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transform: parallaxTransform, zIndex: isSelectedStatus ? 999 : (Math.round(Math.abs(pos.depth) * 10) + 10) }}>
                                    <div className={`${styles.card} ${card.type === 'balance' ? styles.balanceCard : styles.truthCard} ${isSelectedStatus ? styles.selectedCard : ''}`} style={{ ...cardStyle, pointerEvents: 'auto', '--sparkle-delay': `${i * 1.25}s` } as React.CSSProperties}
                                        onMouseDown={(e) => handleCardDragStart(e, i)}
                                        onClick={(e) => { if (dragRef.current?.hasDragged) return; e.stopPropagation(); handleSelectCard(isSelected ? null : i); }}>
                                        <div className={styles.cardContent}>
                                            <div className={styles.cardTop}><span className={styles.cardLabel}>{card.type === 'balance' ? 'BALANCE' : 'TRUTH'}</span></div>
                                            <div className={styles.cardMiddle}><p className={styles.visualQuestion}>{card.question}</p></div>
                                            <div className={styles.cardBottom}>
                                                {card.type === 'balance' ? (
                                                    <div className={styles.visualChoices}><span className={styles.visualChoiceBtn}>{(card as BalanceCard).choiceA}</span><span className={styles.visualChoiceBtn}>{(card as BalanceCard).choiceB}</span></div>
                                                ) : (<div className={styles.visualInput}></div>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* 카드 선택 메시지 */}
                        <div className={`${styles.messageOverlay} ${selectedCardIdx !== null ? styles.messageActive : ''}`} onClick={() => handleSelectCard(null)}>
                            {lastSelectedRef.current !== null && (
                                <div className={styles.messageContent}>
                                    {CARDS[lastSelectedRef.current].type === 'balance' ? (
                                        <><h3 className={styles.kickMessageBalance}>{t.hero.msgBalanceTitle}</h3><p className={styles.emotionMessage}>{t.hero.msgBalanceBody.split('\n').map((line, i) => <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>)}</p></>
                                    ) : (
                                        <><h3 className={styles.kickMessageTruth}>{t.hero.msgTruthTitle}</h3><p className={styles.emotionMessage}>{t.hero.msgTruthBody.split('\n').map((line, i) => <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>)}</p></>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>
                </div>


                {/* 코어 메시지 */}
                <div className={`${styles.coreMessage} ${showCoreLine1 ? styles.coreMessageShow : ''}`} style={{ opacity: selectedCardIdx !== null ? 0 : undefined, pointerEvents: selectedCardIdx !== null ? 'none' : undefined }}>
                    <p className={`${styles.coreMessageLine} ${showCoreLine1 ? styles.coreLineVisible : ''}`}>
                        {coreLines[0]}{coreLines.length > 1 && <><br />{coreLines[1]}</>}
                    </p>

                    {/* CTA 버튼 */}
                    <div className={`${styles.ctaButtons} ${showCoreLine2 ? styles.ctaVisible : ''}`}>
                        <BingoGameButton className={styles.ctaPrimary} label={t.hero.ctaPrimary} />
                        <AppDownloadButton storeLabels={t.store} />
                    </div>
                </div>

            </section>
            {/* 스크롤 힌트 */}
            <div className={styles.scrollDown} style={{ opacity: !nearFooter ? 1 : 0, transition: 'opacity 0.5s ease' }}>
                <span>{t.hero.scrollHint}</span>
                <div className={styles.scrollArrow} />
            </div>
        </>
    );
}

/* ─────────────────────────────────────────────────────────
   빙고게임 하러가기 — 앱 설치 시 앱으로, 미설치 시 앱 스토어로
   ───────────────────────────────────────────────────────── */
function BingoGameButton({ className, label }: { className: string; label: string }) {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        
        // 데스크탑 체크
        const isDesktop = !(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
        if (isDesktop) {
            window.open('/api/download', '_blank', 'noopener,noreferrer');
            return;
        }

        const APP_SCHEME = 'talkbingo://';
        const start = Date.now();
        window.location.href = APP_SCHEME;

        setTimeout(() => {
            if (!document.hidden && Date.now() - start < 2000) {
                window.location.href = '/api/download';
            }
        }, 1200);
    };

    return (
        <button onClick={handleClick} className={className}>
            {label}
        </button>
    );
}

/* ─────────────────────────────────────────────────────────
   앱 다운로드 — 플랫폼별 스토어 자동 연결
   ───────────────────────────────────────────────────────── */
function AppDownloadButton({ storeLabels }: { storeLabels: { ios: string; android: string; macos: string; windows: string; web: string } }) {
    type Platform = 'ios' | 'android' | 'macos' | 'windows' | 'web';
    const [platform, setPlatform] = React.useState<Platform>('web');

    React.useEffect(() => {
        const ua = navigator.userAgent;
        const platform = navigator.platform ?? '';
        if (/iPad|iPhone|iPod/.test(ua) && !/Macintosh/.test(ua)) {
            setPlatform('ios');
        } else if (/Android/.test(ua)) {
            setPlatform('android');
        } else if (/Mac/.test(platform) || /Macintosh/.test(ua)) {
            setPlatform('macos');
        } else if (/Win/.test(platform) || /Windows/.test(ua)) {
            setPlatform('windows');
        }
    }, []);

    const label = storeLabels[platform];

    return (
        <a href="/api/download" target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>
            {label}
        </a>
    );
}
