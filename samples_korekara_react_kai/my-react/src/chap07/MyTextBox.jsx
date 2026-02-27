// React 19は動作OK（React18は動作不可）
// export default function MyTextBox({ label, ref }) {
//   return (
//     <label>
//       {label}：
//       <input type="text" size="15" ref={ref} />
//     </label>
//   );
// }


// React 18以前でforwardRef関数が必要
// import { forwardRef } from 'react';

// const MyTextBox = forwardRef(({ label }, ref) => (
//   <label>
//     {label}：
//     <input type="text" size="15" ref={ref} />
//   </label>
// ));
// export default MyTextBox;


// useImperativeHandle関数を使って書き換えた場合（React 19以降）
import { useImperativeHandle, useRef } from 'react';

export default function MyTextBox({ label, ref }) {
  const input = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        input.current.focus();
      },
    };
  }, []);

  return (
    <label>
      {label}：
      <input type="text" size="15" ref={input} />
    </label>
  );
};


// useImperativeHandle関数を使って書き換えた場合（React 18以前）
// import { forwardRef, useImperativeHandle, useRef } from 'react';

// const MyTextBox = forwardRef(({ label }, ref) => {
//   const input = useRef(null);
//   useImperativeHandle(ref, () => {
//     return {
//       focus() {
//         input.current.focus();
//       },
//     };
//   }, []);

//   return (
//     <label>
//       {label}：
//       <input type="text" size="15" ref={input} />
//     </label>
//   );
// });

// export default MyTextBox;