
import { useEffect, useState } from "react";

function useRemember() {
  const [remember, setRemember] = useState(
    JSON.parse(localStorage.getItem("remember") || "false") || false
  );

  useEffect(() => {
    localStorage.setItem("remember", JSON.stringify(remember));
  }, [remember]);

  return [remember, setRemember];
}

export default useRemember;
