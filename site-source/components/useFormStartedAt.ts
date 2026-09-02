"use client";

import { useCallback, useEffect, useRef } from "react";

export function useFormStartedAt() {
  const startedAtRef = useRef(0);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const getStartedAt = useCallback(() => startedAtRef.current, []);
  const restart = useCallback(() => {
    startedAtRef.current = Date.now();
  }, []);

  return { getStartedAt, restart };
}
