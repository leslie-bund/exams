"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import Exams from "@/config/types";
import Modal from "@/components/shared/Modal";

import { useRouter } from "next/navigation";
import { Label } from "./ui/label";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { useAttemptStore } from "@/lib/hooks/store";
// import { beginAssessment } from "@/app/actions/beginAssessment";

interface QuizCardProps {
  title: string;
  date: string;
  time: string;
  quizKey: keyof typeof Exams;
  questionCount: number;
  duration: string;
  description: string;
  imageSrc: string;
}

export function QuizCard({
  title,
  // date = "12 / 03 / 2023",
  // time = "09:00 AM",
  // questionCount = 75,
  // duration = "15 min",
  description,
  imageSrc,
  quizKey,
}: QuizCardProps) {
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(5);
  const [timerStarted, startTimer] = useState(false);

  const [numOfQuestions, setNumOfQuestions] = useState(0);

  const { createAttempts } = useAttemptStore();

  const router = useRouter();

  React.useEffect(() => {
    if (timerStarted) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
        if (timer === 0) {
          clearInterval(interval);
          startTimer(false);
          setOpen(false);
          setTimer(5);
          router.push("/quiz/exam");
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerStarted, timer, router]);

  return (
    <>
      <Card className="w-full border-gray-200 dark:border-gray-800 shadow-sm">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            {/* Thumbnail with badge */}
            <div className="relative w-full sm:w-56 h-56 sm:h-auto overflow-hidden bg-gray-100 dark:bg-gray-800">
              {/* <div className="absolute top-2 left-2 z-10">
              <Badge className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
                {duration}
              </Badge>
            </div> */}
              <div
                className="w-full h-full bg-cover bg-center p-4 flex flex-col justify-end"
                style={{ backgroundImage: `url(${imageSrc})` }}
              >
                {/* <div className="text-white text-sm">
                <div className="font-medium">{title}</div>
                <div className="text-xs opacity-80">{description}</div>
              </div> */}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-1">
                  {title}
                </h3>
                <div className="text-xs opacity-80">{description}</div>
                {/* <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                <span>{date}</span>
                <span className="mx-2">•</span>
                <span>{time}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{questionCount} Questions</p> */}
              </div>

              <div className="mt-4 text-right">
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-gray-900 cursor-pointer hover:bg-gray-800 text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                >
                  Begin
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Modal setOpen={setOpen} open={open} title={"Begin Quiz"}>
        {timerStarted ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className=" px-12 py-10 rounded-full shadow-lg flex justify-center items-center mb-4">
              <h1 className="text-3xl w-6 font-bold text-gray-900 dark:text-gray-50">
                {timer}
              </h1>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Quiz starts in:
            </p>
          </div>
        ) : (
          // <form action={beginAssessment}>
          <div className=" mx-auto flex flex-col items-center justify-center w-full">
            <div className="flex-1 p-1">
              <Label htmlFor="email" className="text-muted-foreground mb-2">
                Select Quiz
              </Label>
              <Input
                // style={{ width: "380px" }}
                // name="quizType"
                className="w-[180px] md:w-[380px]"
                id="email"
                type="text"
                value={quizKey}
                readOnly
              />
              <br />
            </div>
            <div className="flex-1 ">
              <Label htmlFor="password" className="text-muted-foreground mb-2">
                Select No of Questions
              </Label>
              <Select
                onValueChange={(value) => {
                  setNumOfQuestions(parseInt(value));
                }}
                // name="numOfQuestions"
              >
                <SelectTrigger className="w-[180px] md:w-[380px]">
                  <SelectValue placeholder="Select no of questions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[5, 10, 15, 20, 25, 30].map((ele, ind) => (
                      <SelectItem key={ind} value={ele + ""}>
                        {ele}
                      </SelectItem>
                    ))}
                    {/* <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem> */}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <br />
            </div>
            <Button
              type="button"
              disabled={numOfQuestions === 0}
              onClick={() => {
                createAttempts(quizKey, numOfQuestions);
                setTimeout(() => {
                  startTimer(true);
                }, 1000);
              }}
              className="bg-gray-900 cursor-pointer hover:bg-gray-800 text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
            >
              Begin
            </Button>
          </div>
          // </form>
        )}
      </Modal>
    </>
  );
}
