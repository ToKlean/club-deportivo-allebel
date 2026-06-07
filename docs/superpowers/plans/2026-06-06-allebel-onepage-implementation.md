# Club Deportivo Allebel — One-Page Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dynamic, sports-themed one-page website for Club Deportivo Allebel with GSAP ScrollTrigger animations, dark purple aesthetic, and deep-links to Instagram, WhatsApp, and phone contact.

**Architecture:** 7 component sections (Hero, Navbar, Nosotros, Categorías, Reclutamiento, Galería, Contacto) orchestrated in App.tsx. GSAP ScrollTrigger drives scroll animations via a custom `useScrollAnimation` hook. CSS Modules for scoped styles, globals.css for design tokens. No routing; single page with anchor navigation.

**Tech Stack:** React 19, Vite, GSAP 3 + ScrollTrigger, CSS Modules, Hono (unchanged).

---

## Task 1: Install GSAP and Update Package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install GSAP and gsap/ScrollTrigger**

```bash
cd /Users/semoreno/projects/club-deportivo-allebel
pnpm install gsap
```

- [ ] **Step 2: Verify installation**

```bash
pnpm list gsap
```

Expected: `gsap@3.x.x` installed

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "deps: add gsap for animations"
```

---

## Task 2: Create Global Styles and Design Tokens

**Files:**
- Create: `src/react-app/styles/globals.css`
- Modify: `src/react-app/index.css` (if exists) or App.tsx imports

- [ ] **Step 1: Create globals.css with design tokens**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Bebas+Neue&display=swap');

:root {
  --color-bg: #0d0014;
  --color-primary: #6B21A8;
  --color-primary-bright: #9333ea;
  --color-accent: #f5c518;
  --color-text: #ffffff;
  --color-text-muted: #c4b5d6;

  --font-display: 'Bebas Neue', sans-serif;
  --font-body: 'Inter', sans-serif;

  --transition-default: 0.3s ease;
  --transition-smooth: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
}

/* Lightning pulse effect for headings */
@keyframes lightning-pulse {
  0%, 100% {
    text-shadow: 0 0 10px rgba(147, 51, 234, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(147, 51, 234, 0.8),
                 0 0 30px rgba(147, 51, 234, 0.6);
  }
}

.lightning {
  animation: lightning-pulse 2s ease-in-out infinite;
}

/* Pulse for CTA buttons */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

- [ ] **Step 2: Import globals.css in App.tsx**

Open `src/react-app/App.tsx` and add at the top:

```tsx
import '../styles/globals.css';
```

- [ ] **Step 3: Test that styles load**

```bash
pnpm dev
```

Open browser to `http://localhost:5173` and verify no CSS errors in console.

- [ ] **Step 4: Commit**

```bash
git add src/react-app/styles/globals.css src/react-app/App.tsx
git commit -m "styles: add global design tokens and animations"
```

---

## Task 3: Create useScrollAnimation Hook

**Files:**
- Create: `src/react-app/hooks/useScrollAnimation.ts`

- [ ] **Step 1: Create hook file**

```ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimationVars {
  from?: gsap.TweenVars;
  to: gsap.TweenVars;
  triggerStart?: string;
  triggerEnd?: string;
  scrub?: boolean | number;
}

export function useScrollAnimation(vars: AnimationVars) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      vars.from || {},
      {
        ...vars.to,
        scrollTrigger: {
          trigger: ref.current,
          start: vars.triggerStart || 'top 75%',
          end: vars.triggerEnd || 'bottom 25%',
          scrub: vars.scrub !== undefined ? vars.scrub : false,
          markers: false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [vars]);

  return ref;
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
pnpm tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/react-app/hooks/useScrollAnimation.ts
git commit -m "feat: add useScrollAnimation hook for GSAP ScrollTrigger"
```

---

## Task 4: Create Hero Component

**Files:**
- Create: `src/react-app/components/Hero.tsx`
- Create: `src/react-app/components/Hero.module.css`

- [ ] **Step 1: Create Hero.module.css**

