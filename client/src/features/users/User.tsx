import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import { TableCell, TableRow } from "@/components/ui/Table";
import { Button } from "@/components/ui/button";

import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import useAuth from "@/components/hooks/useAuth";
import { IUser } from "@/components/types/types";
import Badges from "@/components/ui/Badges";
import ModalButton from "@/components/ui/ModalButton";
import FlexGap from "@/components/ui/FlexGap";
import DialogButton from "@/components/ui/DialogButton";

interface Props {
  user: IUser;
  key?: React.Key;
}

function User({ user }: Props) {
  const { isAdmin, isManager } = useAuth();
  const isRolePermitted = isAdmin || isManager;
  return (
    <TableRow>
      <TableCell className="font-medium">{user?.username}</TableCell>
      <TableCell>
        <Badges content={user.roles} />
      </TableCell>
      <TableCell>
        <FlexGap>
          <ModalButton
            action={
              <Button variant="default" size="sm">
                <FontAwesomeIcon icon={faPenToSquare} size="xs" />
              </Button>
            }
            render={<EditUser user={user} />}
          />
          {isRolePermitted && (
            <DialogButton
              action={<FontAwesomeIcon icon={faTrash} size="xs" />}
              render={<DeleteUser _id={user._id} />}
            />
          )}
        </FlexGap>
      </TableCell>
    </TableRow>
  );
}

export default User;
