"use client";

import PostCard from "@/components/PostCard";
import ProfileCard from "@/components/ProfileCard";
import posts from "@/helpers/posts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserStatisticsCard from "@/components/UserStatisticsCard";

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
      <div className="relative flex flex-col md:justify-between md:flex-row items-start gap-4 mb-4">
        <UserStatisticsCard />
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
