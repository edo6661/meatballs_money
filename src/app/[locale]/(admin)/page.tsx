import { Link } from '@/i18n/routing';
import { signOut } from '@/lib/auth'
import React from 'react'

const AdminDashboard = async () => {


  return (
    <div>

      <div>
        <Link href="/create">Create</Link>
      </div>
      <div>
        <Link href="/transactions">Transactions</Link>
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