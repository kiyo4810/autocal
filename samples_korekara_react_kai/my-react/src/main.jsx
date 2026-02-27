import { Fragment, StrictMode, Suspense, createElement } from 'react'
import { createRoot } from 'react-dom/client'
// ■■chap02■■
// import './index.css'
// import App from './App.jsx'
// import AppClass from './AppClass';
import './chap02/class.css';

// ■■chap03■■
import MyHello from './chap03/MyHello';
import EventBasic from './chap03/EventBasic';
import StateBasic from './chap03/StateBasic';
import books from './chap03/books';
import ForList from './chap03/ForList';
import ForNest from './chap03/ForNest';
import ForFilter from './chap03/ForFilter';
import ForSort from './chap03/ForSort';
import SelectComp from './chap03/SelectComp';
import SelectStyle from './chap03/SelectStyle';
import StyledPanel from './chap03/StyledPanel';
import TitledPanel from './chap03/TitledPanel';
import ListTemplate from './chap03/ListTemplate';
import StateParent from './chap03/StateParent';
import EventMouse from './chap03/EventMouse';
import EventCompare from './chap03/EventCompare';
import EventError from './chap03/EventError';
import EventObj from './chap03/EventObj';
import EventPoint from './chap03/EventPoint';
import EventKey from './chap03/EventKey';
import EventArgs from './chap03/EventArgs';
import EventArgs2 from './chap03/EventArgs2';
import EventPropagation from './chap03/EventPropagation';
import EventOnce from './chap03/EventOnce';
import EventPassive from './chap03/EventPassive';

// ■■chap04■■
import StateForm from './chap04/StateForm';
import StateFormUC from './chap04/StateFormUC';
import FormTextarea from './chap04/FormTextarea';
import FormSelect from './chap04/FormSelect';
import FormList from './chap04/FormList';
import FormRadio from './chap04/FormRadio';
import FormCheck from './chap04/FormCheck';
import FormCheckMulti from './chap04/FormCheckMulti';
import FormFile from './chap04/FormFile';
import StateNest from './chap04/StateNest';
import StateNestImmer from './chap04/StateNestImmer';
import StateNestImmer2 from './chap04/StateNestImmer2';
import StateTodo from './chap04/StateTodo';
import FormBasic from './chap04/FormBasic';
import FormYup from './chap04/FormYup';
import FormJapan from './chap04/FormJapan';

// ■■chap05■■
import LazyBasic from './chap05/LazyBasic';
import LazyMulti from './chap05/LazyMulti';
import SuspenseSimple from './chap05/SuspenseSimple';
import SuspenseResult from './chap05/SuspenseResult';
import ProfilerBasic from './chap05/ProfilerBasic';
import ModuleBasic from './chap05/ModuleBasic';
import style1 from './chap05/AppStyle1.module.css';
import style2 from './chap05/AppStyle2.module.css';
import style3 from './chap05/AppStyle3.module.css';
import ModuleTheme from './chap05/ModuleTheme';
import ModuleNest from './chap05/ModuleNest';
import EmotionBasic from './chap05/EmotionBasic';
/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import EmotionStyled from './chap05/EmotionStyled';
import { MyButton, MyStyledButton } from './chap05/EmotionStyled2';
import EmotionProps from './chap05/EmotionProps';
import MotionBasic from './chap05/MotionBasic';
import MotionWhile from './chap05/MotionWhile';
import MotionExit from './chap05/MotionExit';
import MotionRepeat from './chap05/MotionRepeat';
import MotionAll from './chap05/MotionAll';
import MotionVariant from './chap05/MotionVariant';
import MotionNest from './chap05/MotionNest';
import MotionFrame from './chap05/MotionFrame';
import PortalBasic from './chap05/PortalBasic';
import ErrorRoot from './chap05/ErrorRoot';
import ErrorRetryRoot from './chap05/ErrorRetryRoot';
import ErrorEventRoot from './chap05/ErrorEventRoot';
import MetaBasic from "./chap05/MetaBasic";
import ScriptBasic from './chap05/ScriptBasic';
import StyleBasic from './chap05/StyleBasic';
import StyleInline from './chap05/StyleInline';

