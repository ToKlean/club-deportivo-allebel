import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Galeria.module.css';

const IMAGES = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  alt: `Foto del equipo ${i + 1}`,
}));

export function Galeria() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });

    imageRefs.current.forEach((img, index) => {
      tl.to(img, { opacity: 1, y: 0, duration: 0.6 }, index * 0.1);
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.galeria}>
      <h2 className={styles.title}>Galería</h2>
      <div className={styles.grid}>
        {IMAGES.map((img, index) => (
          <div
            key={img.id}
            ref={(el) => { if (el) imageRefs.current[index] = el; }}
            className={styles.imageWrapper}
            style={{ opacity: 0, transform: 'translateY(80px)' }}
          >
            <div className={styles.imagePlaceholder}>Foto del equipo {img.id}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
