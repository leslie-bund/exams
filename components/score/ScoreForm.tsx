import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/score/useOptimisticScores";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";



import { type Score, insertScoreParams } from "@/lib/db/schema/score";
import {
  createScoreAction,
  deleteScoreAction,
  updateScoreAction,
} from "@/lib/actions/score";


const ScoreForm = ({
  
  score,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  score?: Score | null;
  
  openModal?: (score?: Score) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Score>(insertScoreParams);
  const editing = !!score?.id;
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("score");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: Score },
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`Score ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const scoreParsed = await insertScoreParams.safeParseAsync({  ...payload });
    if (!scoreParsed.success) {
      setErrors(scoreParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = scoreParsed.data;
    const pendingScore: Score = {
      updatedAt: score?.updatedAt ?? new Date().toISOString().slice(0, 19).replace("T", " "),
      createdAt: score?.createdAt ?? new Date().toISOString().slice(0, 19).replace("T", " "),
      id: score?.id ?? "",
      userId: score?.userId ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingScore,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updateScoreAction({ ...values, id: score.id })
          : await createScoreAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingScore 
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
            errors?.score ? "text-destructive" : "",
          )}
        >
          Score
        </Label>
        <Input
          type="text"
          name="score"
          className={cn(errors?.score ? "ring ring-destructive" : "")}
          defaultValue={score?.score ?? ""}
        />
        {errors?.score ? (
          <p className="text-xs text-destructive mt-2">{errors.score[0]}</p>
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
              addOptimistic && addOptimistic({ action: "delete", data: score });
              const error = await deleteScoreAction(score.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: score,
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

export default ScoreForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
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
