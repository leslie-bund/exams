import { getListOfExams } from "@/app/actions/getExams";
import { QuizCard } from "@/components/QuizCard";
import { ExamCard } from "@/config/types";

interface NewQuizSectionProps {
  title?: string;
  quizzes?: Array<ExamCard>;
}

export async function NewQuizSection({
  title = "New Quiz",
}: NewQuizSectionProps) {
  const quizzes = await getListOfExams();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
        {title}
      </h2>
      <div className="space-y-4">
        {quizzes?.map((quiz) => (
          <QuizCard
            key={quiz.id}
            title={quiz.title}
            date={quiz.date}
            time={quiz.time}
            questionCount={quiz.questionCount}
            duration={quiz.duration}
            description={quiz.description}
            imageSrc={quiz.imageSrc}
            quizKey={quiz.quizKey}
          />
        ))}
      </div>
    </div>
  );
}
