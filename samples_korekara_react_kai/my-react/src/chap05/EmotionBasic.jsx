/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function EmotionBasic() {
  const styles = css`
    width: 300px;
    padding: 10px;
    border: 1px solid #000;
    border-radius: 5px;
    background-color: royalblue;
    color: white;
  `;

  // const styles = css({
  //   width: 300,
  //   padding: 10,
  //   border: '1px solid #000',
  //   borderRadius: 5,
  //   backgroundColor: 'royalblue',
  //   color: 'white',
  // });

  // const others = css({
  //   height: 150
  // });

  // const plus = css`
  //   ${styles}
  //   margin: 20px;
  // `;

  return (
    <div css={styles}><b>React</b>は、フロントエンド開発のためのJavaScriptライブラリです。</div>
    // <div css={[styles, others]}><b>React</b>は、フロントエンド開発のためのJavaScriptライブラリです。</div>
    // <div css={plus}><b>React</b>は、フロントエンド開発のためのJavaScriptライブラリです。</div>
  );
}