"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Evalúa una media query en el cliente. En el servidor devuelve `serverValue`. */
export function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
