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

type MarqueeAnimationProps = {
  children: React.ReactNode; // Ho cambiato in ReactNode per flessibilità
  className?: string;
  direction?: "left" | "right";
  baseVelocity: number;
};

export function MarqueeAnimation({
  children,
  className,
  direction = "left",
  baseVelocity = 10,
}: MarqueeAnimationProps) {
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

  // Questo serve a capire se il mouse è sopra
  const isHovered = useRef(false);

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    // LOGICA DI PAUSA: Se il mouse è sopra, non calcoliamo il movimento!
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
      className="overflow-hidden max-w-[100vw] flex-nowrap flex relative py-4 cursor-default"
      // Gestori eventi per capire quando il mouse entra ed esce
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
    >
      <motion.div
        className={cn(
          "font-serif uppercase text-4xl md:text-6xl font-bold flex flex-nowrap text-nowrap *:mr-12 md:*:mr-24 items-center origin-center",
          className,
        )}
        style={{ x }}
        // EFFETTO SCALA: Quando il mouse è sopra (hover), ingrandisci a 1.05
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Ripetiamo i figli per il loop infinito */}
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
export default TrustMarquee;
