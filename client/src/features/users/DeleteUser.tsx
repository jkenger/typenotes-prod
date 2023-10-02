import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  dialogClose,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

import { useDeleteUserMutation } from "./usersApiSlice";
import { toast } from "react-hot-toast";
import { IUserResult } from "@/components/types/types";

type Props = {
  _id: string;
};

function DeleteUser({ _id: id }: Props) {
  // Query and Mutation Hooks
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  // Event Handlers
  async function handleDelete() {
    const res = (await deleteUser(id)) as IUserResult;
    console.log(res);
    if (res.error) {
      toast.error(res.error.data.error);
    }

    if (res.data) {
      dialogClose();
      toast.success(res.data?.data);
    }
  }

  return (
    <DialogHeader>
      <DialogTitle>
        <span className="text-red-500">
          <Heading text={`Delete User `} />
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

export default DeleteUser;
