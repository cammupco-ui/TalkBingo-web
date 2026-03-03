'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './InteractiveCardHero.module.css';

interface BalanceCard { type: 'balance'; question: string; choiceA: string; choiceB: string; emoji: string; preview: string; }
interface TruthCard { type: 'truth'; question: string; emoji: string; preview: string; }
type CardData = BalanceCard | TruthCard;

const CARDS: CardData[] = [
    { type: 'balance', question: '더 선호하는 취미는?', choiceA: '만들기', choiceB: '스포츠', emoji: '🎨', preview: '만들기 vs 스포츠' },
    { type: 'balance', question: '내 탕수육 취향은?', choiceA: '찍먹', choiceB: '부먹', emoji: '🍖', preview: '찍먹 vs 부먹' },
    { type: 'balance', question: '더 끌리는 쪽은?', choiceA: '분석파', choiceB: '직관파', emoji: '🤔', preview: '분석 vs 직관' },
    { type: 'balance', question: '가고 싶은 여름 여행은?', choiceA: '산', choiceB: '바다', emoji: '🏖️', preview: '산 vs 바다' },
    { type: 'truth', question: '지금 가장 보고 싶은것은?', emoji: '👀', preview: '보고 싶은 것' },
    { type: 'truth', question: '생일날, 받고 싶은 것은?', emoji: '🎁', preview: '생일 선물' },
    { type: 'truth', question: '최근 가장 즐거웠을 때는?', emoji: '😄', preview: '가장 즐거운 때' },
    { type: 'truth', question: '올해 연말 계획은?', emoji: '🗓️', preview: '연말 계획' },
];

const CIRCLE_POSITIONS = Array.from({ length: 8 }).map((_, i) => {
    const angleDeg = (i * 45) - 90;
    const angleRad = angleDeg * (Math.PI / 180);
    const radiusX = 480; const radiusY = 360;
    return { xPx: Math.cos(angleRad) * radiusX, yPx: Math.sin(angleRad) * radiusY, rot: angleDeg + 90, depth: (i % 2 === 0) ? -0.1 : 0.15, scale: 1.0 };
});

const FAN_POSITIONS = Array.from({ length: 8 }).map((_, i) => {
    const angleDeg = -120 + (240 / 9) * (i + 1);
    const angleRad = (angleDeg - 90) * (Math.PI / 180);
    const radius = 340;
    return { xPx: Math.cos(angleRad) * radius, yPx: Math.sin(angleRad) * radius, rot: angleDeg, depth: 0, scale: 0.85 };
});

type AnimPhase = 'scatter' | 'orbit' | 'fan' | 'done';

