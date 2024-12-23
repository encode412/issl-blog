import React from "react";
import { Button } from "../../../../components";

const DashboardNav = ({ handleNewClick }) => {
  return (
    <div className="flex w-full justify-between px-5">
      <div className="text-2xl font-medium">Recent Blog Posts</div>
      <Button onClick={handleNewClick}>Create New Blog</Button>
    </div>
  );
};

export default DashboardNav;
