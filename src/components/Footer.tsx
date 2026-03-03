import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                <div className={styles.footerTop}>
                    <div className={styles.footerBrand}>
                        <h3>🎯 TalkBingo</h3>
                        <p>대화로 빙고를 완성하세요! 연인, 가족, 친구와 함께하는 새로운 커뮤니케이션 게임.</p>
                    </div>
                    <div className={styles.footerColumn}>
                        <h4>서비스</h4>
                        <ul>
                            <li><Link href="/">소개</Link></li>
                            <li><a href="https://talkbingo.app" target="_blank" rel="noopener noreferrer">웹 플레이</a></li>
                        </ul>
                    </div>
                    <div className={styles.footerColumn}>
                        <h4>지원</h4>
                        <ul>
                            <li><a href="https://talkbingo.app/privacy.html" target="_blank" rel="noopener noreferrer">개인정보처리방침</a></li>
                            <li><a href="mailto:cammupco@gmail.com">문의하기</a></li>
                            <li><a href="https://play.google.com/store/apps/details?id=com.cammupco.talkbingo" target="_blank" rel="noopener noreferrer">Google Play</a></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <span>© 2026 Cammupco. All rights reserved.</span>
                    <span>Made with ❤️ for better conversations</span>
                </div>
            </div>
        </footer>
    );
}
