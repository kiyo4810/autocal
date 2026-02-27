import { useState } from 'react';
import { motion } from 'motion/react';

export default function MotionVariant() {
  const [active, setActive] = useState(true);
  const panel = {
    active: { opacity: 1, scale: 1 },
    disable: { opacity: 0.3, scale: 0.8 }
  };

  return (
    <>
      <button onClick={() => setActive(act => !act)}>Click</button>
      <motion.div variants={panel}
        animate={active ? 'active' : 'disable'}
        style={{  width: '350px', height: '200px', backgroundColor: '#90ee90' }}>
         variants とは、アニメーション情報を「ラベル名: ｛ 個々のアニメーション ｝, …」形式のオブジェクトで管理するためのしくみ。アニメーション情報をinitial／animateなど個々の属性から切り出せるので、コードの見通しが改善できます。</motion.div>
    </>
  );
}