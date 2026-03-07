'use client';

import Image from 'next/image';
import styles from './page.module.css';
import InteractiveCardHero from '@/components/InteractiveCardHero';
import InteractiveBoardCarousel from '@/components/InteractiveBoardCarousel';
import ChatReveal from '@/components/ChatReveal';
import WhenToUseSection from '@/components/WhenToUseSection';
import { IconChat, IconVoice, IconGame, IconGlobe, IconCommunity, IconTrophy } from '@/components/FeatureIcons';
import DownloadButtons from '@/components/DownloadButtons';
import { useTranslation } from '@/lib/i18n';

const FEATURE_ICONS = [IconChat, IconVoice, IconGame, IconGlobe, IconCommunity, IconTrophy];

export default function Home() {
  const t = useTranslation();
  const chatLines = t.chat.title.split('\n');
  const downloadLines = t.downloadSection.title.split('\n');

  return (
    <>
      <InteractiveCardHero />

      {/* ===== PREVIEW + 캐러셀 (단일 섹션으로 통합 — 레이어 충돌 방지) ===== */}
      <section className={styles.previewSection}>
        <p className={styles.previewBingoEyebrow}>PREVIEW</p>
        <div className={styles.bingoContainer}>
          <div className={styles.bingoCarouselWrapper}>
            <InteractiveBoardCarousel />
          </div>
        </div>
      </section>

      <section className={styles.chatSection}>
        <div className={styles.bottomCurve}>
          <svg viewBox="0 0 1280 173" preserveAspectRatio="none">
            <defs>
              <linearGradient id="btmCenterFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000000" stopOpacity="1" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="1280" height="173" fill="#f4efff" />
            <rect x="440" y="0" width="400" height="60" fill="url(#btmCenterFade)" />
            <path d="M540 0 C540 95.55 302.232 173 0 173 V0 H540 Z" fill="#000000" />
            <path d="M740 0 C740 95.55 977.768 173 1280 173 V0 H740 Z" fill="#000000" />
          </svg>
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chatLayout}>
            <div className={`${styles.chatChar} ${styles.charLeft}`}>
              <Image src="/images/characters/Gemini_Generated_Image_em3u2yem3u2yem3u.jpeg" alt="Boy Character" width={280} height={380} className={styles.charImage} />
            </div>
            <ChatReveal />
            <div className={`${styles.chatChar} ${styles.charRight}`}>
              <Image src="/images/characters/chat_girl_right.png" alt="Girl Character" width={280} height={380} className={`${styles.charImage} ${styles.charImageFlipped}`} />
            </div>
          </div>
          <div className={styles.chatTextContent}>
            <h2 className={styles.chatTitle}>
              {chatLines[0]}
              {chatLines.length > 1 && <><br />{chatLines[1]}</>}
              {chatLines.length > 2 && <><br className={styles.mobileBreak} />{' '}{chatLines[2]}</>}
            </h2>
            <p className={styles.chatDesc}>{t.chat.desc}</p>
          </div>
        </div>
      </section>


      <WhenToUseSection />

      {/* ===== SVG 전환 프레임 ===== */}
      <div className={styles.waveDivider}>
        <svg
          viewBox="0 990 1280 344"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.waveSvg}
        >
          <defs>
            <linearGradient id="bgGrad" x1="0" y1="990" x2="0" y2="1334" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="#F4E7E8" />
            </linearGradient>
          </defs>
          <path d="M0 990H1280V1334H0V990Z" fill="url(#bgGrad)" />
          <path d="M740 1334C740 1238.45 977.768 1011 1280 1011V1334H740Z" fill="#F4E7E8" />
          <path d="M540 1334C540 1238.45 302.232 1011 0 1011V1334H540Z" fill="#F4E7E8" />
        </svg>
      </div>

      {/* ===== SPECIAL FEATURE ===== */}
      <section className={styles.specialFeatures}>
        <div className="container">
          <h2 className={styles.specialFeatureTitle}>{t.features.title}</h2>
          <div className={styles.featureGrid}>
            {t.features.items.map((item, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <div key={i} className={`card ${styles.featureCard}`}>
                  <div className={styles.featureIcon}><Icon /></div>
                  <h3 className={styles.featureTitle}>{item.title}</h3>
                  <p className={styles.featureDesc}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.download}>
        <div className="container">
          <h2 className={styles.downloadTitle}>
            {downloadLines[0]}{' '}
            {downloadLines.length > 1 && <><span style={{ fontFamily: "'Nura', sans-serif", fontWeight: 900, letterSpacing: '0.04em' }}>TALKBINGO</span>{downloadLines[1]}</>}
            {downloadLines.length > 2 && <><br className={styles.mobileBreak} />{' '}{downloadLines[2]}</>}
          </h2>
          <DownloadButtons />
        </div>
      </section>
    </>
  );
}
