import { Notification01Icon, Search01Icon } from "hugeicons-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
        <Search01Icon size={40} color="#d5d5d5" className="absolute left-[25%] px-2" />
      </div>

      <div className="ml-auto flex w-fit items-center gap-x-3 px-8">
        <div className="relative z-20">
          <Notification01Icon
            className="cursor-pointer"
          />
          <div className="bg-lightblue absolute bottom-[16px] left-[10px] flex h-[20px] w-[20px] items-center justify-center rounded-[50%] font-semibold text-primary">
            5
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          {/* <img
            src={ProfileImage}
            className="w-[50px] rounded-[50%]"
            alt="profile image"
          /> */}
          {/* <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#181818] md:text-base">
              {userName !== null && userName}
            </span>
            <span className="text-lightgray text-xs font-normal md:text-sm">
              {userType}
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