```css
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0d0014 0%, #2a0a3d 100%);
  overflow: hidden;
}

.backgroundLightning {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(147, 51, 234, 0.1) 0%, transparent 70%);
  animation: lightning-pulse 3s ease-in-out infinite;
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.logo {
  width: 150px;
  height: 150px;
  margin-bottom: 40px;
  opacity: 0;
  transform: scale(0.6);
}

.title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 20px;
  line-height: 1.1;
}

.titleWord {
  display: inline-block;
  margin: 0 8px;
}

.subtitle {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: var(--color-text-muted);
  margin-bottom: 60px;
  letter-spacing: 1px;
  opacity: 0;
}

.cta {
  display: inline-block;
  padding: 16px 40px;
  background: var(--color-accent);
  color: #000;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--transition-default);
  opacity: 0;
  transform: translateY(20px);
}

.cta:hover {
  background: #ffd700;
  transform: translateY(-2px);
}

.volleyball {
  position: absolute;
  bottom: 80px;
  right: 40px;
  width: 80px;
  height: 80px;
  opacity: 0;
}

@media (max-width: 768px) {
  .hero {
    height: auto;
    min-height: 100vh;
    padding: 40px 20px;
  }

  .logo {
    width: 100px;
    height: 100px;
    margin-bottom: 30px;
  }

  .cta {
    padding: 12px 30px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .volleyball {
    display: none;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }
}
```

- [ ] **Step 2: Create Hero.tsx component**

```tsx
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
```

- [ ] **Step 3: Test Hero component loads without errors**

```bash
npm run dev
```

Open browser, verify Hero section displays with animations on load.

- [ ] **Step 4: Commit**

```bash
git add src/react-app/components/Hero.tsx src/react-app/components/Hero.module.css
git commit -m "feat(hero): add hero section with GSAP timeline animations"
```

---

## Task 5: Create Navbar Component

**Files:**
- Create: `src/react-app/components/Navbar.tsx`
- Create: `src/react-app/components/Navbar.module.css`

- [ ] **Step 1: Create Navbar.module.css**

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background: transparent;
  z-index: 100;
  transition: background 0.3s ease;
}

.navbar.scrolled {
  background: rgba(13, 0, 20, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(107, 33, 168, 0.2);
}

.logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: 2px;
}

.logo svg {
  width: 40px;
  height: 40px;
}

.nav {
  display: flex;
  gap: 40px;
  list-style: none;
}

.navLink {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  transition: color var(--transition-default);
  position: relative;
}

.navLink::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: width var(--transition-default);
}

.navLink:hover {
  color: var(--color-accent);
}

.navLink:hover::after {
  width: 100%;
}

@media (max-width: 768px) {
  .navbar {
    padding: 0 20px;
  }

  .nav {
    gap: 20px;
  }

  .navLink {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 0 15px;
    height: 60px;
  }

  .logo {
    font-size: 1.2rem;
  }

  .nav {
    gap: 15px;
  }

  .navLink {
    font-size: 0.75rem;
  }
}
```

- [ ] **Step 2: Create Navbar.tsx**

```tsx
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
```

- [ ] **Step 3: Test Navbar appears after Hero animation**

```bash
pnpm dev
```

Verify navbar slides in smoothly from top after ~2s.

- [ ] **Step 4: Commit**

```bash
git add src/react-app/components/Navbar.tsx src/react-app/components/Navbar.module.css
git commit -m "feat(navbar): add fixed navbar with scroll detection"
```

---

## Task 6: Create Nosotros Component

**Files:**
- Create: `src/react-app/components/Nosotros.tsx`
- Create: `src/react-app/components/Nosotros.module.css`

- [ ] **Step 1: Create Nosotros.module.css**

```css
.nosotros {
  padding: 100px 40px;
  background: var(--color-bg);
  min-height: 600px;
  display: flex;
  align-items: center;
  gap: 80px;
}

.textCol {
  flex: 1;
  opacity: 0;
  transform: translateX(-60px);
}

.imageCol {
  flex: 1;
  opacity: 0;
  transform: translateX(60px);
}

.imagePlaceholder {
  width: 100%;
  aspect-ratio: 4 / 3;
  background: linear-gradient(135deg, #2a0a3d, #1a0033);
  border: 2px solid var(--color-primary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--color-text-muted);
}

.title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 30px;
  color: var(--color-accent);
  letter-spacing: 1px;
}

.text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text-muted);
  margin-bottom: 40px;
}

