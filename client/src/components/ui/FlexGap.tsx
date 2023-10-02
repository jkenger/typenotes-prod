import React from "react";

type Props = {
  children: React.ReactNode;
};

function FlexGap({ children }: Props) {
  return <div className="flex space-x-2">{children}</div>;
}

export default FlexGap;
