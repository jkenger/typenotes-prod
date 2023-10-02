import React from "react";
import Modal from "./Modal";

type Props = {
  action: React.ReactNode;
  render: React.ReactNode;
};

function ModalButton({ action, render }: Props) {
  return (
    <Modal>
      <Modal.Action>{action}</Modal.Action>
      <Modal.Content>{render}</Modal.Content>
    </Modal>
  );
}

export default ModalButton;
