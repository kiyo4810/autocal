import useSWR from 'swr';

function useWeather() {
  const endpoint = 'https://api.openweathermap.org/data/2.5/weather?q=Tokyo&lang=ja&appid=xxxxxxxxxx';
  const { data } = useSWR(endpoint)
  return data;
}

export default function SWRDevide() {
  return (
    <div>
      <SWRHead />
      <SWRBody />
    </div>
  );
}

function SWRHead() {
  const data = useWeather();
  return (
    <figure>
      <img
        src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`}
        alt={data?.weather?.[0]?.main} />
      <figcaption>{data?.weather?.[0]?.description}</figcaption>
    </figure>
  );
}

function SWRBody() {
  const data = useWeather();
  return (
    <ul>
      <li>気温：{Math.floor(data?.main.temp - 273.15)} ℃</li>
      <li>風速：{data?.wind.speed} m/s</li>
      <li>湿度：{data?.main.humidity} %</li>
    </ul>
  );
}