"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ResumeQuizProps {
  title?: string
  description?: string
  progress?: number
  onResume?: () => void
}

export function ResumeQuiz({
  title = "Resume Quiz",
  description = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections",
  progress = 72,
  onResume = () => console.log("Resume clicked"),
}: ResumeQuizProps) {
  return (
    <Card className="w-full border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-50">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Progress</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{progress}%</span>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-gray-100 dark:bg-gray-800"
          />
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          onClick={onResume}
          className="bg-[#0f172a] hover:bg-[#1e293b] text-white dark:bg-[#0f172a] dark:hover:bg-[#1e293b] dark:text-white"
        >
          Resume
        </Button>
      </CardFooter>
    </Card>
  )
}

