'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './InteractiveBoardCarousel.module.css';

const CAROUSEL_SCREENSHOTS = [
    { src: '/images/carousel/IMG_1.png', label: '홈 화면', title: '메인홈', desc: '"새 게임"을 누르고, 대화하고 싶은 사람을 부르세요', color: '#FF4D8D' },
    { src: '/images/carousel/IMG_2.png', label: '게임 설정', title: '빙고 보드', desc: '5x5보드. 25칸을 가진 빙고 입니다', color: '#A855F7' },
    { src: '/images/carousel/IMG_3.png', label: '빙고 보드', title: '빙고 셀', desc: '한칸을 눌러서 빙고를 시작하세요', color: '#3B82F6' },
    { src: '/images/carousel/IMG_4.png', label: '게임 진행', title: '밸런스 퀴즈', desc: '두 선택지 중에 더 마음에 드는 것을 고른 후, 상대방에게 이유를 알려주세요', color: '#F59E0B' },
    { src: '/images/carousel/IMG_6_2.png', label: '밸런스 게임', title: '진실게임 퀴즈', desc: '나의 생각을 입력하고, 상대방에게 설명해 주세요', color: '#7F28FF' },
    { src: '/images/carousel/IMG_5.png', label: '실시간 채팅', title: '공감 받기', desc: '상대방에게 공감을 받으면, "빙고 셀"을 획득 할 수 있습니다', color: '#10B981' },
    { src: '/images/carousel/IMG_8.png', label: '결과 화면', title: '비공감', desc: '상대방에게 공감을 얻지 못하면, 3턴 뒤에 "미니게임"에서 승리하고, 빙고셀을 다시 획득하세요', color: '#EF4444' },
    { src: '/images/carousel/IMG_10_1.png', label: '상대방 셀 뺏기', title: '상대방 셀 뺏기', desc: '빙고를 완성하기 위해 상대방셀에 도전하세요', color: '#F97316' },
    { src: '/images/carousel/GAME_1.png', label: '미니게임', title: '미니게임', desc: '당신의 도전을 위해 다양한 미니게임이 있습니다, 최대한 많은 점수를 획득하세요', color: '#06B6D4' },
    { src: '/images/carousel/IMG_12.png', label: '마이 페이지', title: '빙고라인', desc: '최대3줄 까지 빙고라인을 만드실 수 있어요', color: '#06B6D4' },
    { src: '/images/carousel/IMG_13.png', label: '초대 화면', title: '게임종료', desc: '빙고라인 한줄 마다, "게임 지속 여부"를 결정 하실 수 있어요', color: '#EC4899' },
];

/** 각도 간격 (카드 1개당 몇 도 벌어지는지) */
const ANGLE_STEP = 14; // degrees per card
/** 최대 몇 장까지 보여줄지 (양쪽) */
const MAX_VISIBLE = 3;

export default function InteractiveBoardCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(375);
    // splashKey: currentIndex 변경마다 새 key → CSS animation 재실행
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
            setSplashKey(k => k + 1);
        } else {
            const next = (currentIndex + 1) % totalItems;
            setCurrentIndex(next);
            setSplashKey(k => k + 1);
        }
    }, [currentIndex, totalItems]);

    const currentScreen = CAROUSEL_SCREENSHOTS[currentIndex];

    // 카드 / 팬 크기
    const cardW = isMobile ? Math.round(Math.min(110, viewportWidth * 0.26)) : 180;
    const cardH = cardW * 2;
    // 팬 컨테이너 높이 = 중앙 카드 높이 + 상단 여백
    const fanH = cardH + 32;

    return (
        <div className={styles.carouselContainer}>
            {/* 데스크탑 왼쪽 텍스트 */}
            <div className={styles.carouselTextLeft}>
                <h3 className={styles.carouselTitle} style={{ color: currentScreen.color }}>
                    {currentScreen.title}
                </h3>
            </div>

            {/* ── Fan 컨테이너 ── */}
            <div
                className={styles.fanWrapper}
                style={{ height: `${fanH}px` }}
            >
                {CAROUSEL_SCREENSHOTS.map((screen, index) => {
                    let diff = index - currentIndex;
                    if (diff > totalItems / 2) diff -= totalItems;
                    if (diff < -totalItems / 2) diff += totalItems;

                    const isCenter = diff === 0;
                    const absDiff = Math.abs(diff);
                    if (absDiff > MAX_VISIBLE) return null;

                    // 불투명도: 중앙 1.0, ±1 0.75, ±2 0.45, ±3 0.2
                    const opacity = isCenter ? 1 : Math.max(0.1, 1 - absDiff * 0.28);
                    const zIndex = isCenter ? 50 : 40 - absDiff * 10;

                    // ── 팬 카드: 하단 중심축(transform-origin: 50% 100%)으로 회전
                    //   카드 한 면이 중심을 향하는 방사형 배치
                    let transform: string;
                    if (isCenter) {
                        // 중앙 카드: 팬 컨테이너 상단 중앙에 위치 + scale
                        transform = `translateX(-50%) translateY(0px) scale(1.12)`;
                    } else {
                        const angle = diff * ANGLE_STEP;
                        // 먼저 하단 위치(bottom:0)로 배치 후 rotate → 팬 효과
                        transform = `translateX(-50%) rotate(${angle}deg)`;
                    }

                    return (
                        <div
                            key={screen.src}
                            // 중앙 카드에 splashKey 붙여 애니메이션 재시작
                            {...(isCenter ? { 'data-splash-key': splashKey } : {})}
                            className={`${styles.fanCard} ${isCenter ? styles.fanCenter : ''}`}
                            style={{
                                width: `${cardW}px`,
                                height: `${cardH}px`,
                                opacity,
                                zIndex,
                                transform,
                                // 팬 회전축: 카드 하단 중앙
                                transformOrigin: isCenter ? '50% 100%' : '50% 100%',
                                // 중앙 카드 glow 색상
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
                                priority={isCenter || absDiff === 1}
                            />
                        </div>
                    );
                })}
            </div>

            {/* 데스크탑 오른쪽 설명 */}
            <div className={styles.carouselTextRight}>
                <p className={styles.carouselDesc}>
                    {currentScreen.desc.split(',').map((part, i, arr) => (
                        <span key={i}>{part.trim()}{i < arr.length - 1 ? ',' : ''}{i < arr.length - 1 && <br />}</span>
                    ))}
                </p>
            </div>

            {/* 모바일 제목 + 설명 */}
            <div className={styles.carouselTextMobile}>
                <h3 className={styles.mobileTitle} style={{ color: currentScreen.color }}>
                    {currentScreen.title}
                </h3>
                <p className={styles.mobileDesc}>
                    {currentScreen.desc.split(',').map((part, i, arr) => (
                        <span key={i}>{part.trim()}{i < arr.length - 1 ? ',' : ''}{i < arr.length - 1 && <br />}</span>
                    ))}
                </p>
            </div>

            {/* 인터랙션 힌트 */}
            <div className={styles.interactionHint}>
                <span className={styles.hintClick}>CLICK</span>
                <svg className={styles.hintArrow} width="40" height="14" viewBox="0 0 40 14" fill="none">
                    <path d="M2 12 L20 3 L38 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className={styles.hintText}>게임화면 미리보기</span>
            </div>
        </div>
    );
}
