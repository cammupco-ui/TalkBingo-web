'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';

const navItems: { href: string; label: string }[] = [];

export default function Nav() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isHome = pathname === '/';

    useEffect(() => {
        if (!isHome) return;
        const onScroll = () => setScrolled(window.scrollY > 60);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [isHome]);

    const transparent = isHome && !scrolled;

    return (
        <nav className={`${styles.nav} ${transparent ? styles.navTransparent : ''}`}>
            <div className={styles.navInner}>
                <Link href="/" className={styles.navLogo}>
                    <span className={styles.navLogoIcon}>
                        <Image src="/assets/hero/LOGO_Vector_edited.svg" alt="Logo" width={24} height={24} style={{ width: '100%', height: '100%' }} />
                    </span>
                    TALKBINGO
                </Link>
                <button className={styles.navMobileToggle} onClick={() => setIsOpen(!isOpen)} aria-label="메뉴 열기">
                    {isOpen ? '✕' : '☰'}
                </button>
                <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
                    {navItems.map(item => (
                        <li key={item.href}>
                            <Link href={item.href} className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`} onClick={() => setIsOpen(false)}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <li className={styles.navSnsWrapper}>
                        <a href="https://instagram.com/talkbingo" target="_blank" rel="noopener noreferrer" className={styles.navSnsLink} aria-label="Instagram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a href="https://youtube.com/@talkbingo" target="_blank" rel="noopener noreferrer" className={styles.navSnsLink} aria-label="YouTube">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.13 1 12 1 12s0 3.87.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.87 23 12 23 12s0-3.87-.46-5.58z"></path>
                                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
