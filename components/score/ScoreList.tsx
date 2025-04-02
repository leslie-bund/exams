"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Score, CompleteScore } from "@/lib/db/schema/score";
import Modal from "@/components/shared/Modal";

import { useOptimisticScores } from "@/app/(app)/score/useOptimisticScore";
import { Button } from "@/components/ui/button";
import ScoreForm from "./ScoreForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (score?: Score) => void;

export default function ScoreList({ score }: { score: CompleteScore[] }) {
  const { optimisticScores, addOptimisticScore } = useOptimisticScores(score);
  const [open, setOpen] = useState(false);
  const [activeScore, setActiveScore] = useState<Score | null>(null);
  const openModal = (score?: Score) => {
    setOpen(true);
    if (score) {
      setActiveScore(score);
    } else {
      setActiveScore(null);
    }
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeScore ? "Edit Score" : "Create Score"}
      >
        <ScoreForm
          score={activeScore}
          addOptimistic={addOptimisticScore}
          openModal={openModal}
          closeModal={closeModal}
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticScores.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticScores.map((score) => (
            <Score score={score} key={score.id} openModal={openModal} />
          ))}
        </ul>
      )}
    </div>
  );
}

const Score = ({ score }: { score: CompleteScore; openModal: TOpenModal }) => {
  const optimistic = score.id === "optimistic";
  const deleting = score.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("score") ? pathname : pathname + "/score/";

  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : ""
      )}
    >
      <div className="w-full">
        <div>{score.score}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={basePath + "/" + score.id}>Edit</Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No score
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new score.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Score{" "}
        </Button>
      </div>
    </div>
  );
};
