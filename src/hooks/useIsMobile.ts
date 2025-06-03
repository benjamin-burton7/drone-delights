// hooks/useIsMobile.ts
import { useEffect, useState } from "react";

// Custom hook to determine if the current screen width is less than 768px
export const useIsMobile = () => {
  const getIsMobile = () =>
    typeof window !== "undefined" && window.innerWidth < 768;

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};
