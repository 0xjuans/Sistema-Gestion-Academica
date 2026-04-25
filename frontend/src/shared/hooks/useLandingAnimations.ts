import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Centraliza animaciones de la landing para mantener App limpio.
export function useLandingAnimations(enabled = true) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      return;
    }

    const context = gsap.context(() => {
      const animateMetricCounters = () => {
        document.querySelectorAll<HTMLElement>(".js-metric-value").forEach((element) => {
          const target = Number.parseInt(element.dataset.target ?? "0", 10);
          const prefix = element.dataset.prefix ?? "";
          const suffix = element.dataset.suffix ?? "";
          const counter = { value: 0 };

          gsap.killTweensOf(counter);
          gsap.to(counter, {
            value: target,
            duration: 1.15,
            ease: "power2.out",
            onUpdate: () => {
              element.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
            },
          });
        });
      };

      const resetMetricCounters = () => {
        document.querySelectorAll<HTMLElement>(".js-metric-value").forEach((element) => {
          const prefix = element.dataset.prefix ?? "";
          const suffix = element.dataset.suffix ?? "";
          element.textContent = `${prefix}0${suffix}`;
        });
      };

      gsap.fromTo(
        ".js-hero-animate",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.12 },
      );

      gsap.fromTo(
        ".js-hero-visual",
        { autoAlpha: 0, x: 28, scale: 0.98 },
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".js-hero-section",
            start: "top 78%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      gsap.fromTo(
        ".js-hero-content",
        { autoAlpha: 0, x: -22 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".js-hero-section",
            start: "top 78%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      gsap.fromTo(
        ".js-chart-bar",
        { scaleY: 0.55, transformOrigin: "50% 100%" },
        {
          scaleY: 1,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".js-hero-section",
            start: "top 86%",
            end: "bottom 16%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      gsap.fromTo(
        ".js-hero-floating-card",
        { y: 10, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".js-hero-section",
            start: "top 82%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      const heroPolyline = document.querySelector<SVGPolylineElement>(".js-chart-polyline");
      if (heroPolyline) {
        const totalLength = heroPolyline.getTotalLength();
        gsap.set(heroPolyline, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
        });

        gsap.to(heroPolyline, {
          strokeDashoffset: 0,
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".js-hero-section",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".js-section-animate").forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "bottom 18%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });

      gsap.fromTo(
        ".js-feature-card",
        { autoAlpha: 0, y: 24, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".js-features",
            start: "top 82%",
            end: "bottom 18%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      gsap.fromTo(
        ".js-metric-card",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".js-metrics",
            start: "top 86%",
            end: "bottom 14%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      ScrollTrigger.create({
        trigger: ".js-metrics",
        start: "top 82%",
        end: "bottom 14%",
        onEnter: animateMetricCounters,
        onEnterBack: animateMetricCounters,
        onLeaveBack: resetMetricCounters,
      });
    });

    return () => context.revert();
  }, [enabled]);
}
