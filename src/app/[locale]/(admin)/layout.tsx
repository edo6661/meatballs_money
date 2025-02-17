import { Link } from "@/i18n/routing";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return <>
    <div>
      <Link href="/create">Create</Link>
    </div>
    <div>
      {children}
    </div>
  </>
}