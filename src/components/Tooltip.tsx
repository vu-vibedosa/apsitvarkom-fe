import React from "react";

interface Props {
  children: React.ReactNode;
  text: string;
}

const Tooltip: React.FC<Props> = ({ children, text }) => {
  return (
    <span className="group relative">
      <span
        className="w-32 lg:w-48 text-sm pointer-events-none absolute left-1/2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-gray-800 before:content-[''] group-hover:opacity-100"
        style={{ bottom: "calc(50% + 15px)" }}
      >
        {text}
      </span>

      {children}
    </span>
  );
};

export default Tooltip;
