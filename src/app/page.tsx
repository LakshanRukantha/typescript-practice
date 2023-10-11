"use client";

import PostCard from "@/components/PostCard";
import posts from "@/helpers/posts";
import { useSession } from "next-auth/react";
import NewArticleBtn from "@/components/NewArticleBtn";

export default function Home() {
  const session = useSession();
  return (
    <main>
      <div className="grid my-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {session.status === "authenticated" && <NewArticleBtn url="/new" />}
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
    </main>
  );
}
