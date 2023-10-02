import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { TableCell, TableRow } from "@/components/ui/Table";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/components/helpers/formatDate";
import { INote } from "@/components/types/types";

import EditNote from "./EditNote";
import DeleteNote from "./DeleteNote";
import { Badge } from "@/components/ui/badge";
import useAuth from "@/components/hooks/useAuth";
import FlexGap from "@/components/ui/FlexGap";
import ModalButton from "@/components/ui/ModalButton";
import DialogButton from "@/components/ui/DialogButton";

interface Props {
  note: INote;
  key: React.Key;
}

function Note({ note }: Props) {
  const { isAdmin, isManager } = useAuth();

  const variant = note.completed ? "default" : "destructive";
  const status = note.completed ? "Completed" : "Open";

  const isRolePermitted = isAdmin || isManager;

  return (
    <TableRow>
      <TableCell>{note?.user?.username}</TableCell>
      <TableCell>{note.title}</TableCell>
      <TableCell>
        <Badge variant={variant}>{status}</Badge>
      </TableCell>

      <TableCell>{formatDate(note?.createdAt)}</TableCell>
      <TableCell>{formatDate(note?.updatedAt)}</TableCell>
      <TableCell>
        <FlexGap>
          <ModalButton
            action={
              <Button variant="default" size="sm">
                <FontAwesomeIcon icon={faEdit} size="xs" />
              </Button>
            }
            render={<EditNote note={note} />}
          />

          {isRolePermitted && (
            <DialogButton
              action={<FontAwesomeIcon icon={faTrash} size="xs" />}
              render={<DeleteNote id={note._id} />}
            />
          )}
        </FlexGap>
      </TableCell>
    </TableRow>
  );
}

export default Note;
