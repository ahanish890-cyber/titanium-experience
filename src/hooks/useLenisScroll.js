import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Proper Lenis integration
 * Lenis handles actual scrolling
 * ScrollTrigger responds to Lenis
 * No competing RAF loops
 */
export function useLenisScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis with Apple-like settings
    const lenis = new Lenis({
      lerp: 0.08, // Subtle smoothing, not heavy
      wheelMultiplier: 1, // Respect wheel speed
      touchMultiplier: 1, // Respect touch speed
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: true,
      syncTouch: false,
      syncTouchLerp: 0.08,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Single RAF loop - no duplication
    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
    }

    gsap.ticker.add(raf);

    // Cleanup
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
