// import SignOutBtn from "@/components/auth/SignOutBtn";
import { LeaderboardUser } from "@/components/LeaderBoard";
import { NewQuizSection } from "@/components/NewQuizSection";
import { ResumeQuiz } from "@/components/ResumeQuiz";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLeaderboardAction } from "@/lib/actions/score";
import { getLastTwoScores } from "@/lib/api/score/queries";
// import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
// import { getUserAuth } from "@/lib/auth/utils";

export default async function Home() {
  // const { session } = await getUserAuth();

  const { score } = await getLastTwoScores();
  const scores = await getLeaderboardAction();
  const users: LeaderboardUser[] =
    typeof scores !== "string"
      ? scores?.map((ele) => ({
          id: ele.email,
          name: ele.name as string,
          score: Number(ele.totalScore),
          avatarUrl: ele.image as string,
          level: ele.total,
        }))
      : [
          {
            id: "1",
            name: "Paul C. Ramos",
            score: 5075,
            avatarUrl: "/placeholder.svg?height=40&width=40",
            level: 8,
          },
        ];

  return (
    <main className="p-4">
      {/* <h1 className="text-2xl font-bold my-2">Profile</h1>
      <pre className="bg-secondary p-4 rounded-lg my-2">
        {JSON.stringify(session, null, 2)}
      </pre>
      <SignOutBtn /> */}
      <div className="md:flex items-center space-y-4 md:space-y-0 gap-4">
        <Card className="w-full border-gray-200 dark:border-gray-800 p-4">
          <CardContent className="p-0">
            <div className="flex flex-col">
              <div className="text-slate-500">Current Score</div>
              <div className="flex items-end justify-between">
                <div className="text-3xl">{score[0]?.score}%</div>

                {score[1]?.score !== undefined && (
                  <Badge
                    variant={"outline"}
                    className={`border ${
                      score[0]?.score - score[1]?.score > 0
                        ? "bg-green-200 dark:bg-green-900 text-green-800  border-green-700"
                        : "bg-red-200 dark:bg-red-900 text-red-800  border-red-700"
                    }`}
                  >
                    {score[0]?.score - score[1]?.score > 0 ? "+" : "-"}&nbsp;
                    {Math.abs(score[1]?.score - score[0]?.score)}%
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full border-gray-200 dark:border-gray-800 p-4">
          <CardContent className="p-0">
            <div className="flex flex-col">
              <div className="text-slate-500">Previous Score</div>
              <div className="text-3xl">{score[1]?.score}%</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="md:grid grid-cols-3 gap-4 mt-4 space-y-4 md:space-y-0">
        <div className="w-full col-span-2">
          <ResumeQuiz />
          <br />
          <NewQuizSection />
        </div>
        <div className="w-full col-span-1">
          <Card className="w-full border-gray-200 dark:border-gray-800 px-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-50">
                {"Leaderboard"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-3">
                {users.map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center p-4 bg-white dark:bg-gray-950 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm"
                  >
                    {index < 3 ? (
                      <div className="mr-2">
                        {index === 0 && (
                          <span className="text-yellow-500 text-xl">🏆</span>
                        )}
                        {index === 1 && (
                          <span className="text-gray-400 text-xl">🏆</span>
                        )}
                        {index === 2 && (
                          <span className="text-amber-700 text-xl">🏆</span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm font-medium mr-4">
                        {index + 1}
                      </div>
                    )}

                    {/* <div className="relative">
                      <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-sm">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs">
                        {user.level}
                      </Badge>
                    </div> */}

                    <span className="ml-3 font-medium">{user.name}</span>

                    <span className="ml-auto font-semibold">{user.score}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
// font-family: Effra;
// font-weight: 700;
// font-size: 36px;
// line-height: 44px;
// letter-spacing: -2%;
