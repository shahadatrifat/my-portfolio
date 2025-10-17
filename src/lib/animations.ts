// animation.ts
export const fadeInUp = {
  opacity: 0,
  y: 60,
  duration: 1.2,
  ease: "power3.out",
};
export const scrollReveal = (el: HTMLElement) => {
  gsap.from(el, {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
};
