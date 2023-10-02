import React from "react";

interface Props {
  children: React.ReactNode;
}

function FormLayout({ children }: Props) {
  return (
    <div className="space-y-5 flex flex-col justify-between  h-full ">
      {children}
    </div>
  );
}

export default FormLayout;
