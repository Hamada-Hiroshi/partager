import { atom } from "recoil";

export const scrollPositionState = atom({
  key: "scrollPositionState",
  default: {
    params: "",
    scrollY: ""
  }
});
