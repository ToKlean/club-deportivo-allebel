import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { openInstagram, openWhatsApp, openPhone } from '../utils/deepLinks';
import styles from './Contacto.module.css';

const CTA_BUTTONS = [
  {
    id: 'instagram',
    icon: '📱',
    label: 'Instagram',
    action: openInstagram,
  },
  {
    id: 'whatsapp',
    icon: '💬',
    label: 'WhatsApp',
    action: openWhatsApp,
  },
  {
    id: 'phone',
    icon: '☎️',
    label: 'Llamar',
    action: openPhone,
  },
];

export function Contacto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });

    buttonRefs.current.forEach((btn, index) => {
      tl.to(btn, { opacity: 1, scale: 1, duration: 0.6 }, index * 0.15);
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="contacto" ref={containerRef} className={styles.contacto}>
      <h2 className={styles.title}>¡Contáctanos!</h2>

      <div className={styles.buttonContainer}>
        {CTA_BUTTONS.map((btn, index) => (
          <button
            key={btn.id}
            ref={(el) => { if (el) buttonRefs.current[index] = el; }}
            className={styles.ctaButton}
            onClick={btn.action}
            style={{ opacity: 0, transform: 'scale(0.8)' }}
          >
            <span className={styles.icon}>{btn.icon}</span>
            <span>{btn.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.logo}>🐺 ALLEBEL VOLEIBOL</div>
        <div>@allebelvoleibol</div>
        <div className={styles.copyright}>© 2026 Club Deportivo Allebel. Todos los derechos reservados.</div>
      </div>
    </section>
  );
}
