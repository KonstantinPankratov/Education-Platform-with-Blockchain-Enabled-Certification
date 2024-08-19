import { IUserSolution } from "@/db/models/UserSolution";

const fetchUserLastSolution = async (userId: string, exerciseId: string): Promise<IUserSolution | null> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/solution/${exerciseId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Failed to get last submited code')
  }

  return res.json()
}

export default fetchUserLastSolution