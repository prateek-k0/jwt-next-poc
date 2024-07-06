import React from "react";
import Link from "next/link";
import { getSession } from "@/auth";
import { logoutSubmit } from "@/actions";
import { redirect } from "next/navigation";

const Header = async () => {
  const user = await getSession();
  return (
    <div className=" h-16 w-full bg-slate-800 px-8 flex items-center justify-between">
      <p className="text-2xl font-sans font-semibold brand">
        <Link href='/'>JWT demo</Link>
      </p>
      <nav className="flex gap-4">
        {user === null ? <Link href='/login'>Login</Link> : (
          <form action={logoutSubmit}>
            <button className="rounded-md px-4 py-2 border" type="submit">Logout</button>
          </form>
        )}
      </nav>
    </div>
  )
}

export default Header