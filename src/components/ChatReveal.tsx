'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ChatReveal.module.css';

export default function ChatReveal() {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.3 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return (
        <div ref={ref} className={styles.mockup}>
            <Image src="/images/carousel/CHT_2.png" alt="채팅 화면" width={400} height={800} className={`${styles.chatImg} ${isVisible ? styles.reveal : ''}`} />
        </div>
    );
}
