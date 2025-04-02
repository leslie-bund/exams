"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/score/useOptimisticScore";
import { type Score } from "@/lib/db/schema/score";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import ScoreForm from "@/components/score/ScoreForm";


export default function OptimisticScore({ 
  score,
   
}: { 
  score: Score; 
  
  
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Score) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticScore, setOptimisticScore] = useOptimistic(score);
  const updateScore: TAddOptimistic = (input) =>
    setOptimisticScore({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <ScoreForm
          score={optimisticScore}
          
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateScore}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticScore.score}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticScore.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticScore, null, 2)}
      </pre>
    </div>
  );
}
