"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface LeaderboardUser {
  id?: string;
  name?: string;
  score?: number;
  avatarUrl?: string;
  level?: number;
}

interface LeaderboardProps {
  users: LeaderboardUser[];
}

export function Leaderboard({ users }: LeaderboardProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          className="pl-10 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800"
          placeholder="Search by"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filteredUsers.map((user, index) => (
          <div
            key={index + JSON.stringify(user)}
            className="flex items-center p-4 bg-white dark:bg-gray-950 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm"
          >
            {index > 2 ? (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm font-medium mr-4">
                {index + 1}
              </div>
            ) : (
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
            )}

            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-sm">
                <AvatarImage src={user.avatarUrl ?? ""} alt={user.name ?? ""} />
                <AvatarFallback>
                  {user.name
                    ?.split(" ")
                    .map((word) => word[0].toUpperCase())
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Badge
                className={`absolute -top-1 -right-1 h-5 min-w-5 ${
                  user.level && user?.level <= 10 ? "p-0" : ""
                } flex items-center justify-center rounded-full bg-blue-500 text-white text-xs`}
              >
                {user.level}
              </Badge>
            </div>

            <span className="ml-3 font-medium">{user.name}</span>

            <span className="ml-auto font-semibold">{user.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
