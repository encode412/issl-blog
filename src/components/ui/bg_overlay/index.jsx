import React from "react";

const BgOverlay = ({ children, className, isLoading, isSuccesful, isModalOpen }) => {
  return (
    <div className={className}>
      {(isLoading || isModalOpen || isSuccesful) && (
        <div className="fixed top-0 h-full left-0 w-full bg-gray-900 bg-opacity-70 z-50">
          <div className="flex justify-center items-center h-screen">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default BgOverlay;
