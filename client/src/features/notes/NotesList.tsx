import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import Note from "./Note";
import { useGetNotesQuery } from "./notesApiSlice";
import Heading from "@/components/ui/Heading";
import { INote } from "@/components/types/types";

import NewNote from "./NewNote";
import useAuth from "@/components/hooks/useAuth";
import HeadingLayout from "@/components/HeadingLayout";
import ModalButton from "@/components/ui/ModalButton";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import Error from "@/components/ui/error";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function NotesList() {
  // Query and Mutation Hooks
  const { isAdmin, isManager, id } = useAuth();

  let mutatedId = undefined;
  if (!isAdmin || !isManager) {
    mutatedId = id;
  }

  const { data, isLoading, error, isError } = useGetNotesQuery(mutatedId);
  const notes: INote[] = data?.data;

  console.log(notes);

  return (
    <>
      <HeadingLayout>
        <Heading text="Notes" />
        <ModalButton
          action={
            <Button size="lg">
              <FontAwesomeIcon icon={faPlus} size="sm" className="mr-2" />
              New Note
            </Button>
          }
          render={<NewNote />}
        />
      </HeadingLayout>
      <Table>
        <TableCaption>A list of your users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Owner</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <SkeletonLoader />}
          {isError && (
            <TableRow>
              <TableCell colSpan={6}>
                <Error text={error.toString()} />
              </TableCell>
            </TableRow>
          )}
          {!notes?.length && (
            <TableRow>
              <TableCell colSpan={6}>
                <Error text="No notes found" />
              </TableCell>
            </TableRow>
          )}
          {notes &&
            notes?.map((note: INote) => <Note key={note._id} note={note} />)}
        </TableBody>
      </Table>
    </>
  );
}

export default NotesList;
