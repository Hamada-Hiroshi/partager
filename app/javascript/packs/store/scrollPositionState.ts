import { atom } from "recoil";
import ScrollPosition from "../types/ScrollPosition";

export const scrollPositionState = atom<ScrollPosition>({
  key: "scrollPositionState",
  default: {
    params: "",
    scrollY: 0
  }
});
