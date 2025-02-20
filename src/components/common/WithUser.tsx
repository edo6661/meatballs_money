import { redirect } from '@/i18n/routing';
import { auth } from '@/lib/auth';
import { User } from '@prisma/client';
import React, { Suspense } from 'react';

interface WithUserProps {
  children: (user: User) => React.ReactNode;
  fallback?: React.ReactNode;
}

const WithUser = async ({ children, fallback }: WithUserProps) => {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    return redirect({
      href: "/auth/login",
      locale: "id",
    });
  }

  return <>
    <Suspense fallback={
      fallback || <div>Loading Default Fallback...</div>
    }

    >
      {children(user)}
    </Suspense>
  </>;
};

export default WithUser;
