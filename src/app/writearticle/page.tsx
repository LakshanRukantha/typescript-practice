"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import Button from "@/components/Button";
import { FaFileUpload } from "react-icons/fa";

const WriteArticle = () => {
  const session = useSession();

  // If session is loading, show loading screen and if session is unauthenticated, redirect to sign in page
  if (session.status === "loading") {
    return <LoadingScreen />;
  } else if (session.status === "unauthenticated") {
    redirect("/signin");
  }
  return (
    session.status === "authenticated" && (
      <form className="border bg-violet-100 dark:bg-zinc-800 mt-5 p-2 min-h-[calc(100vh-160px)] rounded-md">
        <div className="flex w-full items-center justify-between">
          <h2 className="md:text-3xl text-2xl dark:text-zinc-100 font-bold text-zinc-700">
            Write Your Post
          </h2>
          <Button
            title={false ? "Publishing..." : "Publish"}
            priority="secondary"
            hasAction={true}
            icon={<FaFileUpload className="text-xl" />}
            taskFunc={() => console.log(`Post Published! ${new Date()}`)}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <label className="text-2xl mt-4 text-zinc-700 dark:text-zinc-100">
            Title
          </label>
          <input
            type="text"
            className="w-full text-xl text-zinc-700 dark:text-zinc-100 pb-[5px] pt-1 px-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder="Enter title..."
          />
        </div>
        <div className="flex flex-1 flex-col">
          <label className="text-2xl mt-4 text-zinc-700 dark:text-zinc-100">
            Content
          </label>
          <textarea
            className="w-full min-h-[calc(100vh-360px)] text-xl text-zinc-700 dark:text-zinc-100 pb-[5px] pt-1 px-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder="Type your idea..."
          ></textarea>
        </div>
      </form>
    )
  );
};

export default WriteArticle;
