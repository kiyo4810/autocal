import styles from './ModuleNest.module.css';

export default function ModuleText() {
  return (
    <>
      <b className={styles.keyword}>React</b>は、フロントエンド開発のためのJavaScriptライブラリです。

      {/* <b className="keyword">React</b>は、フロントエンド開発のためのJavaScriptライブラリです。 */}
    </>
  );
}