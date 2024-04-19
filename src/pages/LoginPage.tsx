import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Member } from "./SignUpPage";

const inputText =
  "bg-sky-200 border-b border-white text-sm focus:outline-none place font-sans text-sm   placeholder:text-white  bg-no-repeat bg-left pl-6 ";

const initialState = {
  member: {},
};

const memberSlice = createSlice({
  name: "memberState",
  initialState: initialState,
  reducers: {
    setMemberState: (
      state: typeof initialState,
      action: PayloadAction<Member>
    ) => {
      state.member = action.payload;
    },
  },
});

export const { setMemberState } = memberSlice.actions;

export const memberReducer = memberSlice.reducer;

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [member, setMember] = useState<Member>({ id: "", password: "" });

  const submit = async () => {
    try {
      const response = await axios.post("/login", member);
      console.log(response);

      if (response.data.password === "wrong member") {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        return;
      }
      const resultMember = {
        id: response.data.id,
        password: response.data.password,
      } as Member;
      dispatch(setMemberState(resultMember));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen align-middle text-white">
      <div className="w-60 h-80 bg-sky-200 border border-sky-200 rounded-md flex flex-col p-4 shadow items-center gap-6">
        <input
          type="text"
          className={`${inputText} bg-user-icon mt-10 bg-[length:19px_19px] bg-[0px 2px]`}
          placeholder="아이디"
          onChange={(e) => {
            setMember((prev) => {
              return { ...prev, id: e.target.value };
            });
          }}
          autoComplete="new-password"
        />
        <input
          type="password"
          className={`${inputText} bg-password-icon bg-[length:16px_16px] bg-[2px]`}
          placeholder="비밀번호"
          onChange={(e) => {
            setMember((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
          autoComplete="new-password"
        />
        <div className="flex flex-col items-center justify-center">
          <button
            className="my-2 w-44 bg-sky-400 h-6 rounded text-xs"
            onClick={submit}
          >
            로그인
          </button>
          <div className="text-[8px] select-none">
            <span
              className="hover:cursor-pointer"
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
