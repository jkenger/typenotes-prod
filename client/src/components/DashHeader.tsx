import { NavLink, Link, useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";
import useMediaQuery from "./hooks/useMediaQuery";
import {
  faArrowLeft,
  faEllipsis,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "@/features/auth/authApiSlice";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logOut } from "@/features/auth/authSlice";
import useAuth from "./hooks/useAuth";
import { Links } from "./types/types";

type Props = {
  isMenuOpen: boolean;
  onMenuOpen: () => void;
};

const DashHeader = ({ isMenuOpen, onMenuOpen }: Props) => {
  // Hooks

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAdmin, isManager } = useAuth();

  // Query and Mutations
  const [logout] = useLogoutMutation();

  async function handleLogout() {
    await logout("");
    dispatch(logOut());
    navigate("/login");
  }
  let userNav = null;
  const isAboveTheScreen = useMediaQuery("(min-width: 768px)");
  if (isAdmin || isManager)
    userNav = (
      <NavLink
        to={Links.USERS}
        className={
          buttonVariants({ variant: "navLink" }) + " hover:text-primary"
        }
        onClick={!isAboveTheScreen ? onMenuOpen : () => {}}
      >
        Users
      </NavLink>
    );

  const content = (
    <>
      <header className="relative px-3 py-4 border border-b-1">
        <div className="flex justify-between items-center">
          <Link to={Links.DASHBOARD}>
            <h1 className="text-3xl font-bold text-primary-foreground">
              type<span className="text-primary">Notes</span>
            </h1>
          </Link>
          <nav className="flex gap-3 ">
            {isAboveTheScreen && (
              <>
                {/* add nav buttons later */}
                <NavLink
                  to={Links.NOTES}
                  className={
                    buttonVariants({ variant: "navLink" }) +
                    " hover:text-primary"
                  }
                >
                  Notes
                </NavLink>
                {userNav}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      className="px-4 text-lg hover:text-primary"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full text-left py-0 space-x-4"
                      >
                        <FontAwesomeIcon
                          icon={faRightFromBracket}
                          className="text-destructive"
                        />
                        <span>Logout</span>
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {!isAboveTheScreen && (
              <div
                className={
                  buttonVariants({
                    variant: "ghost",
                  }) + " cursor-pointer flex flex-col gap-1"
                }
                onClick={onMenuOpen}
              >
                <span className="w-5 h-[1px] bg-primary"></span>
                <span className=" w-5 h-[1px] bg-primary"></span>
                <span className="  w-5 h-[1px] bg-primary"></span>
              </div>
            )}
          </nav>

          <div
            className={`${
              !isMenuOpen ? "hidden" : "block"
            } absolute bg-secondary w-full inset-0 h-screen`}
          >
            <div className="relative mx-auto  flex flex-col justify-center items-center gap-4">
              <div className=" px-3 py-4">
                <Button
                  variant="ghost"
                  onClick={onMenuOpen}
                  className="
                 absolute left-0 top-5"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
                <Link to={Links.DASHBOARD} onClick={onMenuOpen}>
                  <h1 className="text-3xl font-bold text-primary-foreground">
                    type<span className="text-primary">Notes</span>
                  </h1>
                </Link>

                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="absolute right-0 top-5"
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="text-destructive"
                  />
                </Button>
              </div>

              <NavLink
                to={Links.NOTES}
                className={
                  buttonVariants({ variant: "navLink" }) +
                  " hover:text-primary w-full"
                }
                onClick={onMenuOpen}
              >
                Notes
              </NavLink>
              {userNav}
            </div>
          </div>
        </div>
      </header>
    </>
  );

  return content;
};
export default DashHeader;
