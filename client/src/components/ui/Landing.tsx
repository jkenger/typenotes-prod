import { IChildren } from "../types/types";

function Landing({ children }: IChildren) {
  return (
    <section className="flex items-center h-[80vh]">
      <div className="max-w-md mx-auto">{children}</div>
    </section>
  );
}

function Title({ children }: IChildren) {
  return <div className="flex flex-col items-center gap-4">{children}</div>;
}

function Actions({ children }: IChildren) {
  return <div className="flex justify-center gap-4 md:mt-6">{children}</div>;
}

Landing.Title = Title;
Landing.Actions = Actions;

export default Landing;
