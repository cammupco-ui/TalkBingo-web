'use client';

import React from 'react';
import styles from '@/app/page.module.css';
import { useTranslation } from '@/lib/i18n';
import { getStoreUrl } from '@/lib/storeRedirect';

type Platform = 'ios' | 'android' | 'macos' | 'windows' | 'web';

const STORE_HREFS: Record<Platform, string> = {
    ios: 'https://apps.apple.com/app/id6759347728',
    android: 'https://play.google.com/store/apps/details?id=com.talkbingo.app',
    macos: 'https://apps.apple.com/app/id6759347728',
    windows: 'https://www.microsoft.com/store/search/talkbingo',
    web: 'https://play.google.com/store/apps/details?id=com.talkbingo.app',
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

    const href = STORE_HREFS[platform];

    // 빙고게임 하러가기: 데스크탑은 Flutter 웹 게임으로, 모바일은 앱 딥링크 시도 후 스토어 폴백
    const handleBingoClick = (e: React.MouseEvent) => {
        e.preventDefault();

        const isDesktop = !(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
        if (isDesktop) {
            window.location.href = '/app.html';
            return;
        }

        const start = Date.now();
        window.location.href = 'talkbingo://';

        setTimeout(() => {
            if (!document.hidden && Date.now() - start < 2000) {
                // 모바일에서 팝업 차단 방지를 위해 현재 창 이동 사용
                window.location.href = getStoreUrl();
            }
        }, 1200);
    };

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
            {/* 스토어 다운로드 — 클라이언트에서 platform 감지 후 직링크 */}
            <a
                href={getStoreUrl(platform)}
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
