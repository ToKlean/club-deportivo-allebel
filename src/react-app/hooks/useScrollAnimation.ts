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
