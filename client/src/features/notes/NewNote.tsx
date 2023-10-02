import FormAction from "@/components/ui/FormAction";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ContentLayout from "@/components/ui/ContentLayout";
import Heading from "@/components/ui/Heading";
import FormLayout from "@/components/ui/FormLayout";
import { Input } from "@/components/ui/Input";
import { toast } from "react-hot-toast";

import { FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useModal } from "@/components/ui/Modal";
import { useCreateNoteMutation } from "./notesApiSlice";
import { useEffect } from "react";
import useHideModal from "@/components/hooks/useHideModal";
import { INote, INoteResult, IUser, Keys } from "@/components/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import useAuth from "@/components/hooks/useAuth";
import { useGetUsersQuery } from "../users/usersApiSlice";

function NewNote() {
  // Hooks
  const form = useForm();
  const { handleModalState } = useModal();
  const hideModal = useHideModal(Keys.ESCAPE);
  const { id, isAdmin, isManager } = useAuth();

  let mutatedId = undefined;
  if (!isAdmin || !isManager) {
    mutatedId = id;
  }

  // Query and Mutations
  const { data, isLoading: isDataLoading } = useGetUsersQuery(mutatedId);
  const [createNote, { isLoading: isCreating }] = useCreateNoteMutation();

  // Destructured datas
  const { errors } = form.formState;

  // Effects
  useEffect(() => {
    // If a user hits esc, close the modal

    window.addEventListener("keydown", hideModal);
    return () => {
      window.removeEventListener("keydown", hideModal);
    };
  }, [hideModal]);

  // Function handlers

  async function onSubmit(data: FieldValues) {
    const transformedData = {
      ...data,
    };

    const res = (await createNote(transformedData as INote)) as INoteResult;

    if (res.error) {
      toast.error(res.error.data.error);
    }
    if (res.data) {
      form.reset();
      handleModalState();
      toast.success(res.data?.data);
    }
  }

  return (
    <Form {...form}>
      <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormLayout>
          <ContentLayout>
            <Heading text="New Note" />
            <FormField
              control={form.control}
              name="id"
              rules={{
                required: "Owner is required",
              }}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Owner *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isDataLoading}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a user" />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.data.length > 0 ? (
                            data?.data.map((user: IUser) => {
                              return (
                                <SelectItem key={user._id} value={user._id}>
                                  {user.username}
                                </SelectItem>
                              );
                            })
                          ) : (
                            <SelectItem
                              key={data?.data._id}
                              value={data?.data._id}
                            >
                              {data?.data.username}
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: "Title is required",
              }}
              defaultValue={""}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={`focus:border-primary ${
                          errors?.title
                            ? " border-2 border-red-500 focus:border-red focus:caret-red-500"
                            : ""
                        }`}
                        placeholder="title"
                        disabled={isCreating}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="text"
              rules={{
                required: "Text is required",
              }}
              defaultValue={""}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Text *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className={`focus:border-primary ${
                          errors?.username
                            ? " border-2 border-red-500 focus:border-red focus:caret-red-500"
                            : ""
                        }`}
                        placeholder="Type your message here."
                        disabled={isCreating}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </ContentLayout>
          <FormAction>
            <Button
              disabled={isCreating}
              type="submit"
              variant="outline"
              onClick={handleModalState}
            >
              Cancel
            </Button>
            <Button disabled={isCreating} type="submit">
              Save
            </Button>
          </FormAction>
        </FormLayout>
      </form>
    </Form>
  );
}

export default NewNote;
