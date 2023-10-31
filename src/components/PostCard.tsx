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
    <div className="dark:bg-gray-700 flex flex-col justify-between gap-2 p-2 border-2 transition-all bg-violet-100 hover:shadow-md rounded-md hover:border-violet-500">
      <div className="font-semibold hover:underline hover:text-violet-800 text-lg dark:text-violet-400 text-slate-800 text-ellipsis line-clamp-2 max-w-fit">
        {props.title}
      </div>
      <div>
        <div className="text-ellipsis line-clamp-3 dark:text-gray-200 text-slate-800">
          {props.content}
        </div>
        <div className="flex justify-end items-center">
          <Link
            className="relative right-0 text-base hover:underline w-fit dark:text-gray-200 text-slate-800 hover:text-violet-800 dark:hover:text-violet-400"
            href={"#"}
          >
            Read more
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="flex items-center dark:text-gray-400 text-slate-800 gap-2">
          <SlCalender />{" "}
          <span className="italic text-sm">
            {formatDate(props.date as string)}
          </span>
        </p>
        <p className="flex items-center dark:text-gray-400 text-slate-800 gap-1">
          <FiEye />
          {millify(props.views)}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
