import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";

/**
 * Hook to block all navigation attempts (back button, forward, URL typing)
 * Users can only navigate to paths in the allowedPaths list
 *
 * @param allowedPaths - Array of paths that the user is allowed to navigate to
 */
export function useBlockNavigation(allowedPaths: string[] = []) {
  const location = useLocation();
  const navigate = useNavigate();
  const lockedPathRef = useRef(location.pathname);

  useEffect(() => {
    // Lock to the current path on mount
    lockedPathRef.current = location.pathname;

    // Push a dummy state to detect back navigation
    window.history.pushState(null, "", location.pathname);

    const handlePopState = () => {
      // Prevent back/forward navigation
      window.history.pushState(null, "", lockedPathRef.current);
    };

    // Listen for browser back/forward buttons
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    // Check if user navigated to a path that's not allowed
    if (
      location.pathname !== lockedPathRef.current &&
      !allowedPaths.includes(location.pathname)
    ) {
      // Redirect back to the locked path
      navigate(lockedPathRef.current, { replace: true });
    }
  }, [location.pathname, allowedPaths, navigate]);
}
