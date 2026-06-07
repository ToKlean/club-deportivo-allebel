import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Reclutamiento.module.css';

const REQUIREMENTS = [
  {
    icon: '💪',
    title: 'Compromiso',
    text: 'Dedicación constante a los entrenamientos y objetivos del equipo.',
  },
  {
    icon: '📋',
    title: 'Disciplina',
    text: 'Cumplimiento de reglas, horarios y responsabilidades establecidas.',
  },
  {
    icon: '🔥',
    title: 'Pasión',
    text: 'Amor por el voleibol y deseo de superarse constantemente.',
  },
];

export function Reclutamiento() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const requirementRefs = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });

    // Title words
    const titleWords = titleRef.current?.querySelectorAll(`.${styles.titleWord}`);
    if (titleWords) {
      tl.to(
        titleWords,
        {
          opacity: 1,
          y: 0,
          skewX: 0,
          duration: 0.6,
          stagger: 0.1,
        },
        0
      );
    }

    // Requirements
    requirementRefs.current.forEach((req, index) => {
      tl.to(req, { opacity: 1, x: 0, duration: 0.6 }, 0.5 + index * 0.15);
    });

    // CTA
    if (ctaRef.current) {
      tl.to(ctaRef.current, { opacity: 1, scale: 1, duration: 0.6 }, 1.5);
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleCTA = () => {
    const element = document.getElementById('contacto');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="reclutamiento" ref={containerRef} className={styles.reclutamiento}>
      <div ref={titleRef} className={styles.title}>
        <span className={styles.titleWord}>¡BUSCAMOS</span>
        <span className={styles.titleWord}>NUEVAS</span>
        <span className={styles.titleWord}>JUGADORAS!</span>
      </div>

      <div className={styles.requirements}>
        {REQUIREMENTS.map((req, index) => (
          <div
            key={req.title}
            ref={(el) => { if (el) requirementRefs.current[index] = el; }}
            className={styles.requirement}
            style={{ opacity: 0, transform: 'translateX(-40px)' }}
          >
            <div className={styles.requirementIcon}>{req.icon}</div>
            <h3 className={styles.requirementTitle}>{req.title}</h3>
            <p className={styles.requirementText}>{req.text}</p>
          </div>
        ))}
      </div>

      <button
        ref={ctaRef}
        className={styles.cta}
        onClick={handleCTA}
        style={{ opacity: 0, transform: 'scale(0.9)' }}
      >
        ¡Únete Ya!
      </button>
    </section>
  );
}
