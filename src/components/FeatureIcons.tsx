'use client';

import styles from './FeatureIcons.module.css';

/* 1. 관계별 맞춤 질문 - 교대로 팝업하는 말풍선 */
export function IconChat() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            {/* 왼쪽 작은 말풍선 */}
            <g className={styles.bubble2}>
                <rect x="4" y="18" width="20" height="14" rx="6" fill="#BD0558" opacity="0.75" />
                <polygon points="10,32 6,38 16,32" fill="#BD0558" opacity="0.75" />
                <rect x="8" y="23" width="12" height="2" rx="1" fill="white" opacity="0.9" />
                <rect x="8" y="27" width="8" height="2" rx="1" fill="white" opacity="0.7" />
            </g>
            {/* 오른쪽 큰 말풍선 */}
            <g className={styles.bubble1}>
                <rect x="20" y="8" width="24" height="16" rx="6" fill="#7F28FF" />
                <polygon points="34,24 38,30 28,24" fill="#7F28FF" />
                <rect x="24" y="13" width="16" height="2" rx="1" fill="white" opacity="0.9" />
                <rect x="24" y="17" width="10" height="2" rx="1" fill="white" opacity="0.7" />
            </g>
        </svg>
    );
}

/* 2. 음성 문자 변환 - 마이크 + 사운드웨이브 */
export function IconVoice() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            {/* 사운드웨이브 (바깥) */}
            <circle cx="24" cy="24" r="18" stroke="#BD0558" strokeWidth="2" opacity="0.3"
                className={styles.wave2} />
            <circle cx="24" cy="24" r="13" stroke="#BD0558" strokeWidth="2" opacity="0.45"
                className={styles.wave1} />
            {/* 마이크 */}
            <g className={styles.micGroup}>
                <rect x="19" y="10" width="10" height="18" rx="5" fill="#BD0558" />
                <path d="M14 26c0 5.5 4.5 10 10 10s10-4.5 10-10" stroke="#7F28FF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <line x1="24" y1="36" x2="24" y2="42" stroke="#7F28FF" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="20" y1="42" x2="28" y2="42" stroke="#7F28FF" strokeWidth="2.5" strokeLinecap="round" />
            </g>
        </svg>
    );
}

/* 3. 미니게임 - 게임패드 wiggle */
export function IconGame() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={styles.controller}>
            {/* 패드 바디 */}
            <rect x="6" y="17" width="36" height="20" rx="10" fill="#430887" />
            {/* 왼쪽 십자키 */}
            <rect x="13" y="24" width="8" height="2.5" rx="1.25" fill="white" opacity="0.85" />
            <rect x="15.75" y="21.5" width="2.5" height="8" rx="1.25" fill="white" opacity="0.85" />
            {/* 오른쪽 버튼들 */}
            <circle cx="33" cy="24" r="2.2" fill="#FF4D8D" />
            <circle cx="28.5" cy="27.5" r="2.2" fill="#FFB800" />
            <circle cx="33" cy="31" r="2.2" fill="#22C55E" />
            {/* 손잡이 */}
            <ellipse cx="14" cy="36" rx="6" ry="4" fill="#300660" />
            <ellipse cx="34" cy="36" rx="6" ry="4" fill="#300660" />
        </svg>
    );
}

/* 4. 다국어 지원 - 지구본 맥동 */
export function IconGlobe() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="18" stroke="#BD0558" strokeWidth="2" />
            {/* 경도/위도선 */}
            <g className={styles.globeLines}>
                <ellipse cx="24" cy="24" rx="8" ry="18" stroke="#7F28FF" strokeWidth="1.5" fill="none" />
                <ellipse cx="24" cy="24" rx="14" ry="18" stroke="#BD0558" strokeWidth="1" fill="none" opacity="0.5" />
            </g>
            <line x1="6" y1="24" x2="42" y2="24" stroke="#BD0558" strokeWidth="1.5" opacity="0.6" />
            <ellipse cx="24" cy="24" rx="18" ry="6" stroke="#BD0558" strokeWidth="1" fill="none" opacity="0.4" />
            {/* 대륙 점 */}
            <circle cx="18" cy="20" r="3" fill="#7F28FF" opacity="0.7" />
            <circle cx="28" cy="19" r="4" fill="#7F28FF" opacity="0.7" />
            <circle cx="30" cy="29" r="2.5" fill="#BD0558" opacity="0.6" />
        </svg>
    );
}

/* 5. 커뮤니티 - 사람들과 하트 상승 */
export function IconCommunity() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            {/* 사람 3명 */}
            <circle cx="12" cy="22" r="5" fill="#BD0558" opacity="0.7" />
            <path d="M5 38c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="#BD0558" strokeWidth="2" fill="none" opacity="0.7" />
            <circle cx="24" cy="19" r="6" fill="#7F28FF" />
            <path d="M16 38c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#7F28FF" strokeWidth="2" fill="none" />
            <circle cx="36" cy="22" r="5" fill="#BD0558" opacity="0.7" />
            <path d="M29 38c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="#BD0558" strokeWidth="2" fill="none" opacity="0.7" />
            {/* 하트 상승 */}
            <text x="9" y="20" fontSize="9" className={styles.heartRise1}>❤️</text>
            <text x="21" y="16" fontSize="11" className={styles.heartRise2}>❤️</text>
            <text x="32" y="20" fontSize="9" className={styles.heartRise3}>❤️</text>
        </svg>
    );
}

/* 6. 빙고게임 기록 - 트로피 + 반짝임 */
export function IconTrophy() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={styles.trophy}>
            {/* 별 반짝이 A */}
            <g className={styles.starA}>
                <polygon points="38,6 39.5,9.5 43,10 40.5,12.5 41,16 38,14.5 35,16 35.5,12.5 33,10 36.5,9.5"
                    fill="#FFD700" />
            </g>
            {/* 별 반짝이 B */}
            <g className={styles.starB}>
                <polygon points="10,8 11,10.5 14,11 12,13 12.5,16 10,14.5 7.5,16 8,13 6,11 9,10.5"
                    fill="#FFB800" opacity="0.8" />
            </g>
            {/* 트로피 컵 */}
            <path d="M16 8h16v16c0 5-3.6 9-8 9s-8-4-8-9V8z" fill="#FFD700" />
            <path d="M16 12c-4 0-6 2-6 5s2 5 6 5" stroke="#FFA500" strokeWidth="2" fill="none" />
            <path d="M32 12c4 0 6 2 6 5s-2 5-6 5" stroke="#FFA500" strokeWidth="2" fill="none" />
            <rect x="20" y="33" width="8" height="4" fill="#FFA500" />
            <rect x="16" y="37" width="16" height="3" rx="1.5" fill="#FFD700" />
            <polygon points="24,13 25.5,17 29,17 26.5,19.5 27.5,23 24,21 20.5,23 21.5,19.5 19,17 22.5,17"
                fill="white" opacity="0.5" />
        </svg>
    );
}
