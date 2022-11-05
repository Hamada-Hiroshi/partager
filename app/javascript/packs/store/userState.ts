import { atom } from "recoil";
import UserInfo from "../types/UserInfo";

export const userState = atom<UserInfo>({
  key: "userState",
  default: {
    isLogin: false,
    reviewedBeerIds: [],
    reviewedWineIds: [],
    reviewedSakeIds: []
  }
});
