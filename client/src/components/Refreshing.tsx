import { useEffect, useState } from "react";
import Landing from "./ui/Landing";
import { Progress } from "@/components/ui/progress";

function Refreshing() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Landing>
      <Landing.Title>
        <h1 className="text-4xl font-semibold text-center mb-6 md:text-[5em] md:whitespace-nowrap">
          type<span className="text-primary">Notes</span>
        </h1>
      </Landing.Title>
      <Landing.Actions>
        <Progress value={progress} className="w-[60%]" />
      </Landing.Actions>
    </Landing>
  );
}

export default Refreshing;
