import React, { FC, ReactNode } from "react";
import Header from "../organisms/Header";
import CameraSearchFooter from "../organisms/CameraSearchFooter";

const SearchFooterLayout: FC<ReactNode> = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
      <CameraSearchFooter />
    </>
  );
};
export default SearchFooterLayout;
