import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

import StateBasic from './StateBasic';
import StyleType from './StyleType';
import StyledPanel from './StyledPanel';
import ListTemplate from './ListTemplate';
import books from './books';
import type { Book } from './Book';
import StateTodo from './StateToDo';
import MyThemeProvider from './MyThemeProvider';
import HookThemeButton from './HookThemeButton';
import HookReducerUp from './HookReducerUp';
import StateFormUC from './StateFormUC';
import SWRPre from './SWRPre';
import SWRBasic from './SWRBasic';

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// createRoot(document.getElementById('root') as HTMLElement).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// )

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

root.render(
  <StateBasic init={0} />
);

// root.render(
//   <StyleType style={{ backgroundColor: 'lightblue', padding: '10px' }} />
// );

// root.render(
//   <StyledPanel>
//     <p>メンバー募集中！</p>
//     <p>ようこそ、WINGSプロジェクトへ！！</p>
//   </StyledPanel>
// );

// root.render(
//   <ListTemplate src={books}>
//     {(elem: Book) => (
//       <>
//         <dt>
//           <a href={`https://wings.msn.to/books/${elem.isbn}/${elem.isbn}.jpg`}>
//             {elem.title}（{elem.price}円）
//           </a>
//         </dt>
//         <dd>{elem.summary}</dd>
//       </>
//     )}
//   </ListTemplate>
// );

// root.render(
//   <StateTodo />
// );

// root.render(
//   <MyThemeProvider>
//     <HookThemeButton />
//   </MyThemeProvider>
// );

// root.render(
//   <HookReducerUp init={0} />
// );

// root.render(
//   <StateFormUC />
// );

// root.render(
//   <SWRPre />
// );

// root.render(
//   <SWRBasic />
// );