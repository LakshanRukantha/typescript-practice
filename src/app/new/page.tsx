"use client";

import { signOut, useSession } from "next-auth/react";

const NewPost = () => {
  const session = useSession();

  return (
    <div className="flex flex-col gap-4">
      <span
        className={`${
          session.status === "authenticated" ? "bg-green-300" : "bg-red-300"
        }`}
      >
        {session.status === "authenticated"
          ? `${session.data.user?.name} you are ${session.status}`
          : `Hey user you are ${session.status}`}
      </span>
      {session.status === "authenticated" && (
        <button
          type="button"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default NewPost;
