import React from "react";

function HeadingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between  py-4 px-3">
      {children}
    </div>
  );
}

export default HeadingLayout;
