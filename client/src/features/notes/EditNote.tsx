import ContentLayout from "@/components/ui/ContentLayout";
import FormAction from "@/components/ui/FormAction";
import FormLayout from "@/components/ui/FormLayout";
import Heading from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { useModal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useUpdateNoteMutation } from "./notesApiSlice";
import { toast } from "react-hot-toast";
import useHideModal from "@/components/hooks/useHideModal";
import { INoteResult, Keys } from "@/components/types/types";
import { INote } from "@/components/types/types";
function EditNote({ note }: { note: INote }) {
  // Destructure note
  const { _id: id, title, text, completed } = note;

  // Refs
  const completedRef = React.useRef<HTMLDivElement>(null);

  // Hooks
  const form = useForm();
  const { handleModalState } = useModal();
  const hideModal = useHideModal(Keys.ESCAPE);

  // Effects
  useEffect(() => {
    // If a user hits esc, close the modal

    window.addEventListener("keydown", hideModal);
    return () => {
      window.removeEventListener("keydown", hideModal);
    };
  }, [hideModal]);

  // Query and Mutations
  const [updateNote, { isLoading: isEditing }] = useUpdateNoteMutation();

  // Function handlers
  async function onSubmit(data: FieldValues) {
    // Check if data is equal to text, title, completed
    if (
      data.title === title &&
      data.text === text &&
      data.completed === completed
    ) {
      return toast.error("No changes were made");
    }

    const res = (await updateNote({
      _id: id,
      title: data.title,
      text: data.text,
      completed: data.completed,
    })) as INoteResult;
    console.log(res);
    if (res.data) {
      toast.success("Note Updated Successfully");
      handleModalState();
    }
    if (res.error) {
      toast.error(res.error.data.error);
    }
  }

  const { errors } = form.formState;
  return (
    <Form {...form}>
      <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormLayout>
          <ContentLayout>
            <Heading text="Edit Note" />
            <FormField
              control={form.control}
              name="title"
              defaultValue={title}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isEditing}
                      placeholder="Title of your note"
                      className={`focus:border-primary ${
                        errors?.username
                          ? " border-2 border-red-500 focus:border-red focus:caret-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="text"
              defaultValue={text}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isEditing}
                      placeholder="Text of your note"
                      className={`focus:border-primary ${
                        errors?.username
                          ? " border-2 border-red-500 focus:border-red focus:caret-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Status</FormLabel>
              <FormField
                control={form.control}
                name="completed"
                /* 
              defaultValue determines if checkbox is checked or not
              field.value = defaultValue
           */
                defaultValue={completed}
                render={({ field }) => {
                  return (
                    <FormLabel htmlFor="completed">
                      <FormItem
                        ref={completedRef}
                        // Checks if checkbox is checked and adds border-primary class
                        className={`flex items-start border mt-2 px-3 py-4 gap-2 space-y-0 rounded-md hover:border-primary ${
                          field.value === true ? "border-primary" : ""
                        }`}
                      >
                        <FormControl>
                          <Checkbox
                            {...field}
                            id="completed"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isEditing}
                          />
                        </FormControl>
                        <div className="space-y-0.5">
                          <FormLabel htmlFor="completed">
                            Is Completed
                          </FormLabel>
                          <FormDescription className="text-sm text-gray-500">
                            Read and Update Notes
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    </FormLabel>
                  );
                }}
              />
            </div>
          </ContentLayout>
          <FormAction>
            <Button
              disabled={isEditing}
              onClick={handleModalState}
              variant="outline"
            >
              Cancel
            </Button>
            <Button disabled={isEditing} type="submit" size="lg">
              {isEditing ? "Saving..." : "Save"}
            </Button>
          </FormAction>
        </FormLayout>
      </form>
    </Form>
  );
}

export default EditNote;
