import styles from './ModuleBasic.module.css';

export default function ModuleBasic() {
  console.log(styles);
  return (
    <div className={styles.panel}>
      <b>React</b>は、フロントエンド開発のためのJavaScriptライブラリです。
    </div>
    // <div className={styles.shadowPanel}>
    //   <b>React</b>は、フロントエンド開発のためのJavaScriptライブラリです。
    // </div>
  );
}
