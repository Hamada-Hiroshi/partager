import React, { useEffect, memo } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/userState";
import UserInfo from "../types/UserInfo"

const SetUserInfo: React.VFC<UserInfo> = memo((props) => {
  const { isLogin, reviewedBeerIds, reviewedWineIds, reviewedSakeIds } = props;
  const setUserInfo = useSetRecoilState<UserInfo>(userState);

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
});
export default SetUserInfo;
