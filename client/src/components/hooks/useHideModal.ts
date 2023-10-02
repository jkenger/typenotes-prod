import { useModal } from "../ui/Modal";

function useHideModal(key: string) {
  const { handleModalState } = useModal();
  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === key) {
      handleModalState();
    }
  };

  return handleEsc;
}

export default useHideModal;
