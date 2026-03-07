import Image from 'next/image';
import styles from './page.module.css';
import InteractiveCardHero from '@/components/InteractiveCardHero';
import InteractiveBoardCarousel from '@/components/InteractiveBoardCarousel';
import ChatReveal from '@/components/ChatReveal';
import WhenToUseSection from '@/components/WhenToUseSection';
import { IconChat, IconVoice, IconGame, IconGlobe, IconCommunity, IconTrophy } from '@/components/FeatureIcons';
import DownloadButtons from '@/components/DownloadButtons';

export default function Home() {
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
            <h2 className={styles.chatTitle}>빙고게임은 핑계,<br />퀴즈에 응답하면서,<br className={styles.mobileBreak} />{' '}진짜 대화를 시작하세요!</h2>
            <p className={styles.chatDesc}>전략적으로 빙고셀을 선택하고, 진솔하게 둘만의 채팅을 이어나가세요.</p>
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

      {/* ===== SPECIAL FEATURE 마지막 섹션 ===== */}
      <section className={styles.specialFeatures}>
        <div className="container">
          <h2 className={styles.specialFeatureTitle}>SPECIAL FEATURE</h2>
          <div className={styles.featureGrid}>
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}><IconChat /></div>
              <h3 className={styles.featureTitle}>관계별 맞춤 질문</h3>
              <p className={styles.featureDesc}>연인, 가족, 친구 등 관계에 따라 최적화된 질문이 제공됩니다.</p>
            </div>
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}><IconVoice /></div>
              <h3 className={styles.featureTitle}>음성 문자 변환</h3>
              <p className={styles.featureDesc}>음성으로 채팅을 보낼 수 있습니다.</p>
            </div>
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}><IconGame /></div>
              <h3 className={styles.featureTitle}>미니게임</h3>
              <p className={styles.featureDesc}>상대방 셀을 눌러서 도전하세요. 미니게임에서 승리하면 상대방 셀을 쟁취할 수 있습니다.</p>
            </div>
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}><IconGlobe /></div>
              <h3 className={styles.featureTitle}>다국어 지원</h3>
              <p className={styles.featureDesc}>지금은 한국어와 영어를 지원하지만, 점차 다국어 지원을 확대할 것입니다.</p>
            </div>
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}><IconCommunity /></div>
              <h3 className={styles.featureTitle}>커뮤니티</h3>
              <p className={styles.featureDesc}>가까운 지역에 있는 사람들과 대화로 새로운 인연을 만드세요.</p>
            </div>
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}><IconTrophy /></div>
              <h3 className={styles.featureTitle}>빙고게임 기록</h3>
              <p className={styles.featureDesc}>사랑하는 사람들과의 의미 있었던 대화를 기록으로 남기세요.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.download}>
        <div className="container">
          <h2 className={styles.downloadTitle}>지금, <span style={{ fontFamily: "'Nura', sans-serif", fontWeight: 900, letterSpacing: '0.04em' }}>TALKBINGO</span>로<br className={styles.mobileBreak} /> 대화를 시작하세요.</h2>
          <DownloadButtons />
        </div>
      </section>
    </>
  );
}

