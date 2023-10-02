import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  dialogClose,
} from "@/components/ui/dialog";

import { useDeleteNoteMutation } from "./notesApiSlice";
import { toast } from "react-hot-toast";
import { INoteResult } from "@/components/types/types";

function DeleteNote({ id }: { id: string }) {
  const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();

  async function handleDelete() {
    const res = (await deleteNote(id)) as INoteResult;
    if (res.error) {
      toast.error(res.error.data?.error);
    }
    if (res.data) {
      toast.success(res.data.data);
    }

    dialogClose();
  }

  return (
    <DialogHeader>
      <DialogTitle>
        <span className="text-red-500">
          <Heading text={`Delete Note `} />
        </span>
      </DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
      <DialogFooter>
        <div className="flex flex-col-reverse  gap-2 sm:flex-row mt-4">
          <Button onClick={dialogClose} variant="outline" size="lg">
            Cancel
          </Button>
          <Button
            disabled={isDeleting}
            onClick={handleDelete}
            variant="destructive"
            size="lg"
          >
            Delete
          </Button>
        </div>
      </DialogFooter>
    </DialogHeader>
  );
}

export default DeleteNote;
