import { useErrorBoundary } from 'react-error-boundary';

export default function ErrorEvent() {
  const { showBoundary } = useErrorBoundary();
  const handleClick = () => {
    // throw new Error('An error occurred in MyApp.');

    try {
      throw new Error('An error occurred in MyApp.');
    } catch (e) {
      showBoundary(e);
    }
  };
  return (
    <button type="button" onClick={handleClick}>
      エラー発射
    </button>
  );
}