import Link from "next/link";
import millify from "millify";
import { format, isThisYear } from "date-fns";
import { FiEye } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";

// Types for PostCard props
type PostCardProps = {
  title: string;
  content: string;
  date: string;
  views: number;
  id: string | number;
};

// Format date using date-fns
const formatDate = (date: string) => {
  const isInCurrentYear = isThisYear(new Date(date)) as boolean;
  const dateFormat = isInCurrentYear ? "MMM d" : "MMM d, yyyy";
  return format(new Date(date), dateFormat) as string;
};

const PostCard = (props: PostCardProps) => {
  return (
    <div className="flex flex-col justify-between gap-2 p-2 border-2 transition-all bg-gradient-to-tr hover:shadow-md from-violet-100 rounded-md hover:border-violet-500">
      <div className="font-semibold hover:underline hover:text-violet-800 text-lg text-slate-800 text-ellipsis line-clamp-2 max-w-fit">
        {props.title}
      </div>
      <div>
        <div className="text-ellipsis line-clamp-3 text-slate-800">
          {props.content}
        </div>
        <div className="flex justify-end items-center">
          <Link
            className="relative right-0 text-base hover:underline w-fit text-slate-800 hover:text-violet-800"
            href={"#"}
          >
            Read more
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="flex items-center gap-2">
          <SlCalender />{" "}
          <span className="italic text-sm">
            {formatDate(props.date as string)}
          </span>
        </p>
        <p className="flex items-center text-slate-800 gap-1">
          <FiEye />
          {millify(props.views)}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
