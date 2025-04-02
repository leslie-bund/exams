import { NewQuizSection } from "@/components/NewQuizSection";
import { ResumeQuiz } from "@/components/ResumeQuiz";

export default function QuizPage() {
  return (
    <div  className="p-6">
      <div className="pb-6">
        <h1 className="text-2xl font-bold">Quiz</h1>
        <p className="mt-2 text-muted-foreground">Take a quiz</p>
      </div>
      <ResumeQuiz />
      <br />
      <NewQuizSection />
    </div>
  );
}
