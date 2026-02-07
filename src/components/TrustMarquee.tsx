"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";
import { cn } from "@/lib/utils";

// --- PARTE 1: LOGICA DI ANIMAZIONE ---
type MarqueeAnimationProps = {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
  baseVelocity: number;
};

function MarqueeAnimation({ children, className, direction = "left", baseVelocity = 10 }: MarqueeAnimationProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const isHovered = useRef(false);
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    // PAUSA INTERATTIVA: Se il mouse è sopra, ferma il calcolo
    if (isHovered.current) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (direction === "left") {
      directionFactor.current = 1;
    } else if (direction === "right") {
      directionFactor.current = -1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className="overflow-hidden max-w-[100vw] flex-nowrap flex relative py-0 cursor-default"
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
    >
      <motion.div
        className={cn(
          "font-serif uppercase text-3xl md:text-5xl font-bold flex flex-nowrap text-nowrap *:mr-12 md:*:mr-24 items-center origin-center",
          className,
        )}
        style={{ x }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
      </motion.div>
    </div>
  );
}

// --- PARTE 2: IL COMPONENTE CHE USI NEL SITO ---
const TrustMarquee = () => {
  return (
    <section className="w-full py-0 border-t border-emerald-100 my-0">
      {/* BANDA SUPERIORE (Scura) */}
      <div className="bg-emerald-900 text-white py-4 md:py-6">
        <MarqueeAnimation baseVelocity={0.5} direction="left">
          <span className="tracking-[0.15em]">
            EMERALDRESS • MADE IN ITALY • LUSSO CONSAPEVOLE • FIBRA RIGENERATA • &nbsp;&nbsp;
          </span>
        </MarqueeAnimation>
      </div>

      {/* BANDA INFERIORE (Chiara) */}
      <div className="bg-[#E4FFEC] text-emerald-950 py-4 md:py-6">
        <MarqueeAnimation baseVelocity={0.5} direction="right">
          <span className="tracking-[0.15em]">
            SOSTENIBILITÀ CERTIFICATA • ECONYL® TECHNOLOGY • SPEDIZIONI GREEN • OCEAN CLEANUP • &nbsp;&nbsp;
          </span>
        </MarqueeAnimation>
      </div>
    </section>
  );
};

export default TrustMarquee;
