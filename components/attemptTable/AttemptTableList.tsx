"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  type AttemptTable,
  CompleteAttemptTable,
} from "@/lib/db/schema/attemptTable";
import Modal from "@/components/shared/Modal";

import { useOptimisticAttemptTables } from "@/app/(app)/attempt-table/useOptimisticAttemptTable";
import { Button } from "@/components/ui/button";
import AttemptTableForm from "./AttemptTableForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (attemptTable?: AttemptTable) => void;

export default function AttemptTableList({
  attemptTable,
}: {
  attemptTable: CompleteAttemptTable[];
}) {
  const { optimisticAttemptTables, addOptimisticAttemptTable } =
    useOptimisticAttemptTables(attemptTable);
  const [open, setOpen] = useState(false);
  const [activeAttemptTable, setActiveAttemptTable] =
    useState<AttemptTable | null>(null);
  const openModal = (attemptTable?: AttemptTable) => {
    setOpen(true);
    if (attemptTable) {
      setActiveAttemptTable(attemptTable);
    } else {
      setActiveAttemptTable(null);
    }
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={
          activeAttemptTable ? "Edit AttemptTable" : "Create Attempt Table"
        }
      >
        <AttemptTableForm
          attemptTable={activeAttemptTable}
          addOptimistic={addOptimisticAttemptTable}
          openModal={openModal}
          closeModal={closeModal}
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticAttemptTables.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticAttemptTables.map((attemptTable) => (
            <AttemptTable
              attemptTable={attemptTable}
              key={attemptTable.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const AttemptTable = ({
  attemptTable,
}: {
  attemptTable: CompleteAttemptTable;
  openModal: TOpenModal;
}) => {
  const optimistic = attemptTable.id === "optimistic";
  const deleting = attemptTable.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("attempt-table")
    ? pathname
    : pathname + "/attempt-table/";

  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : ""
      )}
    >
      <div className="w-full">
        <div>{attemptTable.challengeCode}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={basePath + "/" + attemptTable.id}>Edit</Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No attempt table
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new attempt table.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Attempt Table{" "}
        </Button>
      </div>
    </div>
  );
};
