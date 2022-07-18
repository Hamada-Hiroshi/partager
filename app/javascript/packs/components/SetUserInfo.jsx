import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/userState";

const SetUserInfo = (props) => {
  const { is_login } = props;
  console.log(is_login);

  const setUserInfo = useSetRecoilState(userState);
  useEffect(() => {
    setUserInfo({ isLogin: is_login });
    console.log("ログイン情報セット");
  }, []);

  return null;
};
export default SetUserInfo;

