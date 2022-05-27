import { formatRuntime, formatShortMonthDate } from '../lib/helpers/date';

export interface Meta {
  item: {
    runtime?: number | undefined;
    genres: any[];
    release_date?: string | undefined;
    first_air_date?: string | undefined;
    episode_run_time?: Array<number> | undefined;
  }
}

const Meta = ({ item }: Meta) => {
  const runtime = (item?.episode_run_time) ? item.episode_run_time[0] : item.runtime;
  const date = (item?.first_air_date) ? item.first_air_date : item.release_date;
  return (
    <div className="flex mt-5 text-gray-400">
      <span className="mr-5">{formatRuntime(runtime)}</span>
      <ul className="flex mr-5">{
        item.genres.map((genre) =>
          <li key={genre.id}>{genre.name},&nbsp;</li>
        )
      }</ul>
      <span>{formatShortMonthDate(date)}</span>
    </div>
  )
}

export default Meta;