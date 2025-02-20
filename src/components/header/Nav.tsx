import { Link } from "@/i18n/routing";
import LocaleSwitcher from "./LocaleSwitcher";
import { auth, signOut } from "@/lib/auth";
import { Button } from "../ui/button";

export default async function Nav() {
  const session = await auth();
  return (
    <header className='flex justify-between items-center p-4'>
      <Link
        href="/"
      >
        Home
      </Link>

      <LocaleSwitcher />
      {session?.user && (
        <div className="md:flex hidden gap-6 items-center ">
          <Button
            onClick={async () => {
              "use server"
              await signOut({
                redirectTo: "/auth/login",
              })
            }}
            variant="destructive"
          >
            Logout
          </Button>
          <div>
            <Link href="/create">Create</Link>
          </div>
          <div>
            <Link href="/transactions">Transactions</Link>
          </div>
        </div>
      )}

    </header>
  );
}