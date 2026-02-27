import { Fragment } from 'react';

export default function ForSort({ src }) {
  const sorted = [...src].sort((m, n) => m.price - n.price);
  return (
    <dl>
      {sorted.map(elem => (
        <Fragment key={elem.isbn}>
          <dt>
            <a href={`https://wings.msn.to/books/${elem.isbn}/${elem.isbn}.jpg`}>
              {elem.title}（{elem.price}円）
            </a>
          </dt>
          <dd>{elem.summary}</dd>
        </Fragment>
      ))}
    </dl>
  );
}