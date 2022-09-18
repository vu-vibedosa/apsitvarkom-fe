import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <div className="container mx-auto">{children}</div>;
    </>
  );
};

export default Layout;
