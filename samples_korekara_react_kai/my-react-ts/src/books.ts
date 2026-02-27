import type { Book } from './Book';

const books: Book[] = [
  {
    isbn: '978-4-8156-1336-5',
    title: 'これからはじめるVue.js 3実践入門',
    price: 3740,
    summary: 'JavaScriptフレームワーク「Vue.js」について解説した入門書です。',
    download: true,
  },
  {
    isbn: '978-4-297-14598-9',
    title: 'Rails アプリケーションプログラミング',
    price: 3960,
    summary: 'Scaffolding機能から、ビュー／モデル／コントローラー開発、ルーティング、テスト、クライアントサイド開発まで、Railsの主要機能を徹底解説します。',
    download: true,
  },
  {
    isbn: '978-4-7981-8055-7',
    title: '独習ASP.NET Core',
    price: 4290,
    summary: 'ASP.NET Coreの基本から、実践的・発展的内容まで、丁寧かつ網羅的に解説します。',
    download: true,
  },
  {
    isbn: '978-4-296-07070-1',
    title: '作って学べるHTML＋JavaScriptの基本',
    price: 2420,
    summary: 'HTML＋JavaScriptを使って簡単なサンプルアプリを作りながら、Android／iPhoneの両方に対応したWebアプリを作成できる入門書です。',
    download: false,
  },
  {
    isbn: '978-4-627-85711-7',
    title: 'Pythonでできる! 株価データ分析',
    price: 2970,
    summary: '株に興味があるPythonプログラマーを対象に、Pythonを使った株価分析の手法を解説します。',
    download: false,
  },
];
export default books;