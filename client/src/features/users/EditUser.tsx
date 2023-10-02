import { FieldValues, useForm } from "react-hook-form";
import { useUpdateUserMutation } from "./usersApiSlice";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormLayout from "@/components/ui/FormLayout";
import ContentLayout from "@/components/ui/ContentLayout";
import Heading from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/checkbox";
import FormAction from "@/components/ui/FormAction";
import { Button } from "@/components/ui/button";
import { IUser, IUserResult, Keys, UserRoles } from "@/components/types/types";
import { toast } from "react-hot-toast";
import { useModal } from "@/components/ui/Modal";
import { useEffect } from "react";
import useHideModal from "@/components/hooks/useHideModal";

function EditUser({ user }: { user: IUser }) {
  // Destructure user
  const { _id: id, username, password, roles, active } = user;
  // Hooks
  const form = useForm();
  const { handleModalState } = useModal();
  const hideModal = useHideModal(Keys.ESCAPE);
  const { errors } = form.formState;

  // Query and Mutations
  const [updateUser, { isLoading: isEditing }] = useUpdateUserMutation();

  // Effects
  useEffect(() => {
    // If a user hits esc, close the modal

    window.addEventListener("keydown", hideModal);
    return () => {
      window.removeEventListener("keydown", hideModal);
    };
  }, [hideModal]);

  // Handlers
  async function handleEditUser(data: FieldValues) {
    // Check if data is the same
    const transformedData = {
      _id: id,
      username: data.username,
      password: data.password,
      roles: [
        data.employee ? UserRoles.EMPLOYEE : "",
        data.admin ? UserRoles.ADMIN : "",
        data.manager ? UserRoles.MANAGER : "",
      ],
      active: data.active,
    };
    if (
      transformedData.username === username &&
      transformedData.password === password &&
      transformedData.active === active &&
      transformedData.roles.includes(UserRoles.EMPLOYEE) ===
        roles?.includes(UserRoles.EMPLOYEE) &&
      transformedData.roles.includes(UserRoles.ADMIN) ===
        roles?.includes(UserRoles.ADMIN) &&
      transformedData.roles.includes(UserRoles.MANAGER) ===
        roles?.includes(UserRoles.MANAGER)
    ) {
      toast.error("No changes were made.");
      return;
    }

    const res = (await updateUser(transformedData)) as IUserResult;
    if (res.error) {
      toast.error(res.error.data.error);
    }
    if (res.data) {
      form.reset();
      toast.success(res.data.data);
      handleModalState();
    }
  }

  return (
    <Form {...form}>
      <form className="h-full" onSubmit={form.handleSubmit(handleEditUser)}>
        <FormLayout>
          <ContentLayout>
            <Heading text="Edit User" />
            <FormField
              control={form.control}
              name="username"
              defaultValue={username}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">
                    <span>Username</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="username"
                      placeholder="Username"
                      className={`focus:border-primary${
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
              defaultValue={password}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">
                    <span>Password</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      id="password"
                      placeholder="Password"
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

            {/* Select Controls */}

            <div>
              <FormLabel className="">Roles</FormLabel>
              <FormField
                control={form.control}
                name="employee"
                /* 
          defaultValue determines if checkbox is checked or not
              field.value = defaultValue
           */
                defaultValue={
                  roles?.includes(UserRoles.EMPLOYEE) ? true : false
                }
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
                            checked={field.value}
                            // disabled={isCreating}
                            onCheckedChange={field.onChange}
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
                defaultValue={roles?.includes(UserRoles.ADMIN) ? true : false}
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
                            // disabled={isCreating}
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
                defaultValue={roles?.includes(UserRoles.MANAGER) ? true : false}
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
                            // disabled={isCreating}
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
            <div>
              <FormLabel className="">Status</FormLabel>
              <FormField
                control={form.control}
                name="active"
                defaultValue={active}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="active">
                      <FormItem
                        // Checks if checkbox is checked and adds border-primary class
                        className={`flex items-start border mt-2 px-3 py-4 gap-2 space-y-0 rounded-md hover:border-primary ${
                          field.value === true ? "border-primary" : ""
                        }`}
                      >
                        <FormControl className="">
                          <Checkbox
                            // disabled={isCreating}
                            id="active"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-0.5">
                          <FormLabel htmlFor="active">Is Active</FormLabel>
                          <FormDescription className="text-sm text-gray-500">
                            Create, Read, Update, and Delete Notes
                          </FormDescription>
                        </div>
                      </FormItem>
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </ContentLayout>
          <FormAction>
            <Button
              disabled={isEditing}
              onClick={handleModalState}
              variant="outline"
              size="lg"
            >
              Cancel
            </Button>
            <Button disabled={isEditing} type="submit" size="lg">
              {isEditing ? "Saving..." : "Edit User"}
            </Button>
          </FormAction>
        </FormLayout>
      </form>
    </Form>
  );
}

export default EditUser;