.counters {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.counter {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.counterNumber {
  font-family: var(--font-display);
  font-size: 3rem;
  color: var(--color-accent);
  font-weight: 700;
  line-height: 1;
}

.counterLabel {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  margin-top: 10px;
  text-align: center;
}

@media (max-width: 768px) {
  .nosotros {
    flex-direction: column;
    gap: 40px;
    padding: 60px 30px;
  }

  .counters {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .nosotros {
    padding: 40px 20px;
  }

  .title {
    font-size: 1.8rem;
  }

  .text {
    font-size: 0.95rem;
  }
}
```

- [ ] **Step 2: Create Nosotros.tsx**

```tsx
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
            <span className={styles.counterNumber} ref={(el) => el && (counterRefs.current[0] = el)}>
              50
            </span>
            <span className={styles.counterLabel}>Jugadoras</span>
          </div>
          <div className={styles.counter}>
            <span className={styles.counterNumber} ref={(el) => el && (counterRefs.current[1] = el)}>
              5
            </span>
            <span className={styles.counterLabel}>Años de Club</span>
          </div>
          <div className={styles.counter}>
            <span className={styles.counterNumber} ref={(el) => el && (counterRefs.current[2] = el)}>
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
```

- [ ] **Step 3: Test Nosotros section**

Scroll to Nosotros section, verify text and counters animate in. Counters should count up to their final values.

- [ ] **Step 4: Commit**

```bash
git add src/react-app/components/Nosotros.tsx src/react-app/components/Nosotros.module.css
git commit -m "feat(nosotros): add about section with animated counters"
```

---

## Task 7: Create Categorías Component

**Files:**
- Create: `src/react-app/components/Categorias.tsx`
- Create: `src/react-app/components/Categorias.module.css`

- [ ] **Step 1: Create Categorias.module.css**

```css
.categorias {
  padding: 100px 40px;
  background: var(--color-bg);
  text-align: center;
}

.title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 60px;
  color: var(--color-text);
  letter-spacing: 1px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.card {
  padding: 40px 30px;
  background: linear-gradient(135deg, #2a0a3d, #1a0033);
  border: 2px solid var(--color-primary);
  border-radius: 8px;
  cursor: pointer;
  transition: all var(--transition-default);
  opacity: 0;
  transform: translateY(80px);
}

.card:hover {
  transform: scale(1.04) translateY(-10px);
  border-color: var(--color-primary-bright);
  box-shadow: 0 0 30px rgba(147, 51, 234, 0.5);
}

.icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.categoryName {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: 10px;
}

.age {
  display: inline-block;
  background: var(--color-primary);
  color: var(--color-text);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  margin-bottom: 20px;
}

.description {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .categorias {
    padding: 60px 30px;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .card {
    padding: 30px 20px;
  }
}

@media (max-width: 480px) {
  .categorias {
    padding: 40px 20px;
  }

  .title {
    font-size: 1.8rem;
    margin-bottom: 40px;
  }

  .card {
    padding: 20px 15px;
  }

  .categoryName {
    font-size: 1.4rem;
  }
}
```

- [ ] **Step 2: Create Categorias.tsx**

```tsx
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
            ref={(el) => el && (cardRefs.current[index] = el)}
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
```

- [ ] **Step 3: Test Categorías section**

Scroll to Categorías, verify 3 cards stagger in from below. Test hover effects.

- [ ] **Step 4: Commit**

```bash
git add src/react-app/components/Categorias.tsx src/react-app/components/Categorias.module.css
git commit -m "feat(categorias): add category cards with stagger animation"
```

---

## Task 8: Create Reclutamiento Component

**Files:**
- Create: `src/react-app/components/Reclutamiento.tsx`
- Create: `src/react-app/components/Reclutamiento.module.css`

- [ ] **Step 1: Create Reclutamiento.module.css**

```css
.reclutamiento {
  padding: 100px 40px;
  background: var(--color-primary);
  text-align: center;
}

.title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 60px;
  line-height: 1.1;
  word-spacing: 0.2em;
}

.titleWord {
  display: inline-block;
  margin: 0 10px;
  opacity: 0;
  transform: skewX(-10deg) translateY(20px);
}

.requirements {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 60px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.requirement {
  opacity: 0;
  transform: translateX(-40px);
}

.requirementIcon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.requirementTitle {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #000;
}

.requirementText {
  color: rgba(0, 0, 0, 0.8);
  font-size: 0.95rem;
}

.cta {
  display: inline-block;
  padding: 16px 50px;
  background: var(--color-accent);
  color: #000;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--transition-default);
  opacity: 0;
  transform: scale(0.9);
}

.cta:hover {
  background: #ffd700;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .reclutamiento {
    padding: 60px 30px;
  }

  .title {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }

  .requirements {
    grid-template-columns: 1fr;
    gap: 30px;
    margin-bottom: 40px;
  }

  .cta {
    padding: 12px 40px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .reclutamiento {
    padding: 40px 20px;
  }

  .title {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }

  .requirementTitle {
    font-size: 1.2rem;
  }
}
```

- [ ] **Step 2: Create Reclutamiento.tsx**

```tsx
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
            ref={(el) => el && (requirementRefs.current[index] = el)}
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
```

- [ ] **Step 3: Test Reclutamiento section**

Scroll to Reclutamiento, verify title words animate in with skew, requirements slide in from left.

- [ ] **Step 4: Commit**

```bash
git add src/react-app/components/Reclutamiento.tsx src/react-app/components/Reclutamiento.module.css
git commit -m "feat(reclutamiento): add recruitment section with split-text animation"
```

---

## Task 9: Create Galería Component

**Files:**
- Create: `src/react-app/components/Galeria.tsx`
- Create: `src/react-app/components/Galeria.module.css`

- [ ] **Step 1: Create Galeria.module.css**

```css
.galeria {
  padding: 100px 40px;
  background: var(--color-bg);
}

.title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-align: center;
  margin-bottom: 60px;
  color: var(--color-text);
  letter-spacing: 1px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.imageWrapper {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  opacity: 0;
  transform: translateY(80px);
}

.imageWrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(107, 33, 168, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}

.imageWrapper:hover::before {
  opacity: 1;
}

.imagePlaceholder {
  width: 100%;
  aspect-ratio: 1;
  background: linear-gradient(135deg, #2a0a3d, #1a0033);
  border: 1px solid var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--color-text-muted);
  transition: transform 0.3s ease;
}

.imageWrapper:hover .imagePlaceholder {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .galeria {
    padding: 60px 30px;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .title {
    margin-bottom: 40px;
  }
}

@media (max-width: 480px) {
  .galeria {
    padding: 40px 20px;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .title {
    font-size: 1.8rem;
  }
}
```

- [ ] **Step 2: Create Galeria.tsx**

```tsx
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
            ref={(el) => el && (imageRefs.current[index] = el)}
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
```

- [ ] **Step 3: Test Galería section**

Scroll to Galería, verify images fade in and stagger. Test hover overlay effect.

- [ ] **Step 4: Commit**

```bash
git add src/react-app/components/Galeria.tsx src/react-app/components/Galeria.module.css
git commit -m "feat(galeria): add photo grid with stagger and hover effects"
```

---

## Task 10: Create Contacto Component

**Files:**
- Create: `src/react-app/components/Contacto.tsx`
- Create: `src/react-app/components/Contacto.module.css`
- Create: `src/react-app/utils/deepLinks.ts` (helper for Instagram deep-link)

- [ ] **Step 1: Create deepLinks.ts utility**

```ts
export function openInstagram() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Try to open in Instagram app first
    window.location.href = 'instagram://user?username=allebelvoleibol';
    
    // Fallback to web after 1 second if app doesn't open
    setTimeout(() => {
      window.location.href = 'https://instagram.com/allebelvoleibol';
    }, 1000);
  } else {
    // Desktop: open web URL
    window.open('https://instagram.com/allebelvoleibol', '_blank');
  }
}

export function openWhatsApp() {
  const phoneNumber = '56935809132';
  window.open(`https://wa.me/${phoneNumber}`, '_blank');
}

export function openPhone() {
  window.location.href = 'tel:+56935809132';
}
```

- [ ] **Step 2: Create Contacto.module.css**

```css
.contacto {
  padding: 100px 40px;
  background: var(--color-bg);
  text-align: center;
  border-top: 1px solid var(--color-primary);
}

.title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 60px;
  color: var(--color-text);
  letter-spacing: 1px;
}

.buttonContainer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 900px;
  margin: 0 auto 60px;
}

.ctaButton {
  padding: 30px 20px;
  background: var(--color-primary);
  color: var(--color-text);
  border: 2px solid var(--color-primary-bright);
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all var(--transition-default);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  opacity: 0;
  transform: scale(0.8);
}

.ctaButton:hover {
  background: var(--color-primary-bright);
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(147, 51, 234, 0.5);
}

.icon {
  font-size: 2.5rem;
}

.footer {
  padding-top: 40px;
  border-top: 1px solid var(--color-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.logo {
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--color-accent);
  font-weight: 700;
  letter-spacing: 1px;
}

.copyright {
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .contacto {
    padding: 60px 30px;
  }

  .buttonContainer {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 40px;
  }

  .ctaButton {
    padding: 20px 15px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .contacto {
    padding: 40px 20px;
  }

  .title {
    font-size: 1.8rem;
    margin-bottom: 40px;
  }

  .ctaButton {
    padding: 15px 10px;
    font-size: 0.9rem;
    gap: 10px;
  }

  .icon {
    font-size: 2rem;
  }

  .logo {
    font-size: 1.1rem;
  }
}
```

- [ ] **Step 3: Create Contacto.tsx**

```tsx
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
            ref={(el) => el && (buttonRefs.current[index] = el)}
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
```

- [ ] **Step 4: Test Contacto section**

Scroll to Contacto, verify buttons animate in. Click each button and verify deep-links work (Instagram, WhatsApp, phone).

- [ ] **Step 5: Commit**

```bash
git add src/react-app/components/Contacto.tsx src/react-app/components/Contacto.module.css src/react-app/utils/deepLinks.ts
git commit -m "feat(contacto): add contact section with deep-link handlers"
```

---

## Task 11: Update App.tsx to Render All Sections

**Files:**
- Modify: `src/react-app/App.tsx`
- Delete: `src/react-app/App.css` (no longer needed)

- [ ] **Step 1: Replace App.tsx content**

```tsx
import '../styles/globals.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Nosotros } from './components/Nosotros';
import { Categorias } from './components/Categorias';
import { Reclutamiento } from './components/Reclutamiento';
import { Galeria } from './components/Galeria';
import { Contacto } from './components/Contacto';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Nosotros />
      <Categorias />
      <Reclutamiento />
      <Galeria />
      <Contacto />
    </>
  );
}

export default App;
```

- [ ] **Step 2: Delete old App.css**

```bash
rm /Users/semoreno/projects/club-deportivo-allebel/src/react-app/App.css
```

- [ ] **Step 3: Verify TypeScript compilation**

```bash
cd /Users/semoreno/projects/club-deportivo-allebel && pnpm tsc --noEmit
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/react-app/App.tsx
git rm src/react-app/App.css
git commit -m "refactor(app): integrate all sections, remove unused styles"
```

---

## Task 12: Test Complete Site in Dev Mode

**Files:**
- No changes; verification only

- [ ] **Step 1: Start dev server**

```bash
cd /Users/semoreno/projects/club-deportivo-allebel && pnpm dev
```

Expected: Server starts on `http://localhost:5173`

- [ ] **Step 2: Manual testing checklist**

Verify:
- [ ] Hero section loads with all animations on page load
- [ ] Navbar slides in after 2s
- [ ] Navbar changes background on scroll
- [ ] Navbar links scroll to correct sections
- [ ] Nosotros counters count up when section enters viewport
- [ ] Categorías cards stagger in from below
- [ ] Categorías cards scale on hover
- [ ] Reclutamiento title words animate with skew
- [ ] Galería images stagger in, hover overlay works
- [ ] Contacto buttons scale in, deep-links work
- [ ] Mobile responsive (check at 768px, 480px breakpoints)
- [ ] No console errors
- [ ] ScrollTrigger animations don't stutter

- [ ] **Step 3: Build production bundle**

```bash
pnpm build
```

Expected: Build succeeds, no errors

- [ ] **Step 4: Verify Hono worker serves static files**

```bash
pnpm preview
```

Visit `http://localhost:4173` and verify full site works.

- [ ] **Step 5: No test commit needed for verification**

This is a manual QA step. Proceed only if all checks pass.

---

## Task 13: Final Commit and Cleanup

**Files:**
- Verify git status

- [ ] **Step 1: Check git log to confirm all commits**

```bash
git log --oneline -10
```

Expected: 7-8 commits for all features

- [ ] **Step 2: Verify no uncommitted changes**

```bash
git status
```

Expected: `nothing to commit, working tree clean` (or only untracked files like `node_modules/`)

- [ ] **Step 3: Create a summary commit if any last-minute fixes**

(Only if needed; skip if all is clean)

```bash
# If any fixes were made:
git add .
git commit -m "fix: address final issues from testing"
```

- [ ] **Step 4: Verify remote tracking**

```bash
git branch -v
```

Expected: `main` points to your latest commit
