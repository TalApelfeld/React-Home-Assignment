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
      // When user presses back button, push them forward again
      window.history.pushState(null, "", location.pathname);

      // Optional: Show a message to the user
      // You can uncomment this if you want to alert users
      // alert("Please use the 'Return Home' button to exit the experiment.");
    };

    // Listen for back button events
    window.addEventListener("popstate", handlePopState);

    // Cleanup
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname, navigate]);
}
