import { signOut } from "firebase/auth";
import {
  Clock01Icon,
  Home11Icon,
  Logout01Icon,
  PinIcon,
} from "hugeicons-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";

const sideLinks = [
  {
    id: 1,
    icon: <Home11Icon size={22} color="#FFFFFF" />,
    label: "Home",
    link: "home",
  },
  {
    id: 2,
    icon: <Clock01Icon size={22} color="#FFFFFF" />,
    label: "Recent",
    link: "home",
  },
  {
    id: 3,
    icon: <PinIcon size={20} color="#FFFFFF" />,
    label: "Pinned",
    link: "home",
  },
];
const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-y-6">
      <div className="flex w-full justify-center pt-8">
        {/* <img src={logo} alt="gywde logo" /> */}
      </div>
      <div className="w-full bg-primary bg-opacity-25 p-[0.5px]" />

      <div className="mr-3 flex flex-col gap-y-8 px-2">
        {sideLinks.map((link) => (
          <span
            // to={`/`}
            className={`mx-auto flex w-full items-center gap-x-3 rounded-[5px] px-3 py-4 transition-all ease-in hover:cursor-pointer hover:bg-primary hover:bg-opacity-20 ${link.label === 'Home' && "bg-primary bg-opacity-20"}`}
            key={link.id}
          >
            {link.icon}
            <span className="text-base font-medium text-primary">
              {link.label}
            </span>
          </span>
        ))}
        <div
          className={`mx-auto mt-20 flex w-full items-center gap-x-3 rounded-[5px] px-3 py-4 transition-all ease-in hover:cursor-pointer hover:bg-primary hover:bg-opacity-20`}
          onClick={handleLogout}
        >
          <Logout01Icon size={22} color="#FFFFFF" />
          <span className="text-base font-medium text-primary">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
