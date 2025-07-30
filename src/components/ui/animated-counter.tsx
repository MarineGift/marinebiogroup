import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({ value, suffix = "", duration = 2 }: AnimatedCounterProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Extract numeric value from string (e.g., "$79.8B" -> 79.8)
  const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
  const prefix = value.replace(/[\d.]/g, '');
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (numericValue < 1) {
      return latest.toFixed(1);
    }
    return Math.round(latest).toString();
  });

  useEffect(() => {
    if (!hasAnimated) {
      const controls = animate(count, numericValue, { duration });
      setHasAnimated(true);
      return controls.stop;
    }
  }, [count, numericValue, duration, hasAnimated]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        if (!hasAnimated) {
          animate(count, numericValue, { duration });
          setHasAnimated(true);
        }
      }}
    >
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
}
