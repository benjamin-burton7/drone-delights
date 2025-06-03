import { useEffect, useState } from "react";

// Custom hook to detect if the current screen size is considered mobile (< 768px)
export const useIsMobile = () => {
  // Initial state is determined by current window width
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add event listener when component mounts
    window.addEventListener("resize", handleResize);

    // Clean up event listener when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Return whether the screen is in mobile view
  return isMobile;
};