// ■■chap06■■
import MaterialBasic from './chap06/MaterialBasic';
import MaterialDrawer from './chap06/MaterialDrawer';
import MaterialGrid from './chap06/MaterialGrid';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './chap06/theme';
import MaterialMode from './chap06/MaterialMode';
import FormMui from './chap06/FormMui';
import SWRPre from './chap06/SWRPre';
import SWRBasic from './chap06/SWRBasic';
import SWRApp from './chap06/SWRApp';
import SWRCompare from './chap06/SWRCompare';
import SWRRender from './chap06/SWRRender';

// ■■chap07■■
import StateEffect from './chap07/StateEffect';
import HookTimer from './chap07/HookTimer';
import HookEffect from './chap07/HookEffect';
import HookRefNg from './chap07/HookRefNg';
import HookRef from './chap07/HookRef';
import HookRefForward from './chap07/HookRefForward';
import HookCallbackRef from './chap07/HookCallbackRef';
import HookReducer from './chap07/HookReducer';
import HookReducerUp from './chap07/HookReducerUp';
import HookReducerInit from './chap07/HookReducerInit';
import HookContext from './chap07/HookContext';
import MyThemeProvider from './chap07/MyThemeProvider';
import HookThemeButton from './chap07/HookThemeButton';
import UsePromise from './chap07/UsePromise';

import JotaiCounter from './chap07/JotaiCounter';
import JotaiTodo from './chap07/JotaiTodo';
import JotaiAsync from './chap07/JotaiAsync';
import JotaiTodoUp from './chap07/JotaiTodoUp';
// import { Provider } from 'jotai';
import { createStore, Provider } from 'jotai';

// ■■chap08■■
import HookMemo from './chap08/HookMemo';
import HookTransition from './chap08/HookTransition';
import HookDeferred from './chap08/HookDeferred';
import HookDeferredTransition from './chap08/HookDeferredTransition';
import ActionPre from './chap08/ActionPre';
import ActionBasic from './chap08/ActionBasic';
import ActionOptimistic from './chap08/ActionOptimistic';
import HookCustom from './chap08/HookCustom';

// ■■column■■
import MyStore from './column/MyStore';

// #region ■■chap02■■
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// )

const root = createRoot(document.getElementById('root'));
// const root = createRoot(document.getElementById('root'), {
//   identifierPrefix: 'my-react-',
//   onUncaughtError: (error, errorInfo) => {
//     console.error('Error:', error);
//     console.error('Component stack:', errorInfo);
//   },
// });

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

setInterval(() => {
  root.render(
    <p>現在時刻：{(new Date()).toLocaleString()}</p>
  );
}, 1000);

// root.render(
//   <StrictMode>
//     <AppClass />
//   </StrictMode>
// );

// root.render(
//   <div>
//     <p>こんにちは、世界！</p>
//     <p>はじめまして、React！！</p>
//   </div>
// );

// root.render(
//   <Fragment>
//     <p>こんにちは、世界！</p>
//     <p>はじめまして、React！！</p>
//   </Fragment>
// );

// root.render(
//   <>
//     <p>こんにちは、世界！</p>
//     <p>はじめまして、React！！</p>
//   </>
// );

// const input = (
//   <div className="field">
//     <label htmlFor="title">書名</label>
//     <input id="title" tabIndex="2" />
//   </div>
// );
// root.render(
//   <div>{input}</div>
// );

// const tag = (
//   // コメントです（JSX式内でないのでOK）
//   <ul>
//     {/* コメントです。 */}
//     <li // タグ内ではOK
//     >React</li>
//     <li /*
//       これも大丈夫
//     */>Vue.js</li>
//     <li>Angular</li>
//   </ul>
// );
// root.render(
//   <div>{tag}</div>
// );

