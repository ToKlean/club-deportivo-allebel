import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Hero.module.css';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const volleyballRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    // 1. Background lightning starts (via CSS animation, already running)

    // 2. Logo fade + scale
    tl.to(logoRef.current, { opacity: 1, scale: 1, duration: 0.6 }, 0);

    // 3. Title words slide up with stagger
    const titleWords = titleRef.current?.querySelectorAll(`.${styles.titleWord}`);
    if (titleWords) {
      tl.to(
        titleWords,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
        },
        0.3
      );
    }

    // 4. Subtitle fade up
    tl.to(
      subtitleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      0.8
    );

    // 5. CTA bounce in
    tl.to(
      ctaRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out',
      },
      1.2
    );

    // 6. Volleyball falls + bounces
    if (volleyballRef.current) {
      tl.to(
        volleyballRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'bounce.out',
        },
        0.6
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleCTA = () => {
    const element = document.getElementById('reclutamiento');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.backgroundLightning} />
      <div className={styles.content}>
        <div ref={logoRef} className={styles.logo}>
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" stroke="var(--color-primary)" strokeWidth="2" />
            <circle cx="100" cy="100" r="85" stroke="var(--color-primary-bright)" strokeWidth="1" opacity="0.5" />
            <text x="100" y="110" fontSize="40" fontFamily="var(--font-display)" fill="var(--color-accent)" textAnchor="middle">
              🐺
            </text>
          </svg>
        </div>

        <div ref={titleRef} className={styles.title}>
          <span className={styles.titleWord} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            ALLEBEL
          </span>
          <span className={styles.titleWord} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            VOLEIBOL
          </span>
        </div>

        <div ref={subtitleRef} className={styles.subtitle} style={{ opacity: 0, transform: 'translateY(10px)' }}>
          Compromiso · Disciplina · Pasión
        </div>

        <button ref={ctaRef} className={`${styles.cta} pulse`} onClick={handleCTA} style={{ opacity: 0, transform: 'translateY(20px)' }}>
          ¡Únete Ya!
        </button>

        <svg ref={volleyballRef} viewBox="0 0 100 100" className={styles.volleyball} style={{ opacity: 0, transform: 'translateY(-100px)' }}>
          <circle cx="50" cy="50" r="48" fill="#f5c518" stroke="var(--color-primary)" strokeWidth="2" />
          <path d="M 50 10 Q 50 50, 50 90" stroke="var(--color-primary)" strokeWidth="1" fill="none" />
          <path d="M 30 35 Q 50 45, 70 35" stroke="var(--color-primary)" strokeWidth="1" fill="none" />
          <path d="M 30 65 Q 50 55, 70 65" stroke="var(--color-primary)" strokeWidth="1" fill="none" />
        </svg>
      </div>
    </section>
  );
}
