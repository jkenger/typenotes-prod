import React from "react";

type Props = {
  children: React.ReactNode;
};

function FormAction({ children }: Props) {
  return (
    <div className="border-t p-2 space-x-2 w-full flex justify-end">
      {children}
    </div>
  );
}

export default FormAction;
