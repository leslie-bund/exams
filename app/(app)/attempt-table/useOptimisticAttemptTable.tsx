
import { type AttemptTable, type CompleteAttemptTable } from "@/lib/db/schema/attemptTable";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<AttemptTable>) => void;

export const useOptimisticAttemptTables = (
  attemptTable: CompleteAttemptTable[],
  
) => {
  const [optimisticAttemptTables, addOptimisticAttemptTable] = useOptimistic(
    attemptTable,
    (
      currentState: CompleteAttemptTable[],
      action: OptimisticAction<AttemptTable>,
    ): CompleteAttemptTable[] => {
      const { data } = action;

      

      const optimisticAttemptTable = {
        ...data,
        
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticAttemptTable]
            : [...currentState, optimisticAttemptTable];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticAttemptTable } : item,
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item,
          );
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticAttemptTable, optimisticAttemptTables };
};
