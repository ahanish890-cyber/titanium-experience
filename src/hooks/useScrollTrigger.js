import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollTrigger wrapper
 * Attaches animations to scroll progress
 * NOT a pinned section
 * Linear timeline based on scroll
 */
export function useScrollTrigger(triggerRef, onProgress) {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    // Kill existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Create animation tied to scroll progress
    // NOT pinned - just animated on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 0,
        onUpdate: (self) => {
          // Pass scroll progress to handler
          if (onProgress) {
            onProgress(self.progress);
          }
        },
      },
    });

    // Dummy animation to keep timeline alive
    tl.to({}, { duration: 1 });

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [onProgress]);

  return timelineRef;
}
