import { type ChangeEvent, type MouseEvent, type MouseEventHandler, useState } from 'react';
import './StateTodo.css';

type Todo = {
  id: number;
  title: string;
  created: Date;
  isDone: boolean;
};

export default function StateTodo() {
  const [maxId, setMaxId] = useState(1);
  const [desc, setDesc] = useState(true);
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState<Todo[]>([]);

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleClick = () => {
    setTodo([
      ...todo,
      {
        id: maxId,
        title,
        created: new Date(),
        isDone: false
      }
    ]);
    setMaxId(id => id + 1);
  };

  const handleDone = (e: MouseEvent<HTMLButtonElement>) => {
    setTodo(todo.map(item => {
      if (item.id === Number(e.currentTarget.dataset.id)) {
        return {
          ...item,
          isDone: true
        };
      } else {
        return item;
      }
    }));
  };

  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    setTodo(todo.filter(item =>
      item.id !== Number(e.currentTarget.dataset.id)
    ));
  };

  // const handleRemove: MouseEventHandler<HTMLButtonElement> = e => {
  //   setTodo(todo.filter(item =>
  //     item.id !== Number(e.target.dataset.id)
  //   ));
  // };

  const handleSort = () => {
    const sorted = [...todo];
    sorted.sort((m, n) => {
      if (desc) {
        return n.created.getTime() - m.created.getTime();
      } else {
        return m.created.getTime() - n.created.getTime();
      }
    });
    setDesc(d => !d);
    setTodo(sorted);
  };

  return (
    <div>
      <label>
        やること：
        <input type="text" name="title"
          value={title} onChange={handleChangeTitle} />
      </label>
      <button type="button"
        onClick={handleClick}>追加</button>
      <button type="button"
        onClick={handleSort}>
        ソート（{desc ? '↑' : '↓'}）</button>
      <hr />
      {/* <ul>
        {todo.map(item => (
          <li key={item.id}>{item.title}</li>
          ))}
      </ul> */}
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