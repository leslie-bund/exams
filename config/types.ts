export type Question = {
  id: number;
  question: string;
  options: Options; // Use the Options type here
  correctOption: string; // You can also specify a type for the reference if needed
  comment?: string;
};

type Options = {
  [key: string]: string; // This allows for extra options like E, F, G, etc.
};

export type ExamCard = {
  id: string;
  title: string;
  date: string;
  time: string;
  quizKey: keyof (typeof EXAMS);
  questionCount: number;
  duration: string;
  description: string;
  imageSrc: string;
};

import cpg from "./cpg.json";

const EXAMS = {
  cpg,
} as const;

export default EXAMS;