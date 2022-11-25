import React from "react";

const Loader = () => {
  return (
    <div className=" h-screen flex items-center justify-center">
      <div className="w-6 h-6  rounded-full border-2 border-b-violet border-t-violet animate-spin"></div>
    </div>
  );
};

export default Loader;
