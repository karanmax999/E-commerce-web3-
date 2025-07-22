import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// This component forces the window to scroll to the top
// whenever the route changes (based on pathname)
const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  // Render children normally
  return children || null;
};

export default ScrollToTop;
