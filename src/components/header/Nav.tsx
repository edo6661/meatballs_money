import { Link } from "@/i18n/routing";
import LocaleSwitcher from "./LocaleSwitcher";
import { auth, signOut } from "@/lib/auth";
import { Button } from "../ui/button";
import ToggleTheme from "../shared/ToggleTheme";
import { LogOut } from "lucide-react";
import MobileNav from "./MobileNav";

export default async function Nav() {
  const session = await auth();
  const isUserExist = session?.user;
  return (
    <header className='  bg-secondary'>
      <div className="relative overflow-x-hidden">
        <div className="container md:flex hidden justify-between items-center p-4">

          <div className="flex gap-6 items-center">
            <Link
              href="/"
            >
              Home
            </Link>
            {isUserExist && (
              <div className="flex gap-6 items-center ">
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
        <MobileNav />

      </div>


    </header>
  );
}