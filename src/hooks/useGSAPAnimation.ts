"use client";

import { useEffect } from 'react';
import type { gsap as GSAPType } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

interface WindowWithGSAP extends Window {
  gsap?: typeof GSAPType;
  ScrollTrigger?: typeof ScrollTriggerType;
}

export function useGSAPAnimation(animationFn: () => (() => void) | void) {
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const loadGSAP = async () => {
      if (typeof window === 'undefined') return;
      
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      // Register plugins
      gsap.registerPlugin(ScrollTrigger);
      
      // Make gsap available globally for the animation function
      (window as WindowWithGSAP).gsap = gsap;
      (window as WindowWithGSAP).ScrollTrigger = ScrollTrigger;
      
      const result = animationFn();
      if (typeof result === 'function') {
        cleanup = result;
      }
    };

    loadGSAP();

    return () => {
      if (cleanup) cleanup();
    };
  }, [animationFn]);
} 