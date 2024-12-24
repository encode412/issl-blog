import { Notification01Icon, Search01Icon } from "hugeicons-react";
import React from "react";
import { demoProfile } from "../../../constants/images";

const Navbar = ({ user }) => {
  return (
    <div className="flex w-full">
      <div className="relative ml-16 flex w-3/4 items-center justify-center">
        <input
          type="text"
          name="search"
          id="search"
          className="w-1/2 rounded-[5px] border border-[#AEAEAE] px-10 py-2 placeholder:text-xs placeholder:font-medium placeholder:text-[#AEAEAE] md:placeholder:text-sm"
          placeholder="Search"
        />{" "}
        <Search01Icon
          size={40}
          color="#d5d5d5"
          className="absolute left-[25%] px-2"
        />
      </div>

      <div className="ml-auto flex w-fit items-center gap-x-3 px-8">
        <div className="relative z-20">
          <Notification01Icon className="cursor-pointer" />
          <div className="bg-lightblue absolute bottom-[16px] left-[10px] flex h-[20px] w-[20px] items-center justify-center rounded-[50%] font-semibold text-primary">
            5
          </div>
        </div>
        {user && (
          <div className="flex items-center gap-x-2 ml-4">
            <img
              src={user.photoURL ? user.photoURL : demoProfile}
              className="w-[50px] rounded-[50%]"
              alt="profile image"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#181818] md:text-base">
                {user.email}
              </span>
              <span className="text-xs font-medium text-secondary md:text-sm">
                {user.displayName || "Super admin"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
