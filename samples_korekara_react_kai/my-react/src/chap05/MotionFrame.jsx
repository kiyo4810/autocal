import { motion } from 'motion/react';

export default function MotionFrame() {
  return (
    <motion.img src="/image/logo.jpg" alt="WINGS Project"
      animate={{ rotate: [0, 90, -90, 45, 360], scale: [1, 0.8, 1.1, 1.5, 1] }}
      transition={{ duration: 10, times: [0, 0.2, 0.6, 0.7, 1] }} />
  );
}
