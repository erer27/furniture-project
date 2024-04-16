import { isVisible } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { useState } from "react";

const inputText =
  "bg-sky-200 border-b border-white text-sm focus:outline-none place font-sans text-sm   placeholder:text-white  bg-no-repeat bg-left pl-6 ";

const SignUpPage = () => {
  const [id, setId] = useState<string>();
  const [isIdDuplicated, setIsIdDuplicated] = useState<boolean>();
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [isPasswordSame, setIsPasswordSame] = useState<boolean>(true);
  const member = { id: id, password: password };

  const [idWarningObject, setIdWarningObject] = useState<WarningProps>({
    isVisible: false,
    message: "default",
  });

  const submit = async () => {
    try {
      const response = await axios.post("/signup", member);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const idDuplicationCheck = async (e: any) => {
    try {
      const response = await axios.post("/idDuplicationCheck", e.target.value);
      console.log(response);
      if (response.data) {
        setIdWarningObject({
          isVisible: true,
          message: "중복된 아이디입니다.",
        });
      } else {
        setIdWarningObject((prev) => {
          return { ...prev, isVisible: false };
        });
      }
    } catch (error) {
      setIdWarningObject((prev) => {
        return { ...prev, isVisible: false };
      });
      console.log(error);
    }
  };

  const passwordValidationCheck = () => {
    return /^$|\w|[!@#$%]/.test(password);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen align-middle text-white">
      <div className="w-72 h-96 bg-sky-200 border border-sky-200 rounded-md flex flex-col p-4 shadow items-center gap-6">
        <div>
          <input
            type="text"
            className={`${inputText} bg-user-icon mt-10 bg-[length:19px_19px] bg-[0px 2px]`}
            placeholder="아이디"
            onChange={(e) => {
              setId(e.target.value);
              idDuplicationCheck(e);
            }}
            autoComplete="new-password"
          ></input>
          <Warning
            isVisible={idWarningObject.isVisible}
            message={idWarningObject.message}
          />
        </div>
        <div>
          <input
            type="password"
            className={`${inputText} bg-password-icon bg-[length:16px_16px] bg-[2px]`}
            placeholder="비밀번호"
            onChange={(e) => {
              console.log(password);
              setPassword(e.target.value);
            }}
            autoComplete="new-password"
          ></input>
          <div
            className={`text-red-500 text-[8px] ${
              passwordValidationCheck() ? "invisible" : "visible"
            }`}
          >
            비밀번호는 영문자, 숫자, "!@#$%_"만 허용됩니다.
          </div>
        </div>

        <div>
          <input
            type="password"
            className={`${inputText} bg-password-icon bg-[length:16px_16px] bg-[2px]`}
            placeholder="비밀번호 확인"
            onChange={(e) => setPasswordCheck(e.target.value)}
          ></input>
          <div
            className={`text-red-500 text-[8px] ${
              password === passwordCheck ? "invisible" : "visible"
            }`}
          >
            비밀번호가 일치하지 않습니다.
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <button
            className="my-2 w-44 bg-sky-400 h-6 rounded text-xs"
            onClick={() => {
              submit();
            }}
          >
            회원가입
          </button>
          <div className="text-[8px] select-none">
            <span className="hover:cursor-pointer">로그인</span>
          </div>
        </div>
      </div>
    </div>
  );
};

type WarningProps = { isVisible: boolean; message: string };
const Warning = ({ isVisible, message }: WarningProps) => {
  return (
    <div
      className={`text-red-500 text-[8px] ${
        isVisible ? "visible" : "invisible"
      }`}
    >
      {message}
    </div>
  );
};

export default SignUpPage;
