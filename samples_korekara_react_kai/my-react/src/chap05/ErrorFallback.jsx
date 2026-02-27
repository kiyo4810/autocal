export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <h4>以下のエラーが発生しました。</h4>
      <p>{error.message}</p>
      <button type="button" onClick={resetErrorBoundary}>
        Retry
      </button>
    </div>
  );
}