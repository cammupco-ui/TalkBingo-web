'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './WhenToUseSection.module.css';

const REASONS = [
    '대화가 어색해질 때',
    '기억에 남는 시간을 가지고 싶을 때',
    '서로를 더 알고 싶은데 방법을 모를 때',
    '그냥 심심해서 누군가와 이야기하고 싶을 때',
];

export default function WhenToUseSection() {
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

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className="container">
                <h2 className={`${styles.title} ${visible ? styles.titleVisible : ''}`}>
                    이런 순간,<br />TALKBINGO로 초대해보세요
                </h2>
                <ul className={styles.list}>
                    {REASONS.map((reason, i) => (
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
