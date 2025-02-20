import { Link } from "@/i18n/routing";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Nav() {
  return (
    <header className='flex justify-between items-center p-4'>
      <Link
        href="/"
      >
        Home
      </Link>
      <LocaleSwitcher />
    </header>
  );
}