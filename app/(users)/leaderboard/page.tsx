import { Leaderboard } from "@/components/LeaderBoard";

export default function LeaderboardPage() {
  const users = [
    {
      id: "1",
      name: "Paul C. Ramos",
      score: 5075,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      level: 8,
    },
    {
      id: "2",
      name: "Derrick L. Thoman",
      score: 4985,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      level: 7,
    },
    {
      id: "3",
      name: "Kelsey T. Donovan",
      score: 4642,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      level: 9,
    },
    {
      id: "4",
      name: "Jack L. Gregory",
      score: 3874,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      level: 6,
    },
    {
      id: "5",
      name: "Mary R. Mercado",
      score: 3567,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      level: 7,
    },
    {
      id: "6",
      name: "Theresa N. Maki",
      score: 3478,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      level: 8,
    },
    {
      id: "7",
      name: "Jack L. Gregory",
      score: 3387,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      level: 5,
    },
    {
      id: "8",
      name: "James R. Stokes",
      score: 3257,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      level: 7,
    },
    {
      id: "9",
      name: "David B. Rodriguez",
      score: 3250,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      level: 8,
    },
    {
      id: "10",
      name: "Annette R. Allen",
      score: 3212,
      avatarUrl: "/placeholder.svg?height=40&width=40",
      level: 9,
    },
  ];

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
