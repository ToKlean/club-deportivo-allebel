import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from './Nosotros.module.css';

export function Nosotros() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<HTMLSpanElement[]>([]);

  useScrollAnimation({
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0, duration: 0.8 },
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });

    // Animate text
    if (textRef.current) {
      tl.to(textRef.current, { opacity: 1, x: 0, duration: 0.8 }, 0);
    }

    // Animate image
    if (imageRef.current) {
      tl.to(imageRef.current, { opacity: 1, x: 0, duration: 0.8 }, 0);
    }

    // Animate counters
    counterRefs.current.forEach((counter, index) => {
      const finalValue = parseInt(counter.textContent || '0');
      tl.to(
        { value: 0 },
        {
          value: finalValue,
          duration: 2,
          snap: { value: 1 },
          onUpdate: function () {
            counter.textContent = Math.floor(this.targets()[0].value).toString();
          },
        },
        0.6 + index * 0.2
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="nosotros"
      ref={containerRef}
      className={styles.nosotros}
    >
      <div ref={textRef} className={styles.textCol} style={{ opacity: 0, transform: 'translateX(-60px)' }}>
        <h2 className={styles.title}>Nosotros</h2>
        <p className={styles.text}>
          Club Deportivo Allebel es una institución dedicada a la formación de jóvenes atletas en la
          disciplina del voleibol. Con un enfoque en el desarrollo integral, buscamos inculcar valores
          como el compromiso, la disciplina y la pasión en nuestras jugadoras.
        </p>
        <div className={styles.counters}>
          <div className={styles.counter}>
            <span className={styles.counterNumber} ref={(el) => { if (el) counterRefs.current[0] = el; }}>
              50
            </span>
            <span className={styles.counterLabel}>Jugadoras</span>
          </div>
          <div className={styles.counter}>
            <span className={styles.counterNumber} ref={(el) => { if (el) counterRefs.current[1] = el; }}>
              5
            </span>
            <span className={styles.counterLabel}>Años de Club</span>
          </div>
          <div className={styles.counter}>
            <span className={styles.counterNumber} ref={(el) => { if (el) counterRefs.current[2] = el; }}>
              3
            </span>
            <span className={styles.counterLabel}>Campeonatos</span>
          </div>
        </div>
      </div>
      <div ref={imageRef} className={styles.imageCol} style={{ opacity: 0, transform: 'translateX(60px)' }}>
        <div className={styles.imagePlaceholder}>Foto del equipo</div>
      </div>
    </section>
  );
}
