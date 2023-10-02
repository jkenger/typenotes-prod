import React, {
  cloneElement,
  useState,
  createContext,
  useContext,
} from "react";
import ReactDOM from "react-dom";
import { IChildren } from "../types/types";
import { motion } from "framer-motion";

// TODO: Add modal functionality

interface IActionContent {
  children?: React.ReactNode | React.ReactNode[];
}

interface IModalContext {
  isOpen: boolean;
  handleModalState: () => void;
}

const ModalContext = createContext<IModalContext>({
  isOpen: false,
  handleModalState: () => {},
});

function Modal({ children }: IChildren) {
  // state for opening and closing modal
  const [isOpen, setIsOpen] = useState(false);

  function handleModalState() {
    setIsOpen((state) => !state);
  }

  return (
    <ModalContext.Provider value={{ isOpen, handleModalState }}>
      {children}
    </ModalContext.Provider>
  );
}

function Action({ children }: IActionContent) {
  const { handleModalState } = useModal();
  return (
    <div className="space-x-2">
      {(children as React.ReactNode[])?.length >= 1
        ? (children as React.ReactNode[])?.map((child) =>
            cloneElement(child as React.ReactElement, {
              onClick: handleModalState,
            })
          )
        : cloneElement(children as React.ReactElement, {
            onClick: handleModalState,
          })}
    </div>
  );
}

function Content({ children }: IActionContent) {
  const { isOpen, handleModalState } = useModal();
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 backdrop-blur-sm flex max-w-screen">
      <motion.div
        initial={"hidden"}
        whileInView={"visible"}
        viewport={{ once: true, amount: 1 }}
        // transition={{ delay: 0.2, duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: 0 },
          visible: { opacity: 1, x: 0 },
        }}
        className="w-0 md:w-1/2"
        onClick={handleModalState}
      ></motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: 10 },
          visible: { opacity: 1, x: 0 },
        }}
        exit={{ opacity: 0, x: 10 }}
        className="w-full md:w-1/2 bg-secondary h-full rounded-l-md border-l border-l-1"
      >
        {children}
      </motion.div>
    </div>,
    document.getElementById("root") as HTMLElement
  );
}

function Form({ children }: IActionContent) {
  return children;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a Modal");
  }
  return context;
}

Modal.Action = Action;
Modal.Content = Content;
Modal.Form = Form;

export default Modal;
