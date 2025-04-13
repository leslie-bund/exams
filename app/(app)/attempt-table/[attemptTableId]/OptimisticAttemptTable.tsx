"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/attempt-table/useOptimisticAttemptTable";
import { type AttemptTable } from "@/lib/db/schema/attemptTable";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import AttemptTableForm from "@/components/attemptTable/AttemptTableForm";


export default function OptimisticAttemptTable({ 
  attemptTable,
   
}: { 
  attemptTable: AttemptTable; 
  
  
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: AttemptTable) => {
    if(_) {}
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticAttemptTable, setOptimisticAttemptTable] = useOptimistic(attemptTable);
  const updateAttemptTable: TAddOptimistic = (input) =>
    setOptimisticAttemptTable({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <AttemptTableForm
          attemptTable={optimisticAttemptTable}
          
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateAttemptTable}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticAttemptTable.challengeCode}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticAttemptTable.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticAttemptTable, null, 2)}
      </pre>
    </div>
  );
}
