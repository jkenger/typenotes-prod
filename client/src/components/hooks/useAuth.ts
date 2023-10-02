import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { IAuth, IDecodedToken } from "../types/types";

function useAuth() {
  const token = useSelector((state: IAuth) => state.auth.token);
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";

  if (token) {
    const decodedToken = jwtDecode(token) as IDecodedToken;
    const { roles, username, id } = decodedToken.userInfo;

    isManager = roles?.includes("Manager");
    isAdmin = roles?.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return { id, username, roles, isManager, isAdmin, status };
  }

  return { id: "", username: "", roles: [], isManager, isAdmin, status };
}

export default useAuth;
