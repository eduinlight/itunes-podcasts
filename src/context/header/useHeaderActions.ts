import { useCallback, useContext } from "react";
import { GlobalStateContext } from "..";

export function useHeaderActions() {
  const { headerService } = useContext(GlobalStateContext);

  const idle = useCallback(() => {
    headerService.send({
      type: "IDLE",
    });
  }, [headerService]);

  const loading = useCallback(() => {
    headerService.send({
      type: "LOADING",
    });
  }, [headerService]);

  return { idle, loading };
}