// const name = '鈴木';
// root.render(
//   <p>こんにちは、{name}です！</p>
// );

// const content = `<h3>WINGSプロジェクト</h3>
//   <img src="https://wings.msn.to/image/wings.jpg" />`;
// root.render(
//   <p>{content}</p>
//   // <p dangerouslySetInnerHTML={{ __html: content }}></p>
// );

// root.render(
//   <>
//     <div>{'Tom &amp; Jerry'}</div>
//     <div>Tom &amp; Jerry</div>
//     <div>{'Tom \u0026 Jerry'}</div>
//     <div>{`Tom ${String.fromCodePoint(38)} Jerry`}</div>
//     <div dangerouslySetInnerHTML={{ __html: 'Tom &amp; Jerry' }} />
//   </>
// );

// root.render(
//   <ul>
//     <li>{true}</li>
//     <li>{false}</li>
//     <li>{undefined}</li>
//     <li>{null}</li>
//     <li>{0}</li>
//     <li>{String(true)}</li>
//   </ul>
// );


// const dest = 'https://ja.react.dev';

// root.render(
//   <a href={dest}>React本家サイト</a>
//   // <a href="{dest}">React本家サイト</a>
//   // <a href="{dest}/learn">React本家サイト</a>
//   // <a href={dest + '/learn'}>React本家サイト</a>
// );

// const attrs = {
//   href: 'https://wings.msn.to/',
//   download: false,
//   target: '_blank',
//   rel: 'help'
// };

// root.render(
//   // <a href={attrs.href} download={attrs.download}
//   //   target={attrs.target} rel={attrs.rel}>サポートページへ</a>
//   <a {...attrs}>サポートページへ</a>
// );

// root.render(
//   <a href="index.html" download>トップへ</a>
//   // <a href="index.html" download={true}>トップへ</a>
// );

// // const props = 'color: White; background-color: Blue; padding: 3px';
// const props = {
//   color: 'White',
//   backgroundColor: 'Blue',
//   // 'background-color': 'Blue',
//   padding: 3
//   // padding: '3px'
// };

// root.render(
//   <p style={props}>WINGSプロジェクト</p>
// );

// root.render(
//   <p className="hoge">WINGSプロジェクト</p>
// );

// const title = 'これからはじめるVue.js 3実践入門';

// root.render(
//   <div className="main">
//     <p>「{title}」（SBクリエイティブ刊）</p>
//     <img src="https://wings.msn.to/books/978-4-8156-1336-5/978-4-8156-1336-5.jpg"
//       alt={title} />
//     絶賛発売中！
//   </div>
// );

// root.render(
//   createElement(
//     'div',
//     { className: 'main' },
//     createElement(
//       'p',
//       null,
//       `「${title}」（SBクリエイティブ刊）`
//     ),
//     createElement(
//       'img',
//       {
//         src: 'https://wings.msn.to/books/978-4-8156-1336-5/978-4-8156-1336-5.jpg',
//         alt: title
//       }
//     ),
//     '絶賛発売中！'
//   )
// );
// #endregion

// #region ■■chap03■■
// root.render(
//   <MyHello myName="鈴木" />
// );

// root.render(
//   <EventBasic type="time" />
// );

// root.render(
//   <StateBasic init={0} />
// );

// root.render(
//   <ForList src={books} />
// );

// root.render(
//   <ForNest src={books} />
// );

// root.render(
//   <ForFilter src={books} />
// );

// root.render(
//   <ForSort src={books} />
// );

// root.render(
//   <SelectComp />
// );

// root.render(
//   <SelectStyle mode="light" />
// );

// root.render(
//   <StyledPanel>
//     <p>メンバー募集中！</p>
//     <p>ようこそ、WINGSプロジェクトへ！！</p>
//     {/* <MyHello myName="鈴木" /> */}
//   </StyledPanel>
// );

// root.render(<TitledPanel
//   title={
//     <p>メンバー募集中！</p>
//   }
//   body={
//     <p>ようこそ、WINGSプロジェクトへ！！</p>
//   }>
// </TitledPanel>);

