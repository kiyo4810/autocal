import { useActionState, useOptimistic, useState } from 'react';
import { updateForm } from './actions';
import ActionSpinner from './ActionSpinner';

export default function ActionOptimistic() {
  const [books, setBooks] = useState([]);
  const [optimisticBooks, setOptimisticBooks] = useOptimistic(
    books,
    (prevBooks, formData) => {
      return [...prevBooks, {
        id: crypto.randomUUID(),
        title: formData.get('title'),
        price: formData.get('price'),
        published: formData.get('published'),
        updating: true
      }];
    }
  );

  const [error, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      setOptimisticBooks(formData);
      const { result, errors } = await updateForm({
        id: crypto.randomUUID(),
        title: formData.get('title'),
        price: formData.get('price'),
        published: formData.get('published')
      });
      if (!errors) {
        setBooks(prevBooks => [...prevBooks, result]);
      }
      return errors;
    },
    null
  );

  return (
    <form action={submitAction} noValidate>
      <ActionSpinner />
      <ul>
        {error?.map(msg => <li key={msg}>{msg}</li>)}
      </ul>
      <div>
        <label htmlFor="title">書名：</label><br />
        <input id="title" name="title" type="text" size="20" />
      </div>
      <div>
        <label htmlFor="price">価格：</label><br />
        <input id="price" name="price" type="number" />円
      </div>
      <div>
        <label htmlFor="published">刊行日：</label><br />
        <input id="published" name="published" type="date" />
      </div>
      <div>
        <button type="submit" disabled={isPending}>登録</button>
      </div>
      <ul>
        {optimisticBooks.map(book => (
          <li key={book.id}>
            {book.title} - {book.price}円 - {book.published}
            {book.updating && <small> (Updating...)</small>}
          </li>
        ))}
      </ul>
    </form>
  );
}