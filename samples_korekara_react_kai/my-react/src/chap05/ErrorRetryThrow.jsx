export default function ErrorRetryThrow() {
  if (Math.random() < 0.6) {
    throw new Error('An error occurred in MyApp.');
  }
  return (
    <p>正しく実行されました。</p>
  );
}