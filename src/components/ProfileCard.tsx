import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Button from "./Button";
import { HiOutlineLogout, HiOutlineMail } from "react-icons/hi";
import { RiCake2Line, RiTwitterXFill } from "react-icons/ri";
import { AiFillGithub } from "react-icons/ai";

type ProfileCardProps = {
  name: string;
  about?: string;
  email: string;
  image: string;
  urls?: string[];
};

const handleSignOut = () => {
  signOut({ callbackUrl: "/" });
};

const ProfileCard = (props: ProfileCardProps) => {
  return (
    <div className="w-full mx-auto flex flex-col border md:p-4 shadow rounded-md my-5">
      <div className="relative flex max-h-[75px] flex-row rounded-t md:rounded-t bg-violet-100 items-start justify-between p-4">
        <div className="relative flex items-center justify-center top-2">
          <Image
            src={props.image}
            className="relative border-8 border-violet-100 outline outline-2 h-24 w-24 outline-white transition-all rounded-full"
            width={100}
            height={100}
            alt={`Avatar ${props.name}`}
          />
          <span className="absolute animate-spin duration-1000 h-[100px] w-[100px] rounded-full mx-auto border-2 border-transparent hover:border-y-violet-500"></span>
          <div className="absolute flex items-center justify-center h-4 w-4 top-[6px] right-[6px]">
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
      <div className="pt-14 pb-4 md:pb-0 px-4 md:px-0">
        <h1 className="text-3xl font-bold text-slate-800">{props.name}</h1>
        {props.about && (
          <p className="text-gray-600 text-base font-normal md:text-lg text-ellipsis line-clamp-2 ">
            {props.about}
          </p>
        )}
        <hr className="bg-slate-500 my-3" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <p className="text-gray-500 flex items-center gap-1">
              <HiOutlineMail className="text-xl mt-[1px]" />
              <span>{props.email}</span>
            </p>
            <p className="text-gray-500 flex items-center gap-1">
              <RiCake2Line className="text-xl mt-[1px]" />
              <span>Joined on 2023-08-15</span>
            </p>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            {!props.urls?.includes("github") && (
              <Link
                href={""}
                className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
              >
                <AiFillGithub className="text-xl mt-[1px]" />
                <span>GitHub</span>
              </Link>
            )}
            {!props.urls?.includes("twitter") && (
              <Link
                href={""}
                className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
              >
                <RiTwitterXFill className="text-xl mt-[1px]" />
                <span>Twitter</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
