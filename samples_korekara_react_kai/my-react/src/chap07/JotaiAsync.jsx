import { useAtomValue } from 'jotai';
import { postsAtom } from '../store/atom';

export default function JotaiAsync() {
  const posts = useAtomValue(postsAtom);
  return <div>{JSON.stringify(posts)}</div>;
};
