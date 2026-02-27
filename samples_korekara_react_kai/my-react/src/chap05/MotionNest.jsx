import { motion } from 'motion/react';
import books from '../chap03/books.js';

export default function MotionNest() {
  const list = {
    initial: { backgroundColor: '#fff' },
    animate: { backgroundColor: '#90ee90',
      transition: { duration: 5 }
      // transition: { duration: 5, when: 'beforeChildren' }
      // transition: { duration: 5, when: 'beforeChildren', staggerChildren: 0.2}
      // transition: { duration: 5, when: 'beforeChildren', staggerChildren: 0.2, staggerDirection: -1 }
    }
  };

  const item = {
    initial: {x: '100vw', opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <motion.ul variants={list}
      initial="initial" animate="animate"
      style={{ border: '1px solid #000',width: '80vw' }}>
      {books.map(b => (
        <motion.li key={b.isbn} variants={item}
          style={{ padding: '5px'}}>
        {b.title}（{b.price}円）
        </motion.li>
      ))}
    </motion.ul>
  );
}