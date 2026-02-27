import { motion, MotionConfig } from 'motion/react';

export default function MotionAll() {
  return (
    <MotionConfig transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
    // reducedMotion="always"
    >
      <motion.img src="/image/logo.jpg" alt="WINGS Project"
        animate={{ rotate: 180 }} />
      <motion.img src="/image/logo.jpg" alt="WINGS Project"
        initial={{ x: '100vw' }} animate={{ x: '40vw' }} />
    </MotionConfig>
  );
}
