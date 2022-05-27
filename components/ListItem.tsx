import Image from 'next/image'
import Link from 'next/link';
import { formatShortMonthDate } from '../lib/helpers/date';
import { IListItem } from '../lib/helpers/format';

const ListItem: React.FC<IListItem> = ({ title, poster, type, id, date }) => {
  return (
    <li className='relative flex flex-col'>
      <Link href={`/${type}/${id}`}>
        <a className="block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-2 aspect-h-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
          <Image
            src={`${poster}`}
            alt=""
            layout="raw"
            height={330}
            width={220}
            className="object-cover pointer-events-none group-hover:opacity-75"
          />
        </a>
      </Link>
      <p className="block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none">{title}</p>
      {date ? <p className="block text-sm font-medium text-gray-500 pointer-events-none">{formatShortMonthDate(date)}</p> : ''}
    </li>
  )
}

export default ListItem;
