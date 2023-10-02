import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRefreshMutation } from "./authApiSlice";
import useRemember from "@/components/hooks/useRemember";
import { IAuth, Links } from "@/components/types/types";

function RememberLogin() {
  const [remember] = useRemember();
  const dispatch = useDispatch();

  const [refresh, { isLoading: isRefreshing, isError, isSuccess, status }] =
    useRefreshMutation();

  const token = useSelector((state: IAuth) => state.auth.token);

  useEffect(() => {
    const refreshToken = async () => {
      await refresh("");
    };

    if (!token && remember) refreshToken();
  }, [remember, token, refresh, dispatch]);

  return (
    <>
      {/* {isError && <Navigate to={Links.LOGIN} />}
      {isSuccess && !isRefreshing && <Outlet />}
      {!token && <Navigate to={Links.LOGIN} />}
      {token && status === "uninitialized" && <Outlet />} */}
      {isError && <Navigate to={Links.LOGIN} />}
      {isSuccess && !isRefreshing && <Outlet />}
      {!remember && token && <Outlet />}
      {token && status === "uninitialized" && <Outlet />}
    </>
  );
}

export default RememberLogin;
