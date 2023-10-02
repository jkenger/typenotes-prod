import Landing from "./ui/Landing";

import { buttonVariants } from "@/components/ui/button";

import { Link } from "react-router-dom";
import { Links } from "./types/types";

function Public() {
  return (
    <Landing>
      <Landing.Title>
        <h1 className="text-[4em] sm:text-[6em] font-semibold  whitespace-nowrap">
          type<span className="text-primary">Notes</span>
        </h1>
      </Landing.Title>
      <Landing.Actions>
        <Link
          to={Links.LOGIN}
          className={buttonVariants({ variant: "default" })}
        >
          Employee Login
        </Link>
      </Landing.Actions>
    </Landing>
  );
}

export default Public;
