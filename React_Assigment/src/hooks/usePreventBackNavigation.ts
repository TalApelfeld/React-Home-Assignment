import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

/**
 * Hook to prevent backward navigation in the browser
 * Useful for experiment pages where users should only move forward
 * and can only return via the "Return Home" button
 */
export function usePreventBackNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Push a dummy state to history to detect back navigation
    window.history.pushState(null, "", location.pathname);

    const handlePopState = (event: PopStateEvent) => {
      console.log(event);
      // When user presses back button, push them forward again
      window.history.pushState(null, "", location.pathname);
    };

    // Listen for back button events
    window.addEventListener("popstate", handlePopState);

    // Cleanup
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname, navigate]);
}
