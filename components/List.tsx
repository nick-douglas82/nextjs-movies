import ListItem from '../components/ListItem'
import { IListItem } from '../lib/helpers/format';

type ListProps = {
  title?: string,
  listData: IListItem[],
};

const List: React.FC<ListProps> = ({ title, listData }) => {
  return (
    <>
      {title && (<div className="flex items-center pb-5 mt-14">
        <h3 className="flex-shrink-0 mr-6 text-lg font-medium leading-6 text-gray-900">{title}</h3>
        <div className="w-full h-px border-b border-gray-200"></div>
      </div>)}

      <ul className="grid grid-cols-4 mt-8 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-6 lg:gap-x-6">
        {listData.map((data, index) => <ListItem key={index} {...data} />)}
      </ul>
    </>
  )
}

export default List;
