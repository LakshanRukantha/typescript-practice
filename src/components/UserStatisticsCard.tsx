import millify from "millify";
import { AiOutlineHeart } from "react-icons/ai";
import { GrArticle } from "react-icons/gr";

const UserStatisticsCard = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="flex flex-row flex-nowrap items-center gap-2">
        <GrArticle className="text-xl mt-[1px]" />
        <span>{millify(85)} Articles Published</span>
      </h3>
      <hr />
      <h3 className="flex flex-row flex-nowrap items-center gap-2">
        <AiOutlineHeart className="text-xl mt-[1px]" />
        <span>{millify(25000)} Total Likes</span>
      </h3>
    </div>
  );
};

export default UserStatisticsCard;
