/* eslint-disable @typescript-eslint/no-unused-expressions */
import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/attempt-table/useOptimisticAttemptTable";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";



import { type AttemptTable, insertAttemptTableParams } from "@/lib/db/schema/attemptTable";
import {
  createAttemptTableAction,
  deleteAttemptTableAction,
  updateAttemptTableAction,
} from "@/lib/actions/attemptTable";


const AttemptTableForm = ({
  
  attemptTable,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  attemptTable?: AttemptTable | null;
  
  openModal?: (attemptTable?: AttemptTable) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<AttemptTable>(insertAttemptTableParams);
  const editing = !!attemptTable?.id;
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("attempt-table");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: AttemptTable },
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      postSuccess && postSuccess();
      toast.success(`AttemptTable ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const attemptTableParsed = await insertAttemptTableParams.safeParseAsync({  ...payload });
    if (!attemptTableParsed.success) {
      setErrors(attemptTableParsed?.error.flatten().fieldErrors);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    closeModal && closeModal();
    const values = attemptTableParsed.data;
    const pendingAttemptTable: AttemptTable = {
      updatedAt: attemptTable?.updatedAt ?? new Date().toISOString().slice(0, 19).replace("T", " "),
      createdAt: attemptTable?.createdAt ?? new Date().toISOString().slice(0, 19).replace("T", " "),
      id: attemptTable?.id ?? "",
      userId: attemptTable?.userId ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingAttemptTable,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updateAttemptTableAction({ ...values, id: attemptTable.id })
          : await createAttemptTableAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingAttemptTable 
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined,
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className={"space-y-8"}>
      {/* Schema fields start */}
              <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.challengeCode ? "text-destructive" : "",
          )}
        >
          Challenge Code
        </Label>
        <Input
          type="text"
          name="challengeCode"
          className={cn(errors?.challengeCode ? "ring ring-destructive" : "")}
          defaultValue={attemptTable?.challengeCode ?? ""}
        />
        {errors?.challengeCode ? (
          <p className="text-xs text-destructive mt-2">{errors.challengeCode[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.challengeList ? "text-destructive" : "",
          )}
        >
          Challenge List
        </Label>
        <Input
          type="text"
          name="challengeList"
          className={cn(errors?.challengeList ? "ring ring-destructive" : "")}
          defaultValue={attemptTable?.challengeList ?? ""}
        />
        {errors?.challengeList ? (
          <p className="text-xs text-destructive mt-2">{errors.challengeList[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      {/* Schema fields end */}

      {/* Save Button */}
      <SaveButton errors={hasErrors} editing={editing} />

      {/* Delete Button */}
      {editing ? (
        <Button
          type="button"
          disabled={isDeleting || pending || hasErrors}
          variant={"destructive"}
          onClick={() => {
            setIsDeleting(true);
            closeModal && closeModal();
            startMutation(async () => {
              addOptimistic && addOptimistic({ action: "delete", data: attemptTable });
              const error = await deleteAttemptTableAction(attemptTable.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: attemptTable,
              };

              onSuccess("delete", error ? errorFormatted : undefined);
            });
          }}
        >
          Delet{isDeleting ? "ing..." : "e"}
        </Button>
      ) : null}
    </form>
  );
};

export default AttemptTableForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="mr-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};
