import React from "react";
import { use100vh } from "react-div-100vh";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const height = use100vh();
  return (
    <div className="flex flex-col md:flex-row" style={{ height: height || 0 }}>
      {children}
    </div>
  );
};

export default Layout;
