import { motion } from 'motion/react';

export default function MotionRepeat() {
  return (
    <motion.img src="/image/logo.jpg" alt="WINGS Project"
      animate={{ rotate: 180 }}
      transition={{ duration: 1, repeat: 3, repeatType: 'mirror' }}
    />

    // <motion.img src="/image/logo.jpg" alt="WINGS Project"
    //   animate={{ rotate: 180 }}
    //   transition={{ duration: 1, delay: 2, repeat: 3, repeatDelay: 1, repeatType: 'mirror' }}
    // />
  );
}
