import React from "react";
import Navbar from "../navbar";
import Sidebar from "../sidebar";

const Layout = ({ children }) => {
  return (
    <div className="relative">
      <div className="flex h-screen">
        <div className="fixed z-20 flex h-[80px] w-full bg-primary shadow-xl">
          <Navbar />
        </div>
        <div className="z-50 h-full w-[15%] overflow-hidden bg-secondary">
          <Sidebar />
        </div>
        <div className="w-3/4 flex-grow overflow-y-auto bg-[#F8F8F8] p-4 pl-14 pt-36">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
