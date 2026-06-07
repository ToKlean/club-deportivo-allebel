import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navbarRef.current) {
      gsap.to(navbarRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 2,
      });
    }
  }, []);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navbarRef}
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
      style={{ opacity: 0, transform: 'translateY(-20px)' }}
    >
      <div className={styles.logo}>🐺 ALLEBEL</div>
      <ul className={styles.nav}>
        <li className={styles.navLink} onClick={() => handleNavClick('nosotros')}>
          Nosotros
        </li>
        <li className={styles.navLink} onClick={() => handleNavClick('categorias')}>
          Categorías
        </li>
        <li className={styles.navLink} onClick={() => handleNavClick('reclutamiento')}>
          Únete
        </li>
        <li className={styles.navLink} onClick={() => handleNavClick('contacto')}>
          Contacto
        </li>
      </ul>
    </nav>
  );
}
