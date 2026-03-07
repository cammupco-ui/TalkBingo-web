'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './WhenToUseSection.module.css';
import { useTranslation } from '@/lib/i18n';

export default function WhenToUseSection() {
    const t = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const titleLines = t.whenToUse.title.split('\n');

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className="container">
                <h2 className={`${styles.title} ${visible ? styles.titleVisible : ''}`}>
                    {titleLines[0]}{titleLines.length > 1 && <><br />{titleLines[1]}</>}
                </h2>
                <ul className={styles.list}>
                    {t.whenToUse.reasons.map((reason, i) => (
                        <li
                            key={i}
                            className={`${styles.item} ${visible ? styles.itemVisible : ''}`}
                            style={{ animationDelay: visible ? `${0.15 + i * 0.12}s` : '0s' }}
                        >
                            <span className={styles.bullet}>✦</span>
                            {reason}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