// const title = <p>メンバー募集中！</p>;
// const body = <p>ようこそ、WINGSプロジェクトへ！！</p>;
// root.render(
//   <TitledPanel title={title} body={body}></TitledPanel>
// );

// root.render(
//   <TitledPanel>
//     <p key="title">メンバー募集中！</p>
//     <p key="body">ようこそ、WINGSプロジェクトへ！！</p>
//   </TitledPanel>
// );

// root.render(
//   <ListTemplate src={books}>
//     {elem => (
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
//   <ListTemplate src={books} render={elem => (
//     <>
//       <dt>
//         <a href={`https://wings.msn.to/books/${elem.isbn}/${elem.isbn}.jpg`}>
//           {elem.title}（{elem.price}円）
//         </a>
//       </dt>
//       <dd>{elem.summary}</dd>
//     </>
//   )} />
// );

// root.render(
//   <StateParent />
// );

// root.render(
//   <EventMouse
//     alt="ロゴ画像"
//     defaultSrc="https://www.web-deli.com/image/linkbanner_l.gif"
//     afterSrc="https://www.web-deli.com/image/home_chara.gif" />
// );

// root.render(
//   <EventCompare />
// );

// root.render(
//   <EventError src="/image/wings.jpg"
//     alt="サンプル画像" />
// );

// root.render(
//   <EventObj />
// );

// root.render(
//   <EventPoint />
// );

// root.render(
//   <EventKey />
// );

// root.render(
//   <EventArgs />
// );

// root.render(
//   <EventArgs2 />
// );

// root.render(
//   <EventPropagation />
// );

// root.render(
//   <EventOnce />
// );

// root.render(
//   <EventPassive />
// );
// #endregion

// #region ■■chap04■■
// root.render(
//   <StateForm />
// );

// root.render(
//   <StateFormUC />
// );

// root.render(
//   <FormTextarea />
// );

// root.render(
//   <FormSelect />
// );

// root.render(
//   <FormList />
// );

// root.render(
//   <FormRadio />
// );

// root.render(
//   <FormCheck />
// );

// root.render(
//   <FormCheckMulti />
// );

// root.render(
//   <FormFile />
// );

// root.render(
//   <StateNest />
// );

// root.render(
//   <StateNestImmer />
// );

// root.render(
//   <StateNestImmer2 />
// );

// root.render(
//   <StateTodo />
// );

// root.render(
//   <FormBasic />
// );

// root.render(
//   <FormYup />
// );

// root.render(
//   <FormJapan />
// );
// #endregion

// #region ■■chap05■■
// root.render(
//   <LazyBasic />
// );

// root.render(
//   <LazyMulti />
// );

// root.render(
//   <SuspenseSimple />
// );

// root.render(
//   <SuspenseResult />
// );

// root.render(
//   <ProfilerBasic />
// );

// root.render(
//   <ModuleBasic />
// );

// root.render(
//   <>
//     <h3 className="head">CSS Modules</h3>
//     <ModuleBasic />
//   </>
// );

// root.render(
//   <ModuleTheme theme={style1} />
// );

// root.render(
//   <ModuleNest />
// );

// root.render(
//   <EmotionBasic />
// );

// const global = css`
//   body {
//     background-color: Yellow;
//   }
// `;

// root.render(
//   <>
//     <Global styles={global} />
//     <EmotionBasic />
//   </>
// );

// root.render(
//   <EmotionStyled />
// );

// root.render(
//   <>
//     <MyButton>ボタン</MyButton>
//     <MyStyledButton>ボタン</MyStyledButton>
//   </>
// );

// root.render(
//   <EmotionProps />
// );

// root.render(
//   <MotionBasic />
// );

// root.render(
//   <MotionWhile />
// );

// root.render(
//   <MotionExit />
// );

// root.render(
//   <MotionRepeat />
// );

// root.render(
//   <MotionAll />
// );

