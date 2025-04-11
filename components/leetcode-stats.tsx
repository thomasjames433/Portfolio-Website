import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface LeetcodeStatsProps {
  username: string
  totalSolved: number
  easySolved?: number
  mediumSolved?: number
  hardSolved?: number
}

export default function LeetcodeStats({
  username,
  totalSolved,
  easySolved = 80,
  mediumSolved = 110,
  hardSolved = 10,
}: LeetcodeStatsProps) {
  // Calculate percentages
  const easyPercentage = (easySolved / totalSolved) * 100
  const mediumPercentage = (mediumSolved / totalSolved) * 100
  const hardPercentage = (hardSolved / totalSolved) * 100

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          <span>LeetCode Stats</span>
          <a
            href={`https://leetcode.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            @{username}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Total Problems Solved</span>
            <span className="font-bold">{totalSolved}+</span>
          </div>
          <Progress value={100} className="h-2 bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-green-600 font-medium">Easy</span>
              <span className="font-bold">{easySolved}</span>
            </div>
            <Progress value={easyPercentage} className="h-2 bg-gray-200" indicatorClassName="bg-green-500" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-yellow-600 font-medium">Medium</span>
              <span className="font-bold">{mediumSolved}</span>
            </div>
            <Progress value={mediumPercentage} className="h-2 bg-gray-200" indicatorClassName="bg-yellow-500" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-red-600 font-medium">Hard</span>
              <span className="font-bold">{hardSolved}</span>
            </div>
            <Progress value={hardPercentage} className="h-2 bg-gray-200" indicatorClassName="bg-red-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
