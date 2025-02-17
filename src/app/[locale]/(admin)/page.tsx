import { Link } from '@/i18n/routing';
import { auth, signOut } from '@/lib/auth'
import React from 'react'

const AdminDashboard = async () => {
  const session = await auth();
  const user = session?.user;


  return (
    <div>

      <h1>Welcome {user?.name}</h1>
      <div>
        <Link href="/create">Create</Link>
      </div>
      <button
        onClick={async () => {
          "use server"
          await signOut({
            redirectTo: "/auth/login",
          })
        }}
        className='bg-red-500 px-4 py-2 rounded-xl'
      >
        Logout
      </button>
    </div>
  )
}

export default AdminDashboard