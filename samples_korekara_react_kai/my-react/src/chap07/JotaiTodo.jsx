import { useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { todosAtom, todoLastIdAtom } from '../store/atom';
import '../chap04/StateTodo.css';

export default function JotaiTodo() {
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useAtom(todosAtom);
  const maxId = useAtomValue(todoLastIdAtom);
  // const [maxId] = useAtom(todoLastIdAtom);

  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };
  const handleAdd = () => {
    setTodo([
      ...todo,
      {
        id: maxId + 1,
        title,
        isDone: false
      }
    ]);
  };
  const handleDone = e => {
    setTodo(todo.map(item => {
      if (item.id === Number(e.target.dataset.id)) {
        return {
          ...item,
          isDone: true
        };
      } else {
        return item;
      }
    }));
  };
  const handleRemove = e => {
    setTodo(todo.filter(item =>
      item.id !== Number(e.target.dataset.id)
    ));
  };

  return (
    <div>
      <label>
        やること：
        <input type="text" name="todo"
          value={title} onChange={handleChangeTitle} />
      </label>
      <button type="button"
        onClick={handleAdd}>追加</button>
      <hr />
      <ul>
        {todo.map(item => (
          <li key={item.id}
            className={item.isDone ? 'done' : ''}>
            {item.title}
            <button type="button"
              onClick={handleDone} data-id={item.id}>済
            </button>
            <button type="button"
              onClick={handleRemove} data-id={item.id}>削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}