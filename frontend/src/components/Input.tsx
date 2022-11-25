import React from "react";

interface props {
  value: string;
  placeholder: string;
  ref: React.ForwardedRef<any>;
}

const Input = ({ value, placeholder, ref }: props) => {
  return (
    <input
      ref={ref}
      className="bg-zinc-900 rounded-md  h-9 outline-none p-5 text-white w-72 "
      value={value}
      placeholder={placeholder}
    />
  );
};

export default Input;
