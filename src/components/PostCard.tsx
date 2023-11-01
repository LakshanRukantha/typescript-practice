import Link from "next/link";
import millify from "millify";
import { format, isThisYear } from "date-fns";
import { FiEye } from "react-icons/fi";
import { AiOutlineRead } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import Image from "next/image";

// Types for PostCard props
type PostCardProps = {
  author: string;
  profile_pic: string;
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
    <div className="dark:bg-zinc-800 flex flex-col justify-between gap-2 p-2 border-2 transition-all bg-violet-100 hover:shadow-md rounded-md hover:border-violet-500">
      <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
        <Image
          src={props.profile_pic as string}
          width={40}
          height={40}
          className="rounded-full border-2 h-11 w-11 border-violet-500"
          alt="Author"
        />
        <div className="flex flex-col items-start">
          <span className="-mt-1">{props.author}</span>
          <p className="flex text-sm items-center dark:text-zinc-400 text-zinc-800 gap-2">
            <SlCalender />{" "}
            <span className="text-sm">{formatDate(props.date as string)}</span>
          </p>
        </div>
      </div>
      <div className="font-semibold hover:underline hover:text-violet-800 hover:cursor-pointer text-2xl dark:text-violet-400 text-zinc-800 text-ellipsis line-clamp-2 max-w-fit">
        {props.title}
      </div>
      <div>
        <div className="text-ellipsis line-clamp-2 dark:text-zinc-200 text-zinc-800">
          {props.content}
        </div>
      </div>
      <div className="flex justify-between items-center mt-1">
        <Link
          className="flex items-center gap-2 hover:underline w-fit dark:text-zinc-200 text-zinc-800 hover:text-violet-800 dark:hover:text-violet-400"
          href={`/articles/${props.id}`}
        >
          <AiOutlineRead className="mt-[2px]" />
          Read more
        </Link>
        <p className="flex items-center dark:text-zinc-400 text-zinc-800 gap-1">
          <FiEye />
          {millify(props.views)}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
