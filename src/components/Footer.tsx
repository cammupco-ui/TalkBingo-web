'use client';

import styles from './Footer.module.css';
import { useTranslation } from '@/lib/i18n';

export default function Footer() {
    const t = useTranslation();
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                <div className={styles.footerTop}>

                    {/* 회사 정보 */}
                    <div className={styles.footerColumn}>
                        <h4>Built by Cammup Co., Ltd.</h4>
                        <ul>
                            <li>
                                <a href="mailto:cammupco@gmail.com">cammupco@gmail.com</a>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.footerColumn}>
                        <h4>{t.footer.service}</h4>
                        <ul>
                            <li><a href="https://talkbingo.app" target="_blank" rel="noopener noreferrer">{t.footer.webPlay}</a></li>
                        </ul>
                    </div>
                    <div className={styles.footerColumn}>
                        <h4>{t.footer.support}</h4>
                        <ul>
                            <li><a href="https://talkbingo.app/privacy.html" target="_blank" rel="noopener noreferrer">{t.footer.privacy}</a></li>
                            <li><a href="mailto:cammupco@gmail.com">{t.footer.contact}</a></li>
                            <li><a href="https://play.google.com/store/apps/details?id=com.talkbingo.app" target="_blank" rel="noopener noreferrer">Google Play</a></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <span>© 2026 Cammup Co., Ltd. All rights reserved.</span>
                    <span>Made with ❤️ for better conversations</span>
                </div>
            </div>
        </footer>
    );
}
