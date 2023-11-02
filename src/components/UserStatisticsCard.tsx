import millify from "millify";
import { AiOutlineHeart } from "react-icons/ai";
import { GiSpellBook} from "react-icons/gi";
import Divider from "./Divider";
import NewArticleBtn from "./NewArticleBtn";

const UserStatisticsCard = () => {
  return (
    <div className="flex flex-col w-full gap-1">
      <h3 className="flex flex-row flex-nowrap items-center gap-1 md:gap-2">
        <GiSpellBook className="text-xl mt-[1px] dark:text-zinc-50 text-zinc-800" />
        <span>{millify(85)} Articles Published</span>
      </h3>
      <Divider />
      <h3 className="flex flex-row flex-nowrap items-center gap-1 md:gap-2">
        <AiOutlineHeart className="text-xl mt-[1px] dark:text-zinc-50 text-zinc-800" />
        <span>{millify(25000)} Total Likes</span>
      </h3>
      <Divider />
      <NewArticleBtn url="/writearticle" />
    </div>
  );
};

export default UserStatisticsCard;
