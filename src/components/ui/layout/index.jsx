import React from "react";
import Navbar from "../navbar";
import Sidebar from "../sidebar";

const Layout = ({ children }) => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  return (
    <div className="relative">
      <div className="flex h-screen">
        <header className="fixed z-20 flex h-[80px] w-full bg-primary shadow-xl">
          <Navbar user={user} />
        </header>
        <div className="z-50 h-full w-[15%] overflow-hidden bg-secondary">
          <Sidebar />
        </div>
        <section className="w-3/4 flex-grow overflow-y-auto bg-[#F8F8F8] p-4 pl-14 pt-36">
          {children}
        </section>
      </div>
    </div>
  );
};

export default Layout;
