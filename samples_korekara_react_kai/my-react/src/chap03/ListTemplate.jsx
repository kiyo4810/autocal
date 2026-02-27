import { Fragment } from 'react';

export default function ListTemplate({ src, children }) {
  return (
    <dl>
      {src.map(elem => (
        <Fragment key={elem.isbn}>
          {/* {children} */}
          {children(elem)}
        </Fragment>
      ))}
    </dl>
  );
}

// レンダープロップ
// export default function ListTemplate({ src, render }) {
//   return (
//     <dl>
//       {src.map(elem => (
//         <Fragment key={elem.isbn}>
//           {render(elem)}
//         </Fragment>
//       ))}
//     </dl>
//   );
// }