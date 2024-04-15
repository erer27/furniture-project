import React from "react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen align-middle text-white">
      <div className="w-3/12 h-4/6 bg-sky-200 border border-sky-200 rounded-md flex flex-col p-4 shadow items-center gap-6">
        <input
          type="text"
          className="bg-sky-200 border-b border-white mt-6 w-11/12 focus:outline-none font-sans placeholder:text-white bg-user-icon bg-no-repeat bg-left pl-6 bg-[length:19px_19px] bg-[0px 2px]"
          placeholder="Username"
        ></input>
        <input
          type="text"
          className="bg-sky-200 border-b border-white w-11/12 focus:outline-none font-sans placeholder:text-white bg-password-icon bg-no-repeat bg-left pl-6 bg-[length:16px_16px] bg-[2px]"
          placeholder="Password"
        ></input>
        <div className="flex flex-col items-center justify-center w-11/12">
          <button className="my-2 w-full bg-sky-400 h-6 rounded text-xs">
            로그인
          </button>
          <div className="text-[8px] select-none">
            <span className="hover:cursor-pointer">회원가입</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
