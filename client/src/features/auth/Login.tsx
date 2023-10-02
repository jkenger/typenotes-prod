import useMediaQuery from "@/components/hooks/useMediaQuery";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FieldValues, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import useRemember from "@/components/hooks/useRemember";
import { toast } from "react-hot-toast";
import { Links } from "@/components/types/types";

function Login() {
  // Hooks
  const form = useForm();
  const isAboveTheScreen = useMediaQuery("(min-width: 1060px)");

  const navigate = useNavigate();
  const [remember, setRemember] = useRemember();
  const rememberForm = form.getValues("remember") || false;

  // Query and Mutation
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  // Event handlers
  async function onSubmit(data: FieldValues) {
    const { username, password } = data;
    try {
      await login({ username, password }).unwrap();
      form.reset();
      navigate(Links.DASHBOARD);
    } catch (e) {
      console.log(e);
      toast.error("Login Failed. Something went wrong");
    }
  }

  async function loginAsEmployee() {
    try {
      await login({ username: "employee1", password: "test123" }).unwrap();
      navigate(Links.DASHBOARD);
    } catch (e) {
      toast.error("Login Failed. Something went wrong");
    }
  }

  async function loginWithFullControl() {
    try {
      await login({
        username: "adminmanager1",
        password: "test123",
      }).unwrap();
      navigate(Links.DASHBOARD);
    } catch (e) {
      toast.error("Login Failed. Something went wrong");
    }
  }

  // useEffects

  useEffect(() => {
    document.getElementById("username")?.focus();
  }, []);
  useEffect(() => {
    setRemember(rememberForm);
  }, [rememberForm, setRemember]);

  return (
    <>
      {!isAboveTheScreen && (
        <section className=" w-full h-[100vh] flex">
          <div className="relative w-full flex justify-center items-center bg-white ">
            <div className=" w-full sm:m-4 shadow-md  scale-75 sm:w-[480px]">
              <div className="bg-primary rounded-t-lg">
                <div className=" space-y-4 px-4 py-8 text-white">
                  <p className="w-48 text-4xl font-bold">Welcome back</p>
                  <p>Sign-in to continue.</p>
                </div>
              </div>
              <div>
                <div className="w-full px-4 py-8">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormLabel className="text-red-500">
                        Note: Requests might take a while on mount as the server
                        is deployed in a free hosting service.
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name="username"
                        defaultValue={""}
                        rules={{ required: "Username is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl {...field}>
                              <Input
                                className="form-input"
                                type="text"
                                placeholder="Username"
                                disabled={isLoggingIn}
                              ></Input>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        defaultValue={""}
                        rules={{ required: "Password is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl {...field}>
                              <Input
                                className="form-input"
                                type="password"
                                placeholder="Password"
                                disabled={isLoggingIn}
                              ></Input>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="remember"
                        defaultValue={remember}
                        render={({ field }) => (
                          <FormLabel htmlFor="remember">
                            <FormItem
                              // Checks if checkbox is checked and adds border-primary class
                              className={`flex items-start border mt-4 px-3 py-4 gap-2 space-y-0 rounded-md hover:border-primary ${
                                field.value === true ? "border-primary" : ""
                              }`}
                            >
                              <FormControl className="">
                                <Checkbox
                                  id="remember"
                                  // disabled={isCreating}
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={isLoggingIn}
                                />
                              </FormControl>
                              <div className="space-y-0.5">
                                <FormLabel htmlFor="remember">
                                  Remember me
                                </FormLabel>
                                <FormDescription className="text-sm text-gray-500">
                                  Stay logged in for a week
                                </FormDescription>
                              </div>
                            </FormItem>
                          </FormLabel>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoggingIn}
                      >
                        Login
                      </Button>

                      <div className="space-y-2 ">
                        <FormLabel className="font-bold text-lg">
                          Test Accounts
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger>
                            <Button
                              type="button"
                              variant="link"
                              className="underline"
                            >
                              View Test Accounts
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="flex flex-col">
                              <div>
                                <p className="font-bold">Employee</p>
                                <p>Username: employee1</p>
                                <p>Password: test123</p>
                              </div>
                              <div>
                                <p className="font-bold">Admin and Manager</p>
                                <p>Username: adminmanager1</p>
                                <p>Password: test123</p>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isLoggingIn}
                          onClick={loginAsEmployee}
                          className="w-full"
                        >
                          Login as Employee
                        </Button>
                        <Button
                          type="button"
                          disabled={isLoggingIn}
                          variant="outline"
                          onClick={loginWithFullControl}
                          className="w-full"
                        >
                          Login as Employee, Admin, and Manager
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {isAboveTheScreen && (
        <section id="login" className=" w-full h-[100vh] flex">
          <div className="relative w-1/2 flex justify-center items-center bg-white">
            <motion.div
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.3 }}
              variants={{
                hidden: {
                  opacity: 0,
                  x: -100,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              className="absolute rounded-r-md bg-primary left-0 w-full m-2 ml-0 shadow-md sm:w-[80%]"
            >
              <div className="bg-primary rounded-r-md pl-[30%] md:pl-[20%]">
                <div className=" space-y-4 px-4 py-8 text-white">
                  <p className="w-48 text-4xl font-bold">Welcome back</p>
                  <p>Sign-in to continue.</p>
                </div>
              </div>
              <div className="bg-white pl-[30%] md:pl-[20%]">
                <div className="w-full px-4 py-8">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormLabel className="text-red-500">
                        Note: Requests might take a while on mount as the server
                        is deployed in a free hosting service.
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name="username"
                        defaultValue={""}
                        rules={{ required: "Username is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="username"
                                className="form-input"
                                type="text"
                                placeholder="Username"
                                disabled={isLoggingIn}
                              ></Input>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        defaultValue={""}
                        rules={{ required: "Password is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl {...field}>
                              <Input
                                className="form-input"
                                type="password"
                                placeholder="Password"
                                disabled={isLoggingIn}
                              ></Input>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="remember"
                        defaultValue={remember}
                        render={({ field }) => (
                          <FormLabel htmlFor="remember">
                            <FormItem
                              // Checks if checkbox is checked and adds border-primary class
                              className={`flex items-start border mt-4 px-3 py-4 gap-2 space-y-0 rounded-md hover:border-primary ${
                                field.value === true ? "border-primary" : ""
                              }`}
                            >
                              <FormControl className="">
                                <Checkbox
                                  id="remember"
                                  checked={field.value}
                                  // disabled={isCreating}
                                  onCheckedChange={field.onChange}
                                  disabled={isLoggingIn}
                                />
                              </FormControl>
                              <div className="space-y-0.5">
                                <FormLabel htmlFor="remember">
                                  Remember me
                                </FormLabel>
                                <FormDescription className="text-sm text-gray-500">
                                  Stay logged in for a week
                                </FormDescription>
                              </div>
                            </FormItem>
                          </FormLabel>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoggingIn}
                      >
                        Login
                      </Button>

                      <div className="space-y-2 ">
                        <FormLabel className="font-bold text-lg mr-2">
                          Test Accounts
                        </FormLabel>

                        <Popover>
                          <PopoverTrigger>
                            <Button
                              type="button"
                              variant="link"
                              className="underline"
                            >
                              View Test Accounts
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="flex flex-col">
                              <div>
                                <p className="font-bold">Employee</p>
                                <p>Username: employee1</p>
                                <p>Password: test123</p>
                              </div>
                              <div>
                                <p className="font-bold">Admin and Manager</p>
                                <p>Username: adminmanager1</p>
                                <p>Password: test123</p>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>

                        <Button
                          type="button"
                          variant="outline"
                          disabled={isLoggingIn}
                          onClick={loginAsEmployee}
                          className="w-full"
                        >
                          Login as Employee
                        </Button>
                        <Button
                          type="button"
                          disabled={isLoggingIn}
                          variant="outline"
                          onClick={loginWithFullControl}
                          className="w-full"
                        >
                          Login as Employee, Admin, and Manager
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="relative w-1/2 bg-secondary flex justify-center items-center  ">
            {/* before:content-['Login'] before:absolute before:-left-12 before:top-[2em]  before:rotate-6 before:font-semibold before:flex before:flex-col before:text-[2em] before:uppercase before:text-white before:tracking-widest before:bg-primary before:px-4 before */}
            <motion.span
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.1, delay: 0.3 }}
              variants={{
                hidden: {
                  opacity: 0,
                  y: -100,
                },
                visible: {
                  opacity: 1,
                  rotate: 6,
                  y: 0,
                },
              }}
              className="absolute px-4 top-[2em] -left-16 bg-primary text-white text-[2em] font-semibold rotate-6 uppercase tracking-widest shadow-sm rounded-sm"
            >
              Login
            </motion.span>
            <motion.h1
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.3, delay: 0.6 }}
              variants={{
                hidden: {
                  opacity: 0,
                },
                visible: {
                  opacity: 1,
                },
              }}
              className="text-[4em] font-bold -rotate-6"
            >
              type<span className="text-primary">Notes</span>
            </motion.h1>
          </div>
        </section>
      )}
    </>
  );
}

export default Login;
