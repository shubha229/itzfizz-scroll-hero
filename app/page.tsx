"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftCurtainRef = useRef<HTMLDivElement | null>(null);
  const rightCurtainRef = useRef<HTMLDivElement | null>(null);
  const cubeRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2500",
          scrub: 1,
          pin: true,
        },
      });
      tl.to(leftCurtainRef.current, {
        xPercent: -100,
        ease: "none",
      }, 0);

      tl.to(rightCurtainRef.current, {
        xPercent: 100,
        ease: "none",
      }, 0);
      tl.to(cubeRef.current, {
        y: -250,
        rotate: 20,
        scale: 1.15,
        ease: "none",
      }, 0.2);
      tl.from(headlineRef.current?.children || [], {
        opacity: 0,
        y: 60,
        stagger: 0.08,
        ease: "power2.out",
      }, 0.3);
      tl.from(statsRef.current, {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        ease: "power2.out",
      }, 0.6);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headline = ["WELCOME", "ITZFIZZ"];

  return (
    <main className="bg-black text-white overflow-x-hidden">
      <section ref={sectionRef} className="relative h-screen">        <div
          ref={leftCurtainRef}
          className="absolute inset-y-0 left-0 w-1/2 bg-cover bg-left z-30"
          style={{ backgroundImage: "url('curtainRed.png')" }}
        />
        <div
          ref={rightCurtainRef}
          className="absolute inset-y-0 right-0 w-1/2 bg-cover bg-right z-30"
          style={{ backgroundImage: "url('curtainRed.png')" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-12 md:translate-y-16 gap-8 text-center px-6 z-10 translate-y-16 md:translate-y-20 ">
          <div ref={cubeRef} className="absolute -translate-y-10 md:translate-y-0 w-[260px] md:w-[450px] h-[260px] md:h-[450px]">
            <Image
              src="hero-object.png"
              alt="cube"
              width={450}
              height={450}
              priority
            />
          </div>
          <h1
            ref={headlineRef}
            className="text-7xl md:text-7xl lg:text-7xl font-bold flex flex-col lg:flex-row items-center lg:gap-20 gap-6 translate-y-10 md:gap-20 "
          >
            {headline.map((word, index) => (
              <span key={index} className="tracking-[0.15em] font-semibold md:tracking-[0.6em]">
                {word.split("").map((letter, i) => (
                  <span key={i} className="inline-block">
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto translate-y-10 ">
            {[
              { value: "97%", label: "CLIENT RETENTION" },
              { value: "3X", label: "REVENUE GROWTH" },
              { value: "150+", label: "PROJECTS DELIVERED" },
              { value: "40+", label: "GLOBAL MARKETS" },
            ].map((item, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) statsRef.current[i] = el;
                }}
              >
                <h2 className="text-3xl md:text-4xl font-semibold text-yellow-500 mb-2 tracking-wide ">
                  {item.value}
                </h2>
                <p className="text-sm tracking-widest text-gray-400 uppercase font-medium ">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}