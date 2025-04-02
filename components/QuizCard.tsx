"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface QuizCardProps {
  title: string
  date: string
  time: string
  questionCount: number
  duration: string
  description: string
  imageSrc: string
}

export function QuizCard({
  title = "Introduction to CPG",
  date = "12 / 03 / 2023",
  time = "09:00 AM",
  questionCount = 75,
  duration = "15 min",
  description = "Introduction to CPG Practice questions to prepare you.",
  imageSrc = "/placeholder.svg?height=200&width=300",
}: QuizCardProps) {
  return (
    <Card className="w-full border-gray-200 dark:border-gray-800 shadow-sm">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Thumbnail with badge */}
          <div className="relative w-full sm:w-56 h-56 sm:h-auto overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div className="absolute top-2 left-2 z-10">
              <Badge className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
                {duration}
              </Badge>
            </div>
            <div
              className="w-full h-full bg-cover bg-center p-4 flex flex-col justify-end"
              style={{ backgroundImage: `url(${imageSrc})` }}
            >
              <div className="text-white text-sm">
                <div className="font-medium">{title}</div>
                <div className="text-xs opacity-80">{description}</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-1">{title}</h3>
              <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                <span>{date}</span>
                <span className="mx-2">•</span>
                <span>{time}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{questionCount} Questions</p>
            </div>

            <div className="mt-4 text-right">
              <Button
                onClick={() => console.log("Begin quiz clicked")}
                className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
              >
                Begin
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

