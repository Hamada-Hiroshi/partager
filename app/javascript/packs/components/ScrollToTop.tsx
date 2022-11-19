import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.VFC = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "instant"
    });
  }, [pathname]);

  return null;
};
export default ScrollToTop;
