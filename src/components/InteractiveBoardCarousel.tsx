'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './InteractiveBoardCarousel.module.css';
import { useTranslation } from '@/lib/i18n';

const CAROUSEL_COLORS = ['#FF4D8D', '#A855F7', '#3B82F6', '#F59E0B', '#7F28FF', '#10B981', '#EF4444', '#F97316', '#06B6D4', '#06B6D4', '#EC4899'];
const CAROUSEL_SRCS = [
    '/images/carousel/IMG_1.png',
    '/images/carousel/IMG_2.png',
    '/images/carousel/IMG_3.png',
    '/images/carousel/IMG_4.png',
    '/images/carousel/IMG_6_2.png',
    '/images/carousel/IMG_5.png',
    '/images/carousel/IMG_8.png',
    '/images/carousel/IMG_10_1.png',
    '/images/carousel/GAME_1.png',
    '/images/carousel/IMG_12.png',
    '/images/carousel/IMG_13.png',
];

export default function InteractiveBoardCarousel() {
    const t = useTranslation();
    const CAROUSEL_SCREENSHOTS = t.carousel.screens.map((s, i) => ({
        ...s,
        src: CAROUSEL_SRCS[i],
        color: CAROUSEL_COLORS[i],
    }));

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(375);
    const [splashKey, setSplashKey] = useState(0);
    const totalItems = CAROUSEL_SCREENSHOTS.length;

    useEffect(() => {
        const check = () => {
            setIsMobile(window.innerWidth <= 768);
            setViewportWidth(window.innerWidth);
        };
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleCardClick = useCallback((index: number) => {
        if (index !== currentIndex) {
            setCurrentIndex(index);
        } else {
            setCurrentIndex(prev => (prev + 1) % totalItems);
        }
        setSplashKey(k => k + 1);
    }, [currentIndex, totalItems]);

    const currentScreen = CAROUSEL_SCREENSHOTS[currentIndex];

    // 비율 기반 크기 계산
    const deckWidth = isMobile ? Math.round(Math.min(115, viewportWidth * 0.28)) : 196;
    const deckHeight = deckWidth * 2;
    const perspective = isMobile ? 1200 : 900;
    const maxRadius = isMobile ? Math.round(viewportWidth / 2 - deckWidth / 2 - 20) : 280;
    const radius = isMobile ? Math.min(Math.round(viewportWidth * 0.30), maxRadius) : 280;

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carouselTextLeft}>
                <h3 className={styles.carouselTitle} style={{ color: currentScreen.color }}>{currentScreen.title}</h3>
            </div>

            {/* 수평 3D 원통 캐러셀 */}
            <div
                className={styles.deck}
                style={isMobile ? {
                    width: `${deckWidth}px`,
                    height: `${deckHeight}px`,
                    perspective: `${perspective}px`,
                } : { perspective: `${perspective}px` }}
            >
                {CAROUSEL_SCREENSHOTS.map((screen, index) => {
                    let diff = index - currentIndex;
                    if (diff > totalItems / 2) diff -= totalItems;
                    else if (diff < -totalItems / 2) diff += totalItems;

                    const isCenter = diff === 0;
                    const theta = (360 / totalItems) * diff;
                    const distanceRatio = Math.abs(diff) / (totalItems / 2);
                    const opacity = Math.max(0, 1 - distanceRatio * 3.0);

                    let transform = `rotateY(${theta}deg) translateZ(${radius}px)`;
                    transform += isMobile
                        ? ` rotateX(-2deg) translateY(0px)`
                        : ` rotateX(-2deg) translateY(${Math.abs(diff) * -30}px)`;
                    if (isCenter) transform += isMobile ? ` scale(1.2) translateZ(80px)` : ` scale(1.2) translateZ(40px)`;

                    const zIndex = isCenter ? 9999 : 100 - Math.abs(diff) * 10;

                    return (
                        <div
                            key={isCenter ? `center-${splashKey}` : screen.src}
                            className={`${styles.card} ${isCenter ? styles.centerCard : ''}`}
                            style={{
                                transform,
                                zIndex,
                                opacity,
                                ...(isCenter ? { '--glow-color': currentScreen.color } as React.CSSProperties : {}),
                            }}
                            onClick={() => handleCardClick(index)}
                        >
                            <Image
                                src={screen.src}
                                alt={screen.label}
                                width={320}
                                height={640}
                                className={styles.cardImage}
                                priority={isCenter || Math.abs(diff) === 1}
                            />
                            {isCenter && (
                                <div className={styles.interactionHint}>
                                    <span className={styles.hintClick}>CLICK</span>
                                    <svg className={styles.hintArrow} width="40" height="14" viewBox="0 0 40 14" fill="none">
                                        <path d="M2 12 L20 3 L38 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className={styles.hintText}>{t.carousel.hintText}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className={styles.carouselTextRight}>
                <p className={styles.carouselDesc}>
                    {currentScreen.desc.split(',').map((part, i, arr) => (
                        <span key={i}>{part.trim()}{i < arr.length - 1 ? ',' : ''}{i < arr.length - 1 && <br />}</span>
                    ))}
                </p>
            </div>
            <div className={styles.carouselTextMobile}>
                <h3 className={styles.mobileTitle} style={{ color: currentScreen.color }}>{currentScreen.title}</h3>
                <p className={styles.mobileDesc}>
                    {currentScreen.desc.split(',').map((part, i, arr) => (
                        <span key={i}>{part.trim()}{i < arr.length - 1 ? ',' : ''}{i < arr.length - 1 && <br />}</span>
                    ))}
                </p>
            </div>

        </div>
    );
}
