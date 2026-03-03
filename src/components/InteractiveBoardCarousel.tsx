'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './InteractiveBoardCarousel.module.css';

const CAROUSEL_SCREENSHOTS = [
    { src: '/images/carousel/IMG_1.png', label: '홈 화면', title: '메인홈', desc: '\"새 게임\"을 누르고, 대화하고 싶은 사람을 부르세요', color: '#FF4D8D' },
    { src: '/images/carousel/IMG_2.png', label: '게임 설정', title: '빙고 보드', desc: '5x5보드. 25칸을 가진 빙고 입니다', color: '#A855F7' },
    { src: '/images/carousel/IMG_3.png', label: '빙고 보드', title: '빙고 셀', desc: '한칸을 눌러서 빙고를 시작하세요', color: '#3B82F6' },
    { src: '/images/carousel/IMG_4.png', label: '게임 진행', title: '밸런스 퀴즈', desc: '두 선택지 중에 더 마음에 드는 것을 고른 후, 상대방에게 이유를 알려주세요', color: '#F59E0B' },
    { src: '/images/carousel/IMG_6_2.png', label: '밸런스 게임', title: '진실게임 퀴즈', desc: '나의 생각을 입력하고, 상대방에게 설명해 주세요', color: '#7F28FF' },
    { src: '/images/carousel/IMG_5.png', label: '실시간 채팅', title: '공감 받기', desc: '상대방에게 공감을 받으면, \"빙고 셀\"을 획득 할 수 있습니다', color: '#10B981' },
    { src: '/images/carousel/IMG_8.png', label: '결과 화면', title: '비공감', desc: '상대방에게 공감을 얻지 못하면, 3턴 뒤에 \"미니게임\"에서 승리하고, 빙고셀을 다시 획득하세요', color: '#EF4444' },
    { src: '/images/carousel/IMG_12.png', label: '마이 페이지', title: '빙고라인', desc: '최대3줄 까지 빙고라인을 만드실 수 있어요', color: '#06B6D4' },
    { src: '/images/carousel/IMG_13.png', label: '초대 화면', title: '게임종료', desc: '빙고라인 한줄 마다, \"게임 지속 여부\"를 결정 하실 수 있어요', color: '#EC4899' },
];

export default function InteractiveBoardCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalItems = CAROUSEL_SCREENSHOTS.length;

    const handleCardClick = (index: number) => {
        if (index !== currentIndex) {
            setCurrentIndex(index);
        } else {
            setCurrentIndex((prev) => (prev + 1) % totalItems);
        }
    };

    const currentScreen = CAROUSEL_SCREENSHOTS[currentIndex];

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carouselTextLeft}>
                <h3 className={styles.carouselTitle} style={{ color: currentScreen.color }}>{currentScreen.title}</h3>
            </div>
            <div className={styles.deck}>
                {CAROUSEL_SCREENSHOTS.map((screen, index) => {
                    let diff = index - currentIndex;
                    if (diff > totalItems / 2) { diff -= totalItems; } else if (diff < -totalItems / 2) { diff += totalItems; }
                    const isCenter = diff === 0;
                    const theta = (360 / totalItems) * diff;
                    const radius = 266;
                    const distanceRatio = Math.abs(diff) / (totalItems / 2);
                    const opacity = Math.max(0, 1 - distanceRatio * 3.0);
                    let transform = `rotateY(${theta}deg) translateZ(${radius}px)`;
                    transform += ` rotateX(-2deg) translateY(${Math.abs(diff) * 10}px)`;
                    if (isCenter) { transform += ` scale(1.2)`; }
                    const zIndex = 100 - Math.abs(diff) * 10;
                    return (
                        <div key={screen.src} className={`${styles.card} ${isCenter ? styles.centerCard : ''}`} style={{ transform, zIndex, opacity }} onClick={() => handleCardClick(index)}>
                            <Image src={screen.src} alt={screen.label} width={320} height={640} className={styles.cardImage} priority={isCenter || Math.abs(diff) === 1} />
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
