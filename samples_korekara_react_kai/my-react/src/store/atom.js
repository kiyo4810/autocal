import { atom } from 'jotai';
import { atomWithReset, atomWithStorage } from 'jotai/utils';
// import { atomWithReset, atomWithStorage, createJSONStorage } from 'jotai/utils';

// export const counterAtom = atom(0);
export const counterAtom = atomWithReset(0);

// const sessionStorageStore = createJSONStorage(() => sessionStorage);
// export const todosAtom = atom([

export const todosAtom = atomWithStorage('todos', [
  {
    id: 1,
    title: 'WINGS会議の資料作成',
    isDone: false,
  },
  {
    id: 2,
    title: '報酬料の振込',
    isDone: true,
  },
  {
    id: 3,
    title: 'A書籍のサポートページ作成',
    isDone: true,
  },
  {
    id: 4,
    title: '読者質問への回答',
    isDone: false,
  },
  {
    id: 5,
    title: 'B出版社と打ち合わせ',
    isDone: false,
  },
]);
// ], sessionStorageStore);

export const todoLastIdAtom = atom(get => {
  const todos = get(todosAtom);
  return todos.at(-1)?.id ?? 0;
});

export const postsAtom = atom(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json();
});

export const todoAddAtom = atom(null, (get, set, title) => {
  set(todosAtom, [
    ...get(todosAtom),
    {
      id: get(todoLastIdAtom) + 1,
      title,
      isDone: false
    }
  ]);
});

export const todoDoneAtom = atom(null, (get, set, id) => {
  set(todosAtom,
    get(todosAtom).map(item => {
      if (item.id === Number(id)) {
        return {
          ...item,
          isDone: true
        };
      } else {
        return item;
      }
    })
  );
});

export const todoRemoveAtom = atom(null, (get, set, id) => {
  set(todosAtom,
    get(todosAtom).filter(item =>
      item.id !== Number(id)
    )
  );
});
