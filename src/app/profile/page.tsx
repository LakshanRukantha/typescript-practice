"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Button from "../components/Button";
import { useRouter } from "next/navigation";

const Profile = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated") {
    router.push("/signin");
  }
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return session.status === "authenticated" ? (
    <div className="max-w-xl w-full mx-auto flex flex-col border p-4 gap-4 shadow rounded mt-8">
      <div className="flex flex-row items-start justify-between">
        <Image
          src={session.data?.user?.image as string}
          className="border rounded-full hover:shadow"
          width={100}
          height={100}
          alt={`profile ${session.data?.user?.name}`}
        />
        <Button title="Sign Out" hasAction={true} taskFunc={handleSignOut} />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Name: <span className="font-normal">{session.data?.user?.name}</span>
        </h2>
        <h2 className="text-lg font-semibold text-slate-800">
          Email:{" "}
          <span className="font-normal">{session.data?.user?.email}</span>
        </h2>
        <h2 className="text-lg font-semibold text-slate-800">
          Status:{" "}
          <span className="font-normal bg-green-300 px-2 rounded-full">
            {session.status}
          </span>
        </h2>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Profile;
