import React from "react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen align-middle">
      <div className="w-60 h-80 bg-sky-200 border border-sky-200 rounded-md flex flex-col p-4 shadow">
        <input
          type="text"
          className="bg-sky-200 border-b border-white focus:outline-none place font-sans text-sm text-white placeholder:text-white bg-user-icon bg-no-repeat bg-left pl-6 "
          placeholder="Username"
        ></input>
        <input
          type="text"
          className="bg-sky-200 border-b border-white focus:outline-none place font-sans text-sm text-white placeholder:text-white bg-password-icon bg-no-repeat bg-left pl-6 bg-[length:16px_16px] bg-[2px]"
          placeholder="Password"
        ></input>
      </div>
    </div>
  );
};

export default LoginPage;
