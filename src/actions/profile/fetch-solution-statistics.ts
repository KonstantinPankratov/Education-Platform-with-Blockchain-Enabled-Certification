"use server"

import dbConnect from "@/db/dbConnect"
import UserSolution from "@/db/models/UserSolution"
import { Types } from "mongoose"

interface DailySolution {
  date: string,
  count: number
}

interface SolutionStatistics {
  difference: number,
  daily: DailySolution[]
}

const fetchUserSolutionStatistics = async (userId: string): Promise<SolutionStatistics> => {
  try {
    const userObjectId = new Types.ObjectId(userId)

    await dbConnect()

    var moment = require('moment')

    const currWeekStart = moment().startOf('week').toDate()
    const prevWeekStart = moment().startOf('week').subtract(1, 'weeks').toDate()

    const data: DailySolution[] = [];
    for (let i = 0; i < 7; i++) {
      data.push({
        date: moment().startOf('week').add(i, 'days').format('MMM DD, YYYY'),
        count: 0
      });
    }

    const currentWeekSolutions = await UserSolution.aggregate([
      {
        $match: {
          createdAt: { $gte: currWeekStart },
          userId: userObjectId,
          failedTestIds: { $size: 0 },
        }
      },
      {
        $project: {
          date: {
            $dateToString: {
              format: '%b %d, %Y',
              date: '$createdAt',
            },
          },
          exerciseId: '$exerciseId'
        }
      },
      {
        $group: {
          _id: {
            date: '$date',
            exerciseId: '$exerciseId' // TODO unique exercise IDs
          },
          count: {
            $sum: 1
          }
        }
      },
      {
        $project: {
          _id: 0,
          date: '$_id.date',
          count: 1,
        }
      },
    ])

    currentWeekSolutions.forEach(solution => {
      const index = data.findIndex(day => day.date === solution.date);
      if (index !== -1) {
        data[index].count = solution.count;
      }
    });

    const totalForTwoWeeks: {
      previousWeek: number
      currentWeek: number,
      relative: number
    }[] = await UserSolution.aggregate([
      {
        $match: {
          userId: userObjectId,
          failedTestIds: { $size: 0 },
        }
      },
      {
        "$group": {
          "_id": {
            exerciseId: '$exerciseId'
          },
          "previousWeek": {
            "$sum": {
              "$cond": [
                {
                  "$and": [
                    { "$gte": ["$createdAt", prevWeekStart] },
                    { "$lt": ["$createdAt", currWeekStart] }
                  ]
                },
                1,
                0
              ]
            }
          },
          "currentWeek": {
            "$sum": {
              "$cond": [
                { "$gte": ["$createdAt", currWeekStart] },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          previousWeek: 1,
          currentWeek: 1,
          relative: { $subtract: ["$currentWeek", "$previousWeek"] }
        }
      }
    ])

    return {
      difference: totalForTwoWeeks.length ? totalForTwoWeeks[0].relative : 0,
      daily: data
    }
  } catch (error) {
    throw error
  }
}

export default fetchUserSolutionStatistics