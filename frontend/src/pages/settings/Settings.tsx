import React from "react";
import { FaAddressBook } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { MdPayment, MdSecurity } from "react-icons/md";
import Account from "./settingsComponents/Account";
import Address from "./settingsComponents/Address";
import Security from "./settingsComponents/Security";

const Settings = () => {

  const [actual,setActual] = React.useState<any>(<Account/>)
  
  return (
    <div className=" p-28 pb-0 flex">
      <div>
        <h2 className="text-white text-4xl pb-10">Settings</h2>
        <ul className="flex flex-col gap-6">
          <li  onClick={()=> setActual(<Account/>)} className="flex items-center border w-72 py-1 px-2  rounded-md border-violet cursor-pointer">
            <VscAccount className="text-5xl text-white bg-sky-600 p-2 rounded-md mr-3" />
            <div>
              <h3 className="text-white font-medium text-2xl">Account</h3>
              <span className="text-xl text-slate-200 font-thin">
                personal informations
              </span>
            </div>
          </li>
          <li  onClick={()=> setActual(<Address/>)} className="flex items-center border w-72 py-1 px-2  rounded-md border-violet cursor-pointer ">
            <FaAddressBook className="text-5xl text-white bg-teal-600 p-2 rounded-md mr-3" />
            <div>
              <h3 className="text-white font-medium text-2xl">Address</h3>
              <span className="text-xl text-slate-200 font-thin">
                address informations
              </span>
            </div>
          </li>
          <li  onClick={()=> setActual(<Security/>)} className="flex items-center border w-72 py-1 px-2  rounded-md border-violet cursor-pointer">
            <MdSecurity className="text-5xl text-white bg-slate-700 p-2 rounded-md mr-3" />
            <div>
              <h3 className="text-white font-medium text-2xl">Security</h3>
              <span className="text-xl text-slate-200 font-thin">
                security settings
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div className="pl-20 w-full">
        {actual}
      </div>
    </div>
  );
};

export default Settings;