// root.render(
//   <MotionVariant />
// );

// root.render(
//   <MotionNest />
// );

// root.render(
//   <MotionFrame />
// );

// root.render(
//   <>
//     <div id="dialog"></div>
//     <PortalBasic />
//   </>
// );

// root.render(
//   <ErrorRoot />
// );

// root.render(
//   <ErrorRetryRoot />
// );

// root.render(
//   <ErrorEventRoot />
// );

// root.render(
//   <MetaBasic />
// );

// root.render(
//   <ScriptBasic />
// );

// root.render(
//   <StyleBasic />
// );

// root.render(
//   <StyleInline />
// );
// #endregion

// #region ■■chap06■■
// root.render(
//   <MaterialBasic />
// );

// root.render(
//   <MaterialDrawer />
// );

// root.render(
//   <MaterialGrid />
// );

// root.render(
//   <ThemeProvider theme={theme}>
//     <CssBaseline />
//     <MaterialBasic />
//   </ThemeProvider>
// );

// root.render(
//   <MaterialMode />
// );

// root.render(
//   <FormMui />
// );

// root.render(
//   <SWRPre />
// );

// root.render(
//   <SWRBasic />
// );

// root.render(
//   <SWRApp />
// );

// root.render(
//   <SWRCompare />
// );

// root.render(
//   <SWRRender />
// );

// #endregion

// #region ■■chap07■■
// root.render(
//   <StateEffect init={0} />
// );

// root.render(
//   <HookTimer init={10} />
// );

// root.render(
//   <HookEffect init={10} />
// );

// root.render(
//   <HookRefNg />
// );

// root.render(
//   <HookRef />
// );

// root.render(
//   <HookRefForward />
// );

// root.render(
//   <HookCallbackRef />
// );

// root.render(
//   <HookReducer init={0} />
// );

// root.render(
//   <HookReducerUp init={0} />
// );

// root.render(
//   <HookReducerInit init={0} />
// );

// root.render(
//   <HookContext />
// );

// root.render(
//   <MyThemeProvider>
//     <HookThemeButton />
//   </MyThemeProvider>
// );

// function fetchInfo() {
//   return new Promise(resolve => {
//     setTimeout(() => resolve('Promiseの結果です！'), 5000);
//   });
// }

// root.render(
//   <Suspense fallback={<div>Loading...</div>}>
//     <UsePromise service={fetchInfo()} />
//   </Suspense>
// );

// root.render(
//   <JotaiCounter />
// );

// root.render(
//   <JotaiTodo />
// );

// root.render(
//   <Suspense fallback={<div>Loading...</div>}>
//     <JotaiAsync />
//   </Suspense>
// );

// root.render(
//   <JotaiTodoUp />
// );

// root.render(
//   <>
//     <JotaiCounter />
//     <JotaiCounter />
//     <JotaiCounter />
//   </>
// );

// root.render(
//   <>
//     <Provider>
//       <JotaiCounter />
//     </Provider>
//     <Provider>
//       <JotaiCounter />
//     </Provider>
//     <Provider>
//       <JotaiCounter />
//     </Provider>
//   </>
// );

// const store = createStore();
// root.render(
//   <>
//     <Provider store={store}>
//       <JotaiCounter />
//     </Provider>
//     <Provider>
//       <JotaiCounter />
//     </Provider>
//     <Provider store={store}>
//       <JotaiCounter />
//     </Provider>
//   </>
// );
// #endregion

// #region ■■chap08■■
// root.render(
//   <HookMemo />
// );

// root.render(
//   <HookTransition />
// );

// root.render(
//   <HookDeferred />
// );

// root.render(
//   <HookDeferredTransition />
// );

// root.render(
//   <ActionPre />
// );

// root.render(
//   <ActionBasic />
// );

// root.render(
//   <ActionOptimistic />
// );

// root.render(
//   <HookCustom />
// );
// #endregion

// #region ■■column■■
// root.render(
//   <MyStore />
// );
// #endregion
