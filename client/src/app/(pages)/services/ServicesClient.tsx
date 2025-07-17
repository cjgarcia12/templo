"use client";

import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import type { gsap as GSAPType } from 'gsap';

export interface WindowWithGSAP extends Window {

  gsap?: typeof GSAPType;
}

export default function ServicesClient() {
  useGSAPAnimation(() => {
    const gsap = (window as WindowWithGSAP).gsap;
    if (!gsap) return;

    // First immediately set everything to invisible
    gsap.set([".page-header", ".service-card"], { 
      opacity: 0,
      y: function(index: number, element: Element) {
        if (element.classList.contains("page-header")) return -50;
        if (element.classList.contains("service-card")) return 50;
        return 0;
      }
    });
  
    // Then animate them in with the timeline
    const tl = gsap.timeline({ 
      defaults: { 
        ease: "power3.out",
        clearProps: "all" 
      } 
    });
  
    tl.to(".page-header", { opacity: 1, y: 0, duration: 1 });
    tl.to(".service-card", { opacity: 1, y: 0, stagger: 0.2, duration: 0.7 }, "-=0.5");

    return () => {
      tl.kill();
    };
  });

  // This component only handles animations, no content
  return null;
} 