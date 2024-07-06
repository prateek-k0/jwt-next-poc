import { getSession } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const user: any = await getSession();
  if(!user) return <p className="my-8 text-center text-2xl font-mono font-semibold text-slate-300">Please log in to continue</p>

  return (
    <div className="flex flex-col gap-8 items-center justify-start mx-8 my-4 border rounded-lg px-4 py-8">
      <p className="text-2xl font-mono font-semibold">User Details</p>
      <div className="flex flex-col gap-4 fields">
        {Object.keys(user).map((key: string) => (<div key={key} className="flex gap-2 justify-center field items-center">
          <p className=" text-orange-500 font-mono font-medium label text-xl">{key}: </p>
          <p className="text-xl font-semibold font-mono value">{user[key]}</p>
        </div>))}
      </div>
      <Link href="/test" className="px-4 py-2 border rounded-md bg-slate-700 hover:bg-slate-800">Test Authentication</Link>
    </div>
  );
}
