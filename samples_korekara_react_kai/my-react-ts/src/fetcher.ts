export type WeatherType = {
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
};

export default async function fetcher(url: string): Promise<WeatherType> {
  await sleep(2000);
  const res = await fetch(url);
  if (res.ok) { return await res.json(); }
  throw new Error(res.statusText);
}

function sleep(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}