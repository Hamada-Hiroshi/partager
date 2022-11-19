import React, { FC, ReactNode } from "react";
import Header from "../organisms/Header";

const DefaultLayout: FC<ReactNode> = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default DefaultLayout;
