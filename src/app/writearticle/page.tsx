"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { GenerateUID } from "@/utils/GenerateUID";
import LoadingScreen from "@/components/LoadingScreen";
import Button from "@/components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFileUpload } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type ArticleBody = {
  uniqueId: string;
  title: string;
  content: string;
  author: string;
};

const WriteArticle = () => {
  const session = useSession();

  const form = useForm<ArticleBody>({
    defaultValues: {
      uniqueId: "",
      title: "",
      content: "",
      author: "",
    },
    mode: "onTouched",
    resolver: undefined,
  });

  const { register, handleSubmit, reset, formState } = form;
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  // If session is loading, show loading screen and if session is unauthenticated, redirect to sign in page
  if (session.status === "loading") {
    return <LoadingScreen />;
  } else if (session.status === "unauthenticated") {
    redirect("/signin");
  }

  const onSubmit = (data: ArticleBody) => {
    data.uniqueId = GenerateUID(data.title as string);
    data.author = session?.data?.user?.email as string;
    setTimeout(() => {
      console.log(data);
      reset();
    }, 2000);

    // Notification Toast
    if (data.uniqueId && data.title && data.content && data.author) {
      toast.success(
        `Article: ${data.uniqueId} published as ${data.author} successfully.`,
        {
          position: toast.POSITION.TOP_CENTER,
          draggable: false,
        }
      );
    } else {
      toast.error(`Oops! Something went wrong. Please try again.`, {
        position: toast.POSITION.TOP_CENTER,
        draggable: false,
      });
    }
  };

  return (
    session.status === "authenticated" && (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border bg-violet-100 dark:bg-zinc-800 mt-5 p-2 min-h-[calc(100vh-160px)] rounded-md"
      >
        <ToastContainer />
        <div className="flex w-full items-center justify-between">
          <h2 className="md:text-3xl text-2xl dark:text-zinc-100 font-bold text-zinc-700">
            Write Your Post
          </h2>
          <Button
            type="submit"
            title={isSubmitting ? "Publishing..." : "Publish"}
            priority="secondary"
            icon={<FaFileUpload className="text-xl" />}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <label className="text-2xl mt-4 text-zinc-700 dark:text-zinc-100">
            Title
          </label>
          <input
            {...register("title")}
            disabled={isSubmitting}
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
            {...register("content")}
            disabled={isSubmitting}
            className="w-full min-h-[calc(100vh-360px)] text-xl text-zinc-700 dark:text-zinc-100 pb-[5px] pt-1 px-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder="Type your idea..."
          ></textarea>
        </div>
      </form>
    )
  );
};

export default WriteArticle;
