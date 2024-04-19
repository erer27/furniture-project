import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const inputText =
  "bg-sky-200 border-b border-white text-sm focus:outline-none place font-sans text-sm   placeholder:text-white  bg-no-repeat bg-left pl-6 ";

export type Member = {
  id: string;
  password: string;
};

const SignUpPage = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");

  const member = { id: id, password: password } as Member;

  const defaultWarningObject = {
    isVisible: false,
    message: "default",
  } as WarningProps;

  const [idWarningObject, setIdWarningObject] =
    useState<WarningProps>(defaultWarningObject);

  const [passwordWarningObject, setPasswordWarningObject] =
    useState<WarningProps>(defaultWarningObject);

  const [passwordCheckWarningObject, setPasswordCheckWarningObject] =
    useState<WarningProps>(defaultWarningObject);

  const idRef = useRef<any>();
  const passwordRef = useRef<any>();
  const passwordCheckRef = useRef<any>();

  const navigate = useNavigate();

  const submit = async () => {
    if (id.length === 0) {
      setIdWarningObject({ isVisible: true, message: "아이디를 입력해주세요" });
      idRef.current?.focus();
      return;
    } else if (idWarningObject.isVisible) {
      idRef.current?.focus();
      return;
    } else if (password.length === 0) {
      setPasswordWarningObject({
        isVisible: true,
        message: "비밀번호를 입력해주세요",
      });
      passwordRef.current?.focus();
      return;
    } else if (passwordWarningObject.isVisible) {
      passwordRef.current?.focus();
      return;
    } else if (passwordCheckWarningObject.isVisible) {
      passwordCheckRef.current?.focus();
    }
    try {
      const response = await axios.post("/signup", member);
      console.log(response);
      if (response.statusText === "OK") {
        alert("회원가입이 성공하였습니다.");
        navigate("/login");
      }
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
        setIdWarningObject(defaultWarningObject);
      }
    } catch (error) {
      setIdWarningObject(defaultWarningObject);
      console.log(error);
    }
  };

  const passwordValidationCheck = (password: string) => {
    if (!/^$|^[A-Za-z0-9!@#$%]+$/.test(password)) {
      setPasswordWarningObject({
        isVisible: true,
        message: '비밀번호는 영문자, 숫자, 특수문자 "!@#$%"만 허용됩니다.',
      });
    } else {
      setPasswordWarningObject(defaultWarningObject);
    }
  };

  const passwordSameCheck = (password: string, passwordCheck: string) => {
    if (password === passwordCheck) {
      setPasswordCheckWarningObject(defaultWarningObject);
    } else {
      setPasswordCheckWarningObject({
        isVisible: true,
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen align-middle text-white">
      <div className="w-64 h-96 bg-sky-200 border border-sky-200 rounded-md flex flex-col p-4 shadow items-center gap-6">
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
            ref={idRef}
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
              passwordValidationCheck(e.target.value);
              setPassword(e.target.value);
              passwordSameCheck(e.target.value, passwordCheck);
            }}
            autoComplete="new-password"
            ref={passwordRef}
          ></input>
          <Warning
            isVisible={passwordWarningObject.isVisible}
            message={passwordWarningObject.message}
          />
        </div>

        <div>
          <input
            type="password"
            className={`${inputText} bg-password-icon bg-[length:16px_16px] bg-[2px]`}
            placeholder="비밀번호 확인"
            onChange={(e) => {
              passwordSameCheck(password, e.target.value);
              setPasswordCheck(e.target.value);
            }}
            ref={passwordCheckRef}
          />
          <Warning
            isVisible={passwordCheckWarningObject.isVisible}
            message={passwordCheckWarningObject.message}
          />
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
            <span
              className="hover:cursor-pointer"
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </span>
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
