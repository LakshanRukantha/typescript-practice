import Image from "next/image";
import { signOut } from "next-auth/react";
import Button from "./Button";
import { HiOutlineLogout, HiOutlineMail } from "react-icons/hi";

type ProfileCardProps = {
  name: string;
  email: string;
  image: string;
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
      <div className="pt-16 pb-4 md:pb-0 px-4 md:px-0">
        <h1 className="text-3xl font-bold text-slate-800">{props.name}</h1>

        <p className="text-gray-500 flex items-center gap-1">
          <HiOutlineMail className="text-xl mt-[1px]" />
          <span>{props.email}</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
