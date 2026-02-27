import { useFormStatus } from 'react-dom';
import loading from '../image/loading.gif';

export default function ActionSpinner() {
  const { pending, data } = useFormStatus();
  return (
    <>
      <p hidden={!pending}>
        <img src={loading} alt="Loading..." />
      </p>
    </>
  );

  // return (
  //   <p hidden={!pending}>「{data?.get('title')}」を処理中です... </p>
  // );
}