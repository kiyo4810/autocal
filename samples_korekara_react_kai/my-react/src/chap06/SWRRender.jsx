import useSWR from 'swr';
import fetcher from './fetcher';

export default function SWRRender() {
  const endpoint = 'https://api.openweathermap.org/data/2.5/weather?q=Tokyo2&lang=ja&appid=xxxxxxxxxx';
  const { data, error, isLoading, isValidating } = useSWR(endpoint, fetcher);
  console.log(`${data} | ${error} | ${isLoading} | ${isValidating}`);

  if (isLoading) { return <p>Loading...</p>; }
  if (error) { return <p>Error: {error.message}</p>; }

  // // 結果データ（data）だけを参照
  // const { data } = useSWR(endpoint, fetcher);
  // console.log(data);

  // if (!data) { return <p>Loading...</p>; }

  return (
    <figure>
      <img
        src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`}
        alt={data?.weather?.[0]?.main} />
      <figcaption>{data?.weather?.[0]?.description}</figcaption>
    </figure>
  );
}
