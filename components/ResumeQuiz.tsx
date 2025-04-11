"use client";

import { getLastAttempt } from "@/app/actions/assessment";
import { getQuizDescription } from "@/app/actions/getExams";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Attempt, useAttemptStore } from "@/lib/hooks/store";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ResumeQuizProps {
  title?: string;
  description?: string;
  progress?: number;
  onResume?: () => void;
}

export function ResumeQuiz({
  title = "Resume Quiz",
  // description = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections",
}: // progress = 72,
// onResume = () => console.log("Resume clicked"),
ResumeQuizProps) {
  const [attempt, setAttempt] = useState<Attempt[] | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [exam, setExam] = useState<string | null>(null);

  const loadUpAttempt = useAttemptStore((state) => state.loadAttempts);

  useEffect(() => {
    async function getAttempt() {
      const { attemptTable } = await getLastAttempt();
      if (attemptTable) {
        const attemptId = attemptTable.id;
        const examId = attemptTable.challengeCode;
        setExam(examId);
        setDescription(await getQuizDescription(examId));
        try {
          const attempt = JSON.parse(attemptTable.challengeList);
          setAttempt(attempt);
          setProgress(
            (attempt?.filter((a: Attempt) => a.selectedAnswer !== "").length /
              attempt.length) *
              100
          );
          loadUpAttempt(attempt, examId, attemptId);
        } catch (error) {
          console.error("Error parsing attempt data:", error);
        }
      }
    }
    getAttempt();
  }, [loadUpAttempt]);

  if (!attempt) {
    return null;
  }

  return (
    <Card className="w-full border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-50">
          {title}&nbsp;-&nbsp;{exam}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {description}
        </p>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Project Progress
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {progress}%
            </span>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-gray-100 dark:bg-gray-800"
          />
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link href="/quiz/exam">
          <Button
            // onClick={onResume}
            className="bg-[#0f172a] hover:bg-[#1e293b] text-white dark:bg-[#0f172a] dark:hover:bg-[#1e293b] dark:text-white"
          >
            Resume
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
