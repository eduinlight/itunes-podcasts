import { useEffect } from "react";

export function useOnMount(callback: () => void, callbackOnUnmount = () => {}) {
  useEffect(() => {
    callback();
    return callbackOnUnmount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
