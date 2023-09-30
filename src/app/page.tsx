import PostCard from "./components/PostCard";
import posts from "@/helpers/posts";

export default function Home() {
  return (
    <main>
      <div className="grid my-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            content={post.content}
            date={post.date}
            id={post.id}
          />
        ))}
      </div>
    </main>
  );
}
