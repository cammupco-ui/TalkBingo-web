'use client';

import React from 'react';
import styles from '@/app/page.module.css';
import { useTranslation } from '@/lib/i18n';

type Platform = 'ios' | 'android' | 'macos' | 'windows' | 'web';

const STORE_HREFS: Record<Platform, string> = {
    ios: 'https://apps.apple.com/app/talkbingo/id6740272133',
    android: 'https://play.google.com/store/apps/details?id=com.cammupco.talkbingo',
    macos: 'https://apps.apple.com/app/talkbingo/id6740272133',
    windows: 'https://www.microsoft.com/store/search/talkbingo',
    web: 'https://play.google.com/store/apps/details?id=com.cammupco.talkbingo',
};

const STORE_SUBS: Record<Platform, string> = {
    ios: 'DOWNLOAD ON THE',
    android: 'GET IT ON',
    macos: 'DOWNLOAD ON THE',
    windows: 'GET IT ON',
    web: 'GET IT ON',
};

const STORE_LABELS: Record<Platform, string> = {
    ios: 'App Store',
    android: 'Google Play',
    macos: 'Mac App Store',
    windows: 'Microsoft Store',
    web: 'Google Play',
};

export default function DownloadButtons() {
    const t = useTranslation();
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

    // 빙고게임 하러가기: 앱 커스텀 스킴 시도 → 1.2s 후 미설치면 웹 폴백
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

    const href = STORE_HREFS[platform];
    const sub = STORE_SUBS[platform];
    const label = STORE_LABELS[platform];

    return (
        <div className={styles.downloadButtons}>
            {/* Play Now — 앱 우선 딥링크 */}
            <button
                onClick={handleBingoClick}
                className={`${styles.storeBadge} ${styles.storeBadgePrimary}`}
            >
                <div>
                    <div className={styles.storeBadgeLabel}>{t.download.playNow}</div>
                    <div className={styles.storeBadgeName}>{t.download.bingoGame}</div>
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
