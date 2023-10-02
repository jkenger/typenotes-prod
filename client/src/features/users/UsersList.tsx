// import React from "react";
// import { useGetUsersQuery } from "./usersApiSlice";
// import Loader from "@/components/ui/Loader";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import User from "./User";
import { useGetUsersQuery } from "./usersApiSlice";
import Heading from "@/components/ui/Heading";
import { IUser } from "@/components/types/types";
import NewUser from "./NewUser";
import useAuth from "@/components/hooks/useAuth";
import HeadingLayout from "@/components/HeadingLayout";
import ModalButton from "@/components/ui/ModalButton";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import Error from "@/components/ui/error";
import { Button } from "@/components/ui/button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UsersList() {
  // Query and Mutation Hooks
  const { data, isLoading, error, isError } = useGetUsersQuery("");
  const { isAdmin, isManager } = useAuth();

  const users: IUser[] = data?.data;

  const isRolePermitted = isAdmin || isManager;

  return (
    <>
      <HeadingLayout>
        <Heading text="Users" />
        {isRolePermitted && (
          <ModalButton
            action={
              <Button size="lg">
                <FontAwesomeIcon icon={faPlus} size="sm" className="mr-2" />
                New User
              </Button>
            }
            render={<NewUser />}
          />
        )}
      </HeadingLayout>
      <Table>
        <TableCaption>A list of your users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <SkeletonLoader />}
          {isError && (
            <TableRow>
              <TableCell colSpan={3}>
                <Error text={error.toString()} />
              </TableCell>
            </TableRow>
          )}

          {!users?.length && (
            <TableRow>
              <TableCell colSpan={3}>
                <Error text="No users found" />
              </TableCell>
            </TableRow>
          )}
          {users?.length &&
            users?.map((user) => <User key={user._id} user={user} />)}
        </TableBody>
      </Table>
    </>
  );
}

export default UsersList;
