"use client";

import PostCard from "@/components/PostCard";
import ProfileCard from "@/components/ProfileCard";
import posts from "@/helpers/posts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import millify from "millify";
import { AiOutlineHeart } from "react-icons/ai";
import { GrArticle } from "react-icons/gr";

const Profile = () => {
  const session = useSession();
  const router = useRouter();

  if (!session || session.status === "unauthenticated") {
    router.push("/signin");
    return null;
  }

  return session.status === "authenticated" ? (
    <>
      <ProfileCard
        name={session.data.user?.name as string}
        about="I am a Full Stack Developer and a UI/UX Designer."
        email={session.data.user?.email as string}
        image={session.data.user?.image as string}
      />
      <div className="relative flex flex-col md:flex-row items-start gap-4 mb-4">
        <div className="flex flex-col gap-4 w-full md:w-1/3 bg-violet-50 border-2 transition-all hover:border-violet-500 rounded-md top-20 md:sticky p-4">
          <h3 className="flex flex-row flex-nowrap items-center gap-2">
            <GrArticle className="text-xl mt-[1px]" />
            <span>{millify(85)} Articles Published</span>
          </h3>
          <h3 className="flex flex-row flex-nowrap items-center gap-2">
            <AiOutlineHeart className="text-xl mt-[1px]" />
            <span>{millify(25000)} Total Likes</span>
          </h3>
        </div>
        <div className="w-full flex flex-col gap-4 md:w-2/3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              content={post.content}
              date={post.date}
              views={post.views}
              id={post.id}
            />
          ))}
        </div>
      </div>
    </>
  ) : (
    <>{/* Add loading state element here */}</>
  );
};

export default Profile;
