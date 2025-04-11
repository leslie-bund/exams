"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Attempt, useAttemptStore } from "@/lib/hooks/store";

import EXAMS from "@/config/types";
import Modal from "@/components/shared/Modal";
import Image from "next/image";
// import router
import { useRouter } from "next/navigation";

export default function ExamPage() {
  const attempts = useAttemptStore((state) => state.attempts);
  const examId = useAttemptStore((state) => state.examId);
  const updateAttempt = useAttemptStore((state) => state.updateAttempt);
  const clearAttempts = useAttemptStore((state) => state.clearAttempts);
  const router = useRouter();
  const [stateAttempt, setStateAttempt] = useState<Attempt[]>(attempts);

  const [activeIndex, setActiveIndex] = useState(() => {
    const index = attempts?.findIndex(
      (attempt) => attempt.selectedAnswer === ""
    );
    return index > -1 ? index : 0;
  });

  const [open, setOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const question = attempts[activeIndex];
  const questionId = question?.questionId;
  const questionList = EXAMS[examId as keyof typeof EXAMS];

  const questionContext = questionList?.find((q) => q.id === questionId);

  return (
    <>
      <div className="border-b-2 border-black pb-3 text-2xl mb-4">
        {examId?.toUpperCase()}
      </div>
      <Card className="bg-grad">
        <CardHeader>
          <CardDescription>
            <div className="flex items-center justify-start ">
              <div className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 text-sm font-medium mr-4">
                {activeIndex + 1}
              </div>
              <span className="inline-block max-h-30 overflow-scroll md:overflow-hidden">
                {questionContext?.question}
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white dark:bg-black">
          <div className="p-4">
            <RadioGroup
              onValueChange={(ans) => {
                updateAttempt(questionId, ans);
              }}
              value={question?.selectedAnswer ?? ""}
            >
              {Object.entries(questionContext?.options ?? {}).map(
                ([key, option], ind) => (
                  <div className="flex items-center space-x-2" key={ind}>
                    <RadioGroupItem value={key} id={"r1" + ind} />
                    <Label htmlFor={"r1" + ind}>{option}</Label>
                  </div>
                )
              )}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
      <div className="md:flex justify-between w-full items-center space-y-3 md:space-y-0 mt-4 mb-12 ">
        <div className="cursor-pointer active:translate-y-1">
          Check Answer{" "}
          <span
            className="inline-flex items-center bg-green-700 text-white justify-center rounded-full border w-6 h-6 font-bold"
            style={{ rotate: "-125deg" }}
          >
            Γ
          </span>
        </div>
        <div className="flex gap-2 ">
          <Button
            variant={"outline"}
            onClick={() => {
              if (activeIndex > 0) {
                setActiveIndex(activeIndex - 1);
              }
            }}
            className=" dark:bg-[#0f172a] dark:hover:bg-[#1e293b] dark:text-white"
          >
            Back
          </Button>
          <Button
            className="bg-[#0f172a] hover:bg-[#1e293b] text-white dark:bg-[#0f172a] dark:hover:bg-[#1e293b] dark:text-white"
            onClick={() => {
              if (activeIndex < attempts.length - 1) {
                setActiveIndex(activeIndex + 1);
              } else {
                setOpen(true);
              }
              updateAttempt(questionId, question?.selectedAnswer ?? "", true);
            }}
          >
            {activeIndex < attempts.length - 1 ? "Next" : "Complete"}
          </Button>
        </div>
      </div>
      <div className="fixed right-0 bottom-0 h-10 bg-amber-300 w-full flex items-center justify-center">
        <div style={{ textShadow: "0px 0px 3px black" }}>
          <span className="font-bold">Answered:</span>
          {attempts.filter((attempt) => attempt.selectedAnswer).length}
          &nbsp;of&nbsp;{attempts.length}
        </div>
      </div>
      <Modal setOpen={setOpen} open={open} title={""}>
        {!isCompleted ? (
          <div className=" mx-auto flex flex-col items-center justify-center gap-4 w-full">
            <Image
              src="/Success-icon.png"
              alt="Badge"
              width={100}
              height={100}
            />

            <div className="text-center text-sm">
              Are you sure you want to submit Quiz ?
            </div>

            <div className="flex justify-between items-center w-full">
              <Button
                variant={"outline"}
                onClick={() => setOpen(false)}
                className="dark:bg-[#0f172a] dark:hover:bg-[#1e293b] dark:text-white"
              >
                No
              </Button>
              <Button
                className="bg-[#0f172a] hover:bg-[#1e293b] text-white dark:bg-[#0f172a] dark:hover:bg-[#1e293b] dark:text-white"
                onClick={() => {
                  clearAttempts();
                  setStateAttempt(attempts);
                  setIsCompleted(true);
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        ) : (
          <div className=" mx-auto flex flex-col items-center justify-center gap-4 w-full">
            {calculateScore(JSON.stringify(stateAttempt)) > 65 ? (
              <Image src="/Badge.png" alt="Badge" width={100} height={100} />
            ) : null}

            <div>
              <div className="text-center text-lg font-bold mb-2">
                {calculateScore(JSON.stringify(stateAttempt)) > 65
                  ? "Congratulations! You Passed!"
                  : "Better Luck Next Time!"}
              </div>
              <div className="text-center text-sm">
                You scored {calculateScore(JSON.stringify(stateAttempt))}%
              </div>
            </div>

            <div className="flex justify-center items-center w-full">
              <Button
                className="bg-[#0f172a] hover:bg-[#1e293b] text-white dark:bg-[#0f172a] dark:hover:bg-[#1e293b] dark:text-white"
                // href="/dashboard"
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                Go home
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

// export function RadioGroupDemo() {
//   return (

//   )
// }

function calculateScore(challengeList: string) {
  // Parse the challengeList JSON string back to an object
  // Recognize that the parsed data will always be of type Attempt[] exported from the lib/hooks/store.tsx file
  // Calculate the final score based on the comparison b/w "answer" and "selectedAnswer" keys in the child objects of the array
  try {
    const parsedList = JSON.parse(challengeList) as Attempt[];
    const score = parsedList.reduce((acc, attempt) => {
      if (attempt.answer === attempt.selectedAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return (score / parsedList.length) * 100; // Return the score as a percentage
  } catch (error) {
    console.error("Error calculating score:", error);
    return 0;
  }
}
