import { Fragment } from 'react';

export default function ForList({ src }) {
  return (
    <dl>
      {/* {src.map(elem => (
        <>
          <dt>
            <a href={`https://wings.msn.to/books/${elem.isbn}/${elem.isbn}.jpg`}>
              {elem.title}（{elem.price}円）
            </a>
          </dt>
          <dd>{elem.summary}</dd>
        </>
      ))} */}

      {/* {src.map(b => (
        <>
          <dt>
            <a href={`https://wings.msn.to/books/${b.isbn}/${b.isbn}.jpg`}>
              {b.title}（{b.price}円）
            </a>
          </dt>
          <dd>{b.summary}</dd>
        </>
      ))} */}

      {src.map(elem => (
        <Fragment key={elem.isbn}>
          <dt>
            <a href={`https://wings.msn.to/books/${elem.isbn}/${elem.isbn}.jpg`}>
              {elem.title}（{elem.price}円）
            </a>
          </dt>
          <dd>{elem.summary}</dd>
        </Fragment>
      ))}

      {/* 以下、望ましくないコード */}
      {/* {src.map((elem, index) => (
        <Fragment key={index}>
          <dt>
            <a href={`https://wings.msn.to/books/${elem.isbn}/${elem.isbn}.jpg`}>
              {elem.title}（{elem.price}円）
            </a>
          </dt>
          <dd>{elem.summary}</dd>
        </Fragment>
      ))} */}
    </dl>
  );
}