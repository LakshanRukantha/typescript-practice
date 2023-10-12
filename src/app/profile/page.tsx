"use client";

import Button from "@/components/Button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiOutlineLogout, HiOutlineMail } from "react-icons/hi";

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
    <div className="w-full mx-auto flex flex-col border md:p-4 shadow rounded my-5">
      <div className="relative flex max-h-[75px] flex-row rounded-t bg-violet-100 items-start justify-between p-4">
        <div className="relative top-2">
          <Image
            src={session.data?.user?.image as string}
            className="relative border-8 border-violet-100 outline outline-2 hover:outline-violet-500 transition-all rounded-full"
            width={100}
            height={100}
            alt={`profile ${session.data?.user?.name}`}
          />
          <div className="absolute flex h-3 w-3 top-2 right-2">
            <span className="absolute animate-ping rounded-full h-3 w-3 bg-green-500"></span>
            <span className="inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
        </div>
        <div className="h-full my-auto">
          <Button
            title="Sign Out"
            priority="secondary"
            hasAction={true}
            icon={<HiOutlineLogout className="text-xl" />}
            taskFunc={handleSignOut}
          />
          {/* <div className={`hidden md:block`}>
            <Button
              title="Sign Out"
              priority="secondary"
              hasAction={true}
              icon={<HiOutlineLogout className="text-xl" />}
              taskFunc={handleSignOut}
            />
          </div>
          <div className={`block md:hidden`}>
            <Button
              title=""
              priority="secondary"
              hasAction={true}
              icon={<HiOutlineLogout className="text-xl" />}
              taskFunc={handleSignOut}
            />
          </div> */}
        </div>
      </div>
      <div className="pt-16 pb-4 md:pb-0 px-4 md:px-0">
        <h1 className="text-3xl font-bold text-slate-800">
          {session.data?.user?.name}
        </h1>

        <p className="text-gray-500 flex items-center gap-1">
          <HiOutlineMail className="text-xl mt-[1px]" />
          <span>{session.data?.user?.email}</span>
        </p>
      </div>
    </div>
  ) : (
    <>{/* Add loading state element here */}</>
  );
};

export default Profile;
