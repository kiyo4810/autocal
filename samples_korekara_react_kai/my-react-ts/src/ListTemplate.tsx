import { Fragment, type FC, type ReactNode } from 'react';
import type { Book } from './Book';

type ListTemplateProps = {
  src: Array<Book>,
  children: (b: Book) => ReactNode
};

export default function ListTemplate({ src, children }: ListTemplateProps) {
  return (
    <dl>
      {
        src.map(elem => (
          <Fragment key={elem.isbn}>
            {children(elem)}
          </Fragment>
        ))
      }
    </dl>
  );
}

// const ListTemplate: FC<ListTemplateProps> = ({ src, children }) => {
//   return (
//     <dl>
//       {
//         src.map(elem => (
//           <Fragment key={elem.isbn}>
//             {children(elem)}
//           </Fragment>
//       ))
//       }
//     </dl>
//   );
// };

// export default ListTemplate;