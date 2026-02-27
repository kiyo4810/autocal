export default function StyleInline() {
  return (
    <>
      <style href="comps_style" precedence="medium">{`
        .main { background-color: White; }
      `}</style>
      <div className="main">
        こんにちは、StyleInline！
      </div>
    </>
  );
}