import type { CSSProperties } from 'react';

type StyleTypeProps = {
  style: CSSProperties;
};

export default function StyleType({ style }: StyleTypeProps) {
  return (
    <div style={style}>
      <h3>WINGSメンバー募集中！</h3>
      <p>あなたもWINGSプロジェクトに参加しませんか？<br />
        現在、WINGSプロジェクトでは、ご一緒にお仕事ができる仲間を募集中です。</p>
    </div>
  );
}
