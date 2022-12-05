import React from "react";
import { use100vh } from "react-div-100vh";
import NavBar from "../navBar/NavBar";

type Props = {
  children: React.ReactNode;
};

const FullscreenLayout: React.FC<Props> = ({ children }) => {
  const height = use100vh();
  return (
    <div className="flex flex-col" style={{ height: height || "100vh" }}>
      <NavBar />
      <div className="flex flex-col md:flex-row flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default FullscreenLayout;
