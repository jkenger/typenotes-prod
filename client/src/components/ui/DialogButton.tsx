import React from "react";
import { buttonVariants } from "./button";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";

type Props = {
  action: React.ReactNode;
  render: React.ReactNode;
};

function DialogButton({ action, render }: Props) {
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({
          variant: "destructive",
          size: "sm",
        })}
      >
        {action}
      </DialogTrigger>
      <DialogContent>{render}</DialogContent>
    </Dialog>
  );
}

export default DialogButton;
