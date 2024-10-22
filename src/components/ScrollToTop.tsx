import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Set scroll restoration to manual
    history.scrollRestoration = "manual";

    // Scroll to top immediately, synchronously
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
