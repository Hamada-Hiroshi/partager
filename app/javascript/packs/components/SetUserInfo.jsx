import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/userState";

const SetUserInfo = (props) => {
  const { isLogin, reviewedBeerIds, reviewedWineIds, reviewedSakeIds } = props;
  const setUserInfo = useSetRecoilState(userState);
  console.log(reviewedBeerIds);

  useEffect(() => {
    setUserInfo({
      isLogin: isLogin,
      reviewedBeerIds: reviewedBeerIds,
      reviewedWineIds: reviewedWineIds,
      reviewedSakeIds: reviewedSakeIds
    });
    console.log("ログイン情報セット");
  }, []);

  return null;
};
export default SetUserInfo;

