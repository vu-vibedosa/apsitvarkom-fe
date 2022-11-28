import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="absolute inset-0">
      <div className="flex flex-col md:flex-row h-screen">{children}</div>
    </div>
  );
};

export default Layout;
