import { useAtom } from 'jotai';
// import { useAtomValue, useSetAtom } from 'jotai';
import { counterAtom } from '../store/atom';
import { useResetAtom } from 'jotai/utils';
// import { getDefaultStore } from 'jotai';

// Store単位にAtom値の初期値を設定
// const store = getDefaultStore();
// store.set(counterAtom, 100);
// const unsubscribe = store.sub(counterAtom, () => {
//   console.log(`カウンター値：${store.get(counterAtom)}`);
// });


export default function JotaiCounter() {
  const [counter, setCounter] = useAtom(counterAtom);
  // const counter = useAtomValue(counterAtom);
  // const setCounter = useSetAtom(counterAtom);

  const resetCounter = useResetAtom(counterAtom);

  const handleClick = () => {
    setCounter(c => c + 1);
    // setCounter(counter + 1);
  };

  // const stop = () => {
  //   unsubscribe();
  // }

  return (
    <>
      <button onClick={handleClick}>カウント</button>
      <button onClick={resetCounter}>リセット</button>
      {/* <button onClick={stop}>監視解除</button> */}
      <p>{counter}回、クリックされました。</p>
    </>
  );
}
