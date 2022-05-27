import { Data, dataMutation } from "../lib/helpers/dataMutation";
import { formatPerson } from "../lib/helpers/format";
import { Cast, ICredits } from "../types/credits";
import List from "./List";

const Credits: React.FC<{ credits: ICredits }> = ({ credits }) => {
  const cast = credits.cast.slice(0, 6).map((item: Cast) => formatPerson(item));
  return (
    <div className="mt-5 text-gray-400 mb-9">
      <List title="Top billed cast" listData={cast} />
    </div>
  )
}

export default Credits;