import useSWR from 'swr';
import fetcher from './fetcher';

function removeTS(obj) {
  if (!obj) return obj;
  const { timestamp: _, ...rest } = obj;
  return rest;
}

export default function SWRCompare() {
  const endpoint = 'https://wings.msn.to/tmp/it/ts.php';
  const { data, isLoading, error } = useSWR(endpoint, fetcher, {
    compare: (old_d, new_d) => {
      if (old_d === new_d) return true;
      return JSON.stringify(removeTS(old_d)) === JSON.stringify(removeTS(new_d));
    }
  });
  console.log(data);

  if (isLoading) { return <p>Loading...</p>; }
  if (error) { return <p>Error: {error.message}</p>; }
  return (
    <div>
      {data.name}（{data.timestamp}）
    </div>
  );
}