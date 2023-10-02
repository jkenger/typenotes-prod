import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";
import useAuth from "./hooks/useAuth";
import { Badge } from "./ui/badge";
import { Links, SocialLinks } from "./types/types";
type Props = {
  isMenuOpen: boolean;
  onMenuOpen: () => void;
};

function DashFooter({ isMenuOpen, onMenuOpen }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { username, status } = useAuth();

  const handleHomeClick = () => {
    navigate(Links.DASHBOARD);
    if (isMenuOpen) onMenuOpen();
  };

  let goHomeButton: JSX.Element = <></>;

  if (pathname !== Links.DASHBOARD) {
    goHomeButton = (
      <Button onClick={handleHomeClick}>
        <FontAwesomeIcon icon={faHouse} />
      </Button>
    );
  }

  const content = (
    <footer className="sticky bottom-0 w-full px-3 py-4 border-t border-t-1 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center ">
          {goHomeButton}
          <div className="text-sm">
            <p>
              Current user: <span className="font-semibold"> {username}</span>
            </p>
            <p>
              Status: <Badge variant="secondary"> {status}</Badge>
            </p>
          </div>
        </div>
        <div>
          <span className="text-sm">Made with 💗 by</span>
          <HoverCard>
            <HoverCardTrigger>
              <Link
                to={SocialLinks.GITHUB}
                target="_blank"
                className={
                  buttonVariants({
                    variant: "link",
                  }) + " text-primary-foreground hover:text-primary"
                }
              >
                Ken
              </Link>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/73566770?v=4" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    <Link to={SocialLinks.GITHUB} target="_blank">
                      @ken.dev
                    </Link>
                  </h4>
                  <p className="text-sm">
                    Exploring Front-end and Back-end Development
                  </p>
                  <div className="flex items-center pt-2">
                    <span className="text-xs text-muted-foreground">
                      Fullstack Developer
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </footer>
  );
  return content;
}

export default DashFooter;
