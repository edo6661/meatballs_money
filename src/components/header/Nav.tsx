import { Link } from "@/i18n/routing";
import LocaleSwitcher from "./LocaleSwitcher";
import { auth, signOut } from "@/lib/auth";
import { Button } from "../ui/button";
import ToggleTheme from "../shared/ToggleTheme";
import { LogOut } from "lucide-react";

export default async function Nav() {
  const session = await auth();
  const isUserExist = session?.user;
  return (
    <header className='  bg-secondary'>
      <div className="container flex justify-between items-center p-4">
        <div className="md:flex hidden gap-6 items-center">
          <Link
            href="/"
          >
            Home
          </Link>
          {isUserExist && (
            <div className="md:flex hidden gap-6 items-center ">
              <div>
                <Link href="/create">Create</Link>
              </div>
              <div>
                <Link href="/transactions">Transactions</Link>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <ToggleTheme />
          {isUserExist && (
            <Button
              onClick={async () => {
                "use server"
                await signOut({
                  redirectTo: "/auth/login",
                })
              }}
              variant="outline"
            >
              <LogOut />
            </Button>
          )}
        </div>
      </div>


    </header>
  );
}