import { QuizCard } from "@/components/QuizCard"

interface NewQuizSectionProps {
  title?: string
  quizzes?: Array<{
    id: string
    title: string
    date: string
    time: string
    questionCount: number
    duration: string
    description: string
    imageSrc: string
  }>
}

export function NewQuizSection({
  title = "New Quiz",
  quizzes = [
    {
      id: "1",
      title: "Introduction to CPG",
      date: "12 / 03 / 2023",
      time: "09:00 AM",
      questionCount: 75,
      duration: "15 min",
      description: "Introduction to CPG Practice questions to prepare you.",
      imageSrc: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "Introduction to CPG",
      date: "12 / 03 / 2023",
      time: "09:00 AM",
      questionCount: 75,
      duration: "15 min",
      description: "Introduction to CPG Practice questions to prepare you.",
      imageSrc: "/placeholder.svg?height=200&width=300",
    },
  ],
}: NewQuizSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{title}</h2>
      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            title={quiz.title}
            date={quiz.date}
            time={quiz.time}
            questionCount={quiz.questionCount}
            duration={quiz.duration}
            description={quiz.description}
            imageSrc={quiz.imageSrc}
          />
        ))}
      </div>
    </div>
  )
}

