import { Leaderboard, LeaderboardUser } from "@/components/LeaderBoard";
import { getLeaderboardAction } from "@/lib/actions/score";

export default async function LeaderboardPage() {
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

  // console.log("scores", scores);

  return (
    <div>
      <div className="px-4 pt-4">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <p className="mt-2 text-muted-foreground">View the top performers</p>
      </div>
      <div className="md:container mx-auto py-10 px-4 max-w-3xl">
        <Leaderboard users={users} />
      </div>
    </div>
  );
}
