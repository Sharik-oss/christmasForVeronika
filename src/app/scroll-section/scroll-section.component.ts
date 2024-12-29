import { AfterViewInit, Component, OnInit } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const variants = [
  {
    from: { opacity: 0, scale: 0, y: 0 },
    to: {
      opacity: 1,
      scale: 1,
      duration: 20,
      y: -200,
    },
  },
  {
    from: { opacity: 0, scale: 0, rotate: -45 },
    to: {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      rotate: 0,
    },
  },
  {
    from: { opacity: 0, scale: 0, rotate: 45 },
    to: {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      rotate: 0,
    },
  },
  {
    from: { opacity: 0, scale: 0, rotate: -45 },
    to: {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      rotate: 0,
    },
  },
  {
    from: { opacity: 0, scale: 0, x: -200, y: 0 },
    to: {
      opacity: 1,
      scale: 1.5,
      duration: 1.5,
      x: 640,
      y: -300
    },
  },
];

@Component({
  selector: 'app-scroll-section',
  templateUrl: './scroll-section.component.html',
  styleUrls: ['./scroll-section.component.scss'],
})
export class ScrollSectionComponent implements AfterViewInit {
  constructor() { }



  ngAfterViewInit(): void {
    gsap.config({
      nullTargetWarn: false, // Silences warnings for invalid targets
    });
    gsap.registerPlugin(ScrollTrigger);

    // Select all sections with `h1` elements
    const sections = document.querySelectorAll('.ss__section');

    sections.forEach((section, index) => {
      const h1 = section.querySelector('h1');
      const img = section.querySelector('img');
      const { from, to } = variants[index] || { from: {}, to: {} };
      if (!h1 && !img) {
        console.warn(`Section ${index} has no h1 or img elements.`);
      } else if (h1) {
        gsap.fromTo(h1, from, {
          ...to,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%', // Start animation when the section is 80% visible
            end: 'bottom 60%', // End when section is 60% scrolled past
            scrub: true, // Smooth scrolling effect
          },
        });
      } else if (img) {
        gsap.fromTo(img, from, {
          ...to,
          scrollTrigger: {
            trigger: section,
            start: 'top ', // Start animation when the section is 80% visible
            end: 'bottom ', // End when section is 60% scrolled past
            scrub: true, // Smooth scrolling effect
          },
        });
      }
    });
  }



}
