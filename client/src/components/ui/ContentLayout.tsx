import React from "react";

type Props = {
  children: React.ReactNode;
};

function ContentLayout({ children }: Props) {
  return <div className="px-3 py-4 space-y-2">{children}</div>;
}

export default ContentLayout;
