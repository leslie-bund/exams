"use server";

import { ExamCard } from "@/config/types";

export async function getListOfExams() {
  const quizzes: ExamCard[] = [
    {
      id: "1",
      title: "Introduction to CPG",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      time: "09:00 AM",
      questionCount: 0,
      quizKey: 'cpg',
      duration: "",
      description: "Please take this exam seriously, it cost me my promotion.",
      imageSrc: "/cpg.jpg?height=200&width=300",
    },
  ];
  return quizzes;
}