export default function InteractiveCardHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [animPhase, setAnimPhase] = useState<AnimPhase>('scatter');
    const [orbitAngle, setOrbitAngle] = useState(0);
    const orbitRafRef = useRef<number>(0);
    const [showCoreMessage, setShowCoreMessage] = useState(false);
    const [showCoreLine2, setShowCoreLine2] = useState(false);
    const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);
    const lastSelectedRef = useRef<number | null>(null);
    if (selectedCardIdx !== null) { lastSelectedRef.current = selectedCardIdx; }
    const [animatingOutIdx, setAnimatingOutIdx] = useState<number | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isFrozenRef = useRef(false);
    isFrozenRef.current = selectedCardIdx !== null || animatingOutIdx !== null;

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
        return () => { window.removeEventListener('resize', check); clearTimeout(timer); };
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        const orbitTimer = setTimeout(() => { setAnimPhase('orbit'); }, 8000);
        const fanTimer = setTimeout(() => { setAnimPhase('fan'); }, 10000);
        const doneTimer = setTimeout(() => { setAnimPhase('done'); setShowCoreMessage(true); }, 12000);
        const line2Timer = setTimeout(() => { setShowCoreLine2(true); }, 13200);
        return () => { clearTimeout(orbitTimer); clearTimeout(fanTimer); clearTimeout(doneTimer); clearTimeout(line2Timer); };
    }, [isMounted]);

    useEffect(() => {
        if (animPhase !== 'orbit') { cancelAnimationFrame(orbitRafRef.current); return; }
        const startTime = performance.now();
        const duration = 2000;
        const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            setOrbitAngle(eased * 360);
            if (progress < 1) { orbitRafRef.current = requestAnimationFrame(animate); }
        };
        orbitRafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(orbitRafRef.current);
    }, [animPhase]);

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
                setOffset((prev) => ({ x: prev.x + (dx * 120 - prev.x) * 0.08, y: prev.y + (dy * 75 - prev.y) * 0.08 }));
            }
            rafRef.current = requestAnimationFrame(updateOffset);
        };
        rafRef.current = requestAnimationFrame(updateOffset);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    const handlePointerMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        const point = 'touches' in e ? e.touches[0] : e;
        mouseRef.current = { x: point.clientX, y: point.clientY };
    }, []);

    const visibleCards = isMobile ? CARDS.slice(0, 8) : CARDS;
    const bgStyle = { transform: `translate(calc(-50% + ${isMobile ? 0 : offset.x * -0.05}px), calc(-50% + ${isMobile ? 0 : offset.y * -0.05}px))` };

    return (
        <section className={styles.heroSection} onMouseMove={handlePointerMove} onTouchMove={handlePointerMove} ref={containerRef}>
            <div className={styles.heroBackground} style={bgStyle} />
            <div className={styles.cardContainer}>
                <div className={`${styles.dimOverlay} ${selectedCardIdx !== null ? styles.dimActive : ''}`} onClick={() => handleSelectCard(null)} />
                <div className={styles.scatterWrapper}>
                    <div className={styles.centerTypography} style={{ opacity: isMounted ? 1 : 0, top: '40%', transform: `translate(-50%, -50%) translate(${offset.x * 0.05}px, ${offset.y * 0.05}px)` }}>
                        <h1 className={`${styles.mainTitle} ${animatingOutIdx !== null ? styles.headlineHidden : ''}`}>
                            <div className={styles.weText}>우리</div>
                            <div className={styles.bingoRow}><span className={styles.bingoHighlight}>BINGO</span></div>
                            <div className={styles.playText}>한판 할까?</div>
                        </h1>
                    </div>
                    <div className={styles.subTitlesRow} style={{ opacity: isMounted ? 1 : 0 }}>
                        <p>Balance QUIZ</p>
                        <span className={styles.dotSeparator}>•</span>
                        <p>Truth QUIZ</p>
                        <span className={styles.dotSeparator}>•</span>
                        <p className={styles.miniGame}>Mini GAME</p>
                    </div>
                    {visibleCards.map((card, i) => {
                        const scatterPos = CIRCLE_POSITIONS[i % CIRCLE_POSITIONS.length];
                        const fanPos = FAN_POSITIONS[i % FAN_POSITIONS.length];
                        const isSelected = selectedCardIdx === i;
                        const isAnimatingOut = animatingOutIdx === i;
                        let pos = scatterPos;
                        let currentTransform: string;
                        let currentTransition = 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s';
                        const mobileScale = isMobile ? 0.45 : 1;
                        const mobileCardScale = isMobile ? 0.6 : 1;
                        if (animPhase === 'orbit') {
                            const baseAngle = (i * 45) - 90;
                            const currentAngle = baseAngle + orbitAngle;
                            const angleRad = currentAngle * (Math.PI / 180);
                            const orbitRadius = 350 * mobileScale;
                            const xPx = Math.cos(angleRad) * orbitRadius;
                            const yPx = Math.sin(angleRad) * orbitRadius;
                            currentTransform = `translate(calc(-50% + ${xPx}px), calc(-50% + ${yPx}px)) rotate(${currentAngle + 90}deg) scale(${0.9 * mobileCardScale})`;
                            currentTransition = 'none';
                        } else if (animPhase === 'fan' || animPhase === 'done') {
                            pos = fanPos;
                            currentTransform = `translate(calc(-50% + ${pos.xPx * mobileScale}px), calc(-50% + ${pos.yPx * mobileScale}px)) rotate(${pos.rot}deg) scale(${pos.scale * mobileCardScale})`;
                            currentTransition = 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s';
                        } else {
                            currentTransform = `translate(calc(-50% + ${pos.xPx * mobileScale}px), calc(-50% + ${pos.yPx * mobileScale}px)) rotate(${pos.rot}deg) scale(${pos.scale * mobileCardScale})`;
                        }
                        const cardStyle: React.CSSProperties = isSelected ? { left: isMobile ? '50%' : '35%', top: isMobile ? '30%' : '50%', transform: `translate(-50%, -50%) rotate(0deg) scale(${isMobile ? 1.5 : 2.6})`, zIndex: 999, cursor: 'default', transitionDelay: '0s', opacity: 1, transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s' } : { left: '50%', top: '40%', transform: currentTransform, opacity: isMounted ? 1 : 0, zIndex: isAnimatingOut ? 999 : (Math.round(pos.depth * 10) + 10), cursor: animPhase === 'done' ? 'pointer' : 'default', transition: currentTransition, transitionDelay: (animPhase === 'scatter' && !(!isMounted || animatingOutIdx !== null)) ? `${2.5 + i * 0.3}s` : '0s' };
                        const isSelectedStatus = isSelected || isAnimatingOut;
                        const parallaxTransform = isSelectedStatus ? `translate(0px, 0px)` : `translate(${isMobile ? 0 : offset.x * pos.depth * 5}px, ${isMobile ? 0 : offset.y * pos.depth * 5}px)`;
                        return (
                            <div key={i} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transform: parallaxTransform, zIndex: isSelectedStatus ? 999 : (Math.round(pos.depth * 10) + 10) }}>
                                <div className={`${styles.card} ${card.type === 'balance' ? styles.balanceCard : styles.truthCard} ${isSelectedStatus ? styles.selectedCard : ''}`} style={{ ...cardStyle, pointerEvents: 'auto' }} onClick={(e) => { e.stopPropagation(); handleSelectCard(isSelected ? null : i); }}>
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
                    <div className={`${styles.messageOverlay} ${selectedCardIdx !== null ? styles.messageActive : ''}`} onClick={() => handleSelectCard(null)}>
                        {lastSelectedRef.current !== null && (
                            <div className={styles.messageContent}>
                                {CARDS[lastSelectedRef.current].type === 'balance' ? (
                                    <><h3 className={styles.kickMessageBalance}>두 가지 선택, 하나의 진짜 대화</h3><p className={styles.emotionMessage}>왜 그걸 골랐는지 설명하는 순간,<br />우리는 서로를 더 잘 이해하게 됩니다.</p></>
                                ) : (
                                    <><h3 className={styles.kickMessageTruth}>하나의 질문, 진짜 나의 이야기</h3><p className={styles.emotionMessage}>솔직한 한마디를 꺼내는 순간,<br />대화는 더 깊어집니다.</p></>
                                )}
                            </div>
                        )}
                    </div>
                    <div className={styles.coreMessage}>
                        <p className={`${styles.coreMessageLine} ${showCoreMessage ? styles.coreLineVisible : ''}`}>대화하며 서로 알아가는</p>
                        <p className={`${styles.coreMessageLine} ${styles.coreMessageLine2} ${showCoreLine2 ? styles.coreLineVisible : ''}`}>밸런스 빙고게임</p>
                    </div>
                </div>
            </div>
            <div className={styles.scrollDown}><span>스크롤</span><div className={styles.scrollArrow} /></div>
        </section>
    );
}
