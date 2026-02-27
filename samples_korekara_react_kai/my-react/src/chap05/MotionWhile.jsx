import { motion } from 'motion/react';

export default function MotionWhile() {
  return (
    <div>
      <motion.button
        initial={{ scale: 1, backgroundColor: '#00f' }}
        whileHover={{
          scale: 1.2, backgroundColor: '#f0f',
          // transition: { duration: 0.8 }
        }}
        whileTap={{ scale: 0.8, backgroundColor: '#f00' }}
        transition={{ duration: 0.2 }}
        style={{ padding: '10px', color: '#fff' }}>
        押してみて
      </motion.button>
    </div>
  );
}