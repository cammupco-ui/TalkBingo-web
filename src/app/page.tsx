import Image from 'next/image';
import styles from './page.module.css';
import InteractiveCardHero from '@/components/InteractiveCardHero';
import InteractiveBoardCarousel from '@/components/InteractiveBoardCarousel';
import ChatReveal from '@/components/ChatReveal';

export default function Home() {
  return (
    <>
      <InteractiveCardHero />

      <section className={styles.bingoTransition}>
        <div className={styles.topCurve}>
          <svg viewBox="0 0 1280 173" preserveAspectRatio="none">
            <defs>
              <linearGradient id="topCenterFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                <stop offset="100%" stopColor="#000000" stopOpacity="1" />
              </linearGradient>
            </defs>
            <rect x="440" y="113" width="400" height="60" fill="url(#topCenterFade)" />
            <path d="M540 173 C540 77.45 302.232 0 0 0 V173 H540 Z" fill="#000000" />
            <path d="M740 173 C740 77.45 977.768 0 1280 0 V173 H740 Z" fill="#000000" />
          </svg>
        </div>
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
            <h2 className={styles.chatTitle}>게임은 핑계, 진짜 대화는 빙고 안에서 시작!</h2>
            <p className={styles.chatDesc}>진솔한 답변을 나누고, 게임이 끝난 후에는 더 깊어지는 둘만의 채팅을 이어나가세요.</p>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <p className={styles.sectionLabel}>✨ 주요 기능</p>
          <h2 className={styles.sectionTitle}>왜 TalkBingo일까요?</h2>
          <p className={styles.sectionSubtitle}>단순한 빙고가 아닙니다. 대화를 이끌어내는 스마트한 질문들로 관계를 더 깊게 만들어드립니다.</p>
          <div className={styles.featureGrid}>
            <div className={`card ${styles.featureCard}`}><div className={styles.featureIcon}>🗣️</div><h3 className={styles.featureTitle}>대화 주제 빙고</h3><p className={styles.featureDesc}>밸런스 게임, 진실 게임 등 다양한 대화 주제로 자연스럽게 대화를 시작하세요.</p></div>
            <div className={`card ${styles.featureCard}`}><div className={styles.featureIcon}>💑</div><h3 className={styles.featureTitle}>관계별 맞춤 질문</h3><p className={styles.featureDesc}>연인, 가족, 친구 등 관계에 따라 최적화된 질문이 제공됩니다.</p></div>
            <div className={`card ${styles.featureCard}`}><div className={styles.featureIcon}>🎯</div><h3 className={styles.featureTitle}>실시간 대전</h3><p className={styles.featureDesc}>초대 코드로 상대방을 초대하고 실시간으로 빙고 대결을 즐기세요.</p></div>
            <div className={`card ${styles.featureCard}`}><div className={styles.featureIcon}>🎤</div><h3 className={styles.featureTitle}>음성 메시지</h3><p className={styles.featureDesc}>텍스트 대신 음성으로 답변하세요. 더 생생한 대화가 가능합니다.</p></div>
            <div className={`card ${styles.featureCard}`}><div className={styles.featureIcon}>🏆</div><h3 className={styles.featureTitle}>챌린지 &amp; 스틸</h3><p className={styles.featureDesc}>상대방의 셀을 뺏는 스틸! 긴장감 넘치는 전략적 게임 플레이를 경험하세요.</p></div>
            <div className={`card ${styles.featureCard}`}><div className={styles.featureIcon}>🌍</div><h3 className={styles.featureTitle}>다국어 지원</h3><p className={styles.featureDesc}>한국어와 영어를 지원합니다. 글로벌 친구들과도 함께 즐기세요.</p></div>
          </div>
        </div>
      </section>

      <section className={styles.download}>
        <div className="container">
          <h2 className={styles.downloadTitle}>지금 바로 시작하세요</h2>
          <p className={styles.downloadDesc}>TalkBingo를 다운로드하고 소중한 사람과 특별한 대화를 시작하세요.</p>
          <div className={styles.downloadButtons}>
            <a href="https://play.google.com/store/apps/details?id=com.cammupco.talkbingo" target="_blank" rel="noopener noreferrer" className={styles.storeBadge}>
              <span className={styles.storeBadgeIcon}>▶️</span>
              <div><div className={styles.storeBadgeLabel}>GET IT ON</div><div className={styles.storeBadgeName}>Google Play</div></div>
            </a>
            <a href="https://talkbingo.app" target="_blank" rel="noopener noreferrer" className={styles.storeBadge}>
              <span className={styles.storeBadgeIcon}>🌐</span>
              <div><div className={styles.storeBadgeLabel}>PLAY ON</div><div className={styles.storeBadgeName}>Web Browser</div></div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
