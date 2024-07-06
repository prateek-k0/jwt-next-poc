import { getSession } from "@/auth";
import { UserDetails } from "@/types";

const TestPage = async () => {
  const user: UserDetails | null = await getSession<UserDetails>();
  if(!user) return <p className="text-xl text-red-500 font-mono font-semibold">Test failed</p>
  const { username } = user;
  // if(!user) redirect('/');

  return (
    <div className="flex flex-col gap-4 m-8 rounded-lg border px-8 py-4">
      <p className="text-2xl font-mono font-semibold">Test Successful!</p>
      <p className="text-xl font-mono font-semibold">user: {username}</p>
    </div>
  )
}

export default TestPage