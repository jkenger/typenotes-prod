import { Links } from "@/components/types/types";
import Landing from "@/components/ui/Landing";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
function Welcome() {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <Landing>
      <Landing.Title>
        <div className="w-48 md:w-4xl">
          <p className="w-48 text-md sm:text-lg  text-center md:max-w-4xl ">
            {today}
          </p>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-6 md:text-[5em] md:whitespace-nowrap">
          Welcome to type<span className="text-primary">Notes</span>
        </h1>
      </Landing.Title>
      <Landing.Actions>
        <Link
          to={Links.NOTES}
          className={buttonVariants({ variant: "default" })}
        >
          View Notes
        </Link>
        <Link
          to={Links.USERS}
          className={buttonVariants({ variant: "secondary" })}
        >
          View User Settings
        </Link>
      </Landing.Actions>
    </Landing>
  );

  return content;
}

export default Welcome;
