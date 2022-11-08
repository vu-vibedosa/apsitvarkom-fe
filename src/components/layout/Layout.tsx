import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return <div className="flex flex-col md:flex-row h-screen">{children}</div>;
};

export default Layout;
