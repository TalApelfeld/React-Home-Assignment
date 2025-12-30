import { useEffect, useRef, useCallback } from "react";

/**
 * Hook to track the first click anywhere on the page
 * Calls the provided callback only once when the first click occurs
 *
 * @param onFirstClick - Callback to execute on first click
 * @param enabled - Whether the tracking is enabled (default: true)
 *
 */
export function useFirstClick(
  onFirstClick: () => void,
  enabled: boolean = true
): void {
  const hasClicked = useRef(false);
  const callbackRef = useRef(onFirstClick);

  const handleClick = useCallback(() => {
    if (!hasClicked.current) {
      hasClicked.current = true;
      callbackRef.current();
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Use capture phase to catch click before it reaches any element
    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, [enabled, handleClick]);

  // Reset on unmount so it works again if component remounts
  useEffect(() => {
    return () => {
      hasClicked.current = false;
    };
  }, []);
}
