'use client';

import React from 'react';
import styles from '@/app/page.module.css';

type Platform = 'ios' | 'android' | 'macos' | 'windows' | 'web';

const STORE: Record<Platform, { href: string; label: string; sub: string }> = {
    ios: { href: 'https://apps.apple.com/app/talkbingo/id6740272133', label: 'App Store', sub: 'DOWNLOAD ON THE' },
    android: { href: 'https://play.google.com/store/apps/details?id=com.cammupco.talkbingo', label: 'Google Play', sub: 'GET IT ON' },
    macos: { href: 'https://apps.apple.com/app/talkbingo/id6740272133', label: 'Mac App Store', sub: 'DOWNLOAD ON THE' },
    windows: { href: 'https://www.microsoft.com/store/search/talkbingo', label: 'Microsoft Store', sub: 'GET IT ON' },
    web: { href: 'https://play.google.com/store/apps/details?id=com.cammupco.talkbingo', label: 'Google Play', sub: 'GET IT ON' },
};

export default function DownloadButtons() {
    const [platform, setPlatform] = React.useState<Platform>('web');

    React.useEffect(() => {
        const ua = navigator.userAgent;
        const plat = navigator.platform ?? '';
        if (/iPad|iPhone|iPod/.test(ua) && !/Macintosh/.test(ua)) {
            setPlatform('ios');
        } else if (/Android/.test(ua)) {
            setPlatform('android');
        } else if (/Mac/.test(plat) || /Macintosh/.test(ua)) {
            setPlatform('macos');
        } else if (/Win/.test(plat) || /Windows/.test(ua)) {
            setPlatform('windows');
        }
    }, []);

    // "빙고게임 하러가기": 앱 커스텀 스킴 시도 → 1.2s 후 미설치면 웹 폴백
    const handleBingoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const start = Date.now();
        window.location.href = 'talkbingo://';
        setTimeout(() => {
            if (!document.hidden && Date.now() - start < 2000) {
                window.open('https://talkbingo.app', '_blank', 'noopener,noreferrer');
            }
        }, 1200);
    };

    const { href, label, sub } = STORE[platform];

    return (
        <div className={styles.downloadButtons}>
            {/* 빙고게임 하러가기 — 앱 우선 딥링크 */}
            <button
                onClick={handleBingoClick}
                className={`${styles.storeBadge} ${styles.storeBadgePrimary}`}
            >
                <div>
                    <div className={styles.storeBadgeLabel}>PLAY NOW</div>
                    <div className={styles.storeBadgeName}>빙고게임 하러가기</div>
                </div>
            </button>
            {/* 스토어 다운로드 — 플랫폼 자동 감지 */}
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.storeBadge} ${styles.storeBadgeSecondary}`}
            >
                <div>
                    <div className={styles.storeBadgeLabel}>{sub}</div>
                    <div className={styles.storeBadgeName}>{label}</div>
                </div>
            </a>
        </div>
    );
}
