import { Input } from "@/components/ui/Input";
import { useEffect } from "react";

import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
/* eslint-disable no-undef */

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateUserMutation } from "./usersApiSlice";
import { toast } from "react-hot-toast";
import { useModal } from "@/components/ui/Modal";
import Heading from "@/components/ui/Heading";
import FormLayout from "@/components/ui/FormLayout";
import FormAction from "@/components/ui/FormAction";
import ContentLayout from "@/components/ui/ContentLayout";
import { IUser, IUserResult, Keys, UserRoles } from "@/components/types/types";
import useHideModal from "@/components/hooks/useHideModal";

function NewUser() {
  // Query and Mutations
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();

  // Hooks
  const form = useForm({});
  const { handleModalState } = useModal();
  const hideModal = useHideModal(Keys.ESCAPE);

  const { errors } = form.formState;

  // Effects
  useEffect(() => {
    // If a user hits esc, close the modal

    window.addEventListener("keydown", hideModal);
    return () => {
      window.removeEventListener("keydown", hideModal);
    };
  }, [hideModal]);

  useEffect(() => {
    document.getElementById("username")?.focus();
  }, []);

  // Form submit handler
  async function onSubmit(data: FieldValues) {
    const tempRoles = [
      data.employee ? UserRoles.EMPLOYEE : "",
      data.admin ? UserRoles.ADMIN : "",
      data.manager ? UserRoles.MANAGER : "",
    ];

    // if index is "" remove from array
    const roles = tempRoles.map((r) => r.trim()).filter((r) => r !== "");

    // delete admin, employee, manager properties
    delete data.admin;
    delete data.employee;
    delete data.manager;

    const modData = { ...data, roles };

    const res = (await createUser(modData as IUser)) as IUserResult;

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
            <Heading text="Create User" />
            <FormField
              control={form.control}
              name="username"
              defaultValue={""}
              rules={{
                required: "Username is required",
                pattern: {
                  // Username must have no white spaces, and must be at least 3 characters long
                  value: /^[^\s]{3,}$/,
                  message:
                    "Username must be at least 3 characters long, no white spaces",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Username"
                      id="username"
                      disabled={isCreating}
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
              name="password"
              rules={{
                required: "Password is required",
              }}
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Password"
                      type="password"
                      className={`focus:border-primary ${
                        errors?.username
                          ? " border-2 border-red-500 focus:border-red focus:caret-red-500"
                          : ""
                      }`}
                      id="password"
                      disabled={isCreating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Roles</FormLabel>
              <FormField
                control={form.control}
                name="employee"
                /* 
          defaultValue determines if checkbox is checked or not
              field.value = defaultValue
           */
                defaultValue={true}
                render={({ field }) => {
                  return (
                    <FormLabel htmlFor="employee">
                      <FormItem
                        // Checks if checkbox is checked and adds border-primary class
                        className={`flex items-start border mt-2 px-3 py-4 gap-2 space-y-0 rounded-md hover:border-primary ${
                          field.value === true ? "border-primary" : ""
                        }`}
                      >
                        <FormControl className="">
                          <Checkbox
                            id="employee"
                            {...field}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isCreating}
                          />
                        </FormControl>
                        <div className="space-y-0.5">
                          <FormLabel htmlFor="employee">Employee</FormLabel>
                          <FormDescription className="text-sm text-gray-500">
                            Read and Update Notes
                          </FormDescription>
                        </div>
                      </FormItem>
                    </FormLabel>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="admin"
                render={({ field }) => {
                  return (
                    <FormLabel htmlFor="admin">
                      <FormItem
                        // Checks if checkbox is checked and adds border-primary class
                        className={`flex items-start border mt-6 px-3 py-4 gap-2 space-y-0 rounded-md hover:border-primary ${
                          field.value === true ? "border-primary" : ""
                        }`}
                      >
                        <FormControl className="">
                          <Checkbox
                            id="admin"
                            disabled={isCreating}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-0.5">
                          <FormLabel htmlFor="admin">Admin</FormLabel>
                          <FormDescription className="text-sm text-gray-500">
                            Create, Read, Update, and Delete Notes
                          </FormDescription>
                        </div>
                      </FormItem>
                    </FormLabel>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="manager"
                render={({ field }) => {
                  return (
                    <FormLabel htmlFor="manager">
                      <FormItem
                        // Checks if checkbox is checked and adds border-primary class
                        className={`flex items-start border mt-6 px-3 py-4 gap-2 space-y-0 rounded-md hover:border-primary ${
                          field.value === true ? "border-primary" : ""
                        }`}
                      >
                        <FormControl className="">
                          <Checkbox
                            disabled={isCreating}
                            id="manager"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-0.5">
                          <FormLabel htmlFor="manager">Manager</FormLabel>
                          <FormDescription className="text-sm text-gray-500">
                            Create, Read, Update, and Delete Notes
                          </FormDescription>
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
              onClick={handleModalState}
              variant="outline"
              type="reset"
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating}
              className={`${isCreating ? "cursor-not-allowed" : ""} `}
            >
              Create User
            </Button>
          </FormAction>
        </FormLayout>
      </form>
    </Form>
  );
}

export default NewUser;
