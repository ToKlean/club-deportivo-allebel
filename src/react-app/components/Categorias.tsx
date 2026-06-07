import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Categorias.module.css';

const CATEGORIES = [
  {
    name: 'Sub 12',
    age: 'De 10 a 12 años',
    icon: '🏐',
    description: 'Categoría de iniciación donde las jugadoras aprenden los fundamentos del voleibol.',
  },
  {
    name: 'Sub 15',
    age: 'De 13 a 15 años',
    icon: '🏐',
    description: 'Desarrollo técnico y táctico avanzado con mayor intensidad de entrenamiento.',
  },
  {
    name: 'Sub 17',
    age: 'De 16 a 17 años',
    icon: '🏐',
    description: 'Categoría competitiva que prepara a las mejores jugadoras para niveles superiores.',
  },
];

export function Categorias() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });

    cardRefs.current.forEach((card, index) => {
      tl.to(
        card,
        { opacity: 1, y: 0, duration: 0.6 },
        index * 0.15
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="categorias" ref={containerRef} className={styles.categorias}>
      <h2 className={styles.title}>Nuestras Categorías</h2>
      <div className={styles.grid}>
        {CATEGORIES.map((cat, index) => (
          <div
            key={cat.name}
            ref={(el) => { if (el) cardRefs.current[index] = el; }}
            className={styles.card}
            style={{ opacity: 0, transform: 'translateY(80px)' }}
          >
            <div className={styles.icon}>{cat.icon}</div>
            <h3 className={styles.categoryName}>{cat.name}</h3>
            <span className={styles.age}>{cat.age}</span>
            <p className={styles.description}>{cat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
