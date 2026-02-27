import { motion } from 'motion/react';

export default function MotionBasic() {
  return (
    <div>
      <motion.img src="/image/logo.jpg" alt="WINGS Project"
        animate={{ rotate: 720, x: 500 }} transition={{ duration: 10 }}/>

      {/* <motion.img src="/image/logo.jpg" alt="WINGS Project"
        initial={{ x: '100vw' }} animate={{ x: '40vw' }}
        transition={{ duration: 2 }} /> */}

      {/* springの場合 */}
      {/* <motion.img src="/image/logo.jpg" alt="WINGS Project"
        initial={{ x: '100vw' }} animate={{ x: '40vw' }}
        transition={{ type: 'spring', duration: 1 }} /> */}

      {/* <motion.img src="/image/logo.jpg" alt="WINGS Project"
        initial={{ x: '100vw' }} animate={{ x: '40vw' }}
        transition={{ type: 'spring', damping: 0.5, mass: 1.5, stiffness: 10 }} /> */}

      {/* <motion.img src="/image/logo.jpg" alt="WINGS Project"
        initial={{ rotate: -180, x: '100vw' }}
        animate={{ rotate: 0, x: '40vw' }}
        transition={{
          default: { duration: 1, ease: 'easeInOut' },
          x: { type: 'spring', damping: 0.5, mass: 1.5, stiffness: 10 }
        }} /> */}
    </div>
  );
}