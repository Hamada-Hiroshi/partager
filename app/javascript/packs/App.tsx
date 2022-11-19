import React from "react";
import { RecoilRoot } from "recoil";
import SetUserInfo from "./components/SetUserInfo";
import Router from "./router/Router";
import UserInfo from "./types/UserInfo"

const App: React.VFC<UserInfo> = (props) => {
  const { isLogin, reviewedBeerIds, reviewedWineIds, reviewedSakeIds } = props;
  console.log(`ログイン: ${props.isLogin}`);

  return (
    <RecoilRoot>
      {isLogin && (
        <SetUserInfo
          isLogin={isLogin}
          reviewedBeerIds={reviewedBeerIds}
          reviewedWineIds={reviewedWineIds}
          reviewedSakeIds={reviewedSakeIds}
        />
      )}
      <Router />
    </RecoilRoot>
  );
};
export default App;
