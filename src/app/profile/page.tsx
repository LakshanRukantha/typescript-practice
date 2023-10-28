"use client";

import PostCard from "@/components/PostCard";
import ProfileCard from "@/components/ProfileCard";
import posts from "@/helpers/posts";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UserStatisticsCard from "@/components/UserStatisticsCard";
import NewArticleBtn from "@/components/NewArticleBtn";
import LoadingScreen from "@/components/LoadingScreen";
import { useEffect, useState } from "react";
import { getUserData } from "@/utils/User";

type UserProps = {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  createdAt: string;
};

const Profile = () => {
  const session = useSession();
  const [user, setUser] = useState<UserProps>({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      if (session.status === "authenticated") {
        await getUserData(session.data?.user?.email as string)
          .then((data: UserProps) => {
            setUser(data);
          })
          .catch((error) => {
            console.error("Error in getUserData:", error);
          });
      }
    };

    fetchUser();
  }, [session]);

  if (session.status === "loading") {
    return <LoadingScreen />;
  } else if (!session || session.status === "unauthenticated") {
    redirect("/signin");
  }

  return (
    session.status === "authenticated" && (
      <>
        <ProfileCard
          name={
            session.data.user?.name ||
            (`${user.firstName} ${user.lastName}` as string)
          }
          about="I am a Full Stack Developer and a UI/UX Designer."
          email={session.data.user?.email || (user.email as string)}
          image={session.data.user?.image || (user.avatar as string)}
          createdAt={user.createdAt as string}
        />
        <div className="relative flex flex-col md:justify-between md:flex-row items-start gap-4 mb-4">
          <div className="w-full flex flex-col gap-4 bg-white border shadow rounded-md p-4 md:w-1/3 md:sticky md:top-20">
            <UserStatisticsCard />
            <hr />
            <NewArticleBtn url="/writearticle" />
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
    )
  );
};

export default Profile;
