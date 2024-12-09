import React from 'react'
import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
        <h1>React & Next.js</h1>
        <nav className={styles.nav}>
            <ul>
                <li>
                    <Link href="/">Home →</Link>
                </li>
            </ul>
        </nav>
    </header>
  );
}
