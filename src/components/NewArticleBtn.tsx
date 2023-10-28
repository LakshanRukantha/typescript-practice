import Link from "next/link";
import { FaFeatherAlt } from "react-icons/fa";

// Types for NewArticleBtn props
type NewArticleBtnProps = {
  url: string;
};

const NewArticleBtn = (props: NewArticleBtnProps) => {
  return (
    <Link
      href={props.url}
      className="flex flex-col items-center justify-center p-2 border-2 hover:bg-violet-100 transition-all bg-gradient-to-tr hover:shadow-md from-violet-100 rounded-md hover:border-violet-500"
    >
      <div className="flex flex-row items-center gap-3">
        <FaFeatherAlt className="text-2xl md:text-3xl text-violet-500" />
        <h2 className="text-lg font-semibold text-slate-800">
          Write New Article
        </h2>
      </div>
    </Link>
  );
};

export default NewArticleBtn;
