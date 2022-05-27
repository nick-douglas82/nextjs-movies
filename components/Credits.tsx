import { Data, dataMutation } from "../lib/helpers/dataMutation";
import List from "./List";

const Credits = ({ credits }: any) => {
  console.log(credits)
  const cast = credits.cast.slice(0, 6).map((data: Data) => dataMutation(data, "person"));
  return (
    <div className="mt-5 text-gray-400 mb-9">
      <List title="Top billed cast" listData={cast} />
    </div>
  )
}

export default Credits;