"use client";

import Link from "next/link";
import { FiEye } from "react-icons/fi";

type PostCardProps = {
  title: string;
  content: string;
  date: string;
  views: number;
  id: string | number;
};

const PostCard = (props: PostCardProps) => {
  return (
    <div className="flex flex-col justify-between gap-2 p-2 border-2 transition-all bg-gradient-to-tr hover:shadow-md from-violet-100 rounded-md hover:border-violet-500">
      <div className="font-semibold hover:underline hover:text-violet-800 text-lg text-slate-800 text-ellipsis line-clamp-2 max-w-fit">
        {props.title}
      </div>
      <div>
        <div className="text-ellipsis line-clamp-3">{props.content}</div>
        <div className="flex justify-end items-center">
          <Link
            className="relative right-0 text-base hover:underline w-fit"
            href={"#"}
          >
            Read more
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p>
          Posted on: <span className="italic text-sm">{props.date}</span>
        </p>
        <p className="flex items-center gap-1">
          <FiEye />
          {props.views}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
