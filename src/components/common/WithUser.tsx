import { redirect } from '@/i18n/routing';
import { auth } from '@/lib/auth';
import { User } from '@prisma/client';
import React from 'react';

interface WithUserProps {
  children: (user: User) => React.ReactNode;
}

const WithUser = async ({ children }: WithUserProps) => {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    return redirect({
      href: "/auth/login",
      locale: "id",
    });
  }

  return <>{children(user)}</>;
};

export default WithUser;
