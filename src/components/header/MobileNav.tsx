"use client"
import { Link } from '@/i18n/routing'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Menu, X } from 'lucide-react'
import { motion } from "framer-motion";

const MobileNav = () => {
  const X_INITIAL = "100%"
  const [isOpen, setIsOpen] = useState(false)

  const openIsOpen = () => setIsOpen(true)
  const closeIsOpen = () => setIsOpen(false)
  return (
    <>
      <div className="md:hidden flex justify-between items-center p-4">
        <Link
          href="/"
        >
          Home
        </Link>
        <Button
          size="icon"
          variant="outline"
          onClick={openIsOpen}
        >
          <Menu />
        </Button>
      </div>
      <motion.div
        initial={{ x: X_INITIAL }}
        animate={{ x: isOpen ? 0 : X_INITIAL }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 right-0 w-full h-full bg-primary z-50 flex items-center justify-between container"
      >
        <div className='flex items-center gap-8'>
          <Link
            href="/transactions"
            className='text-primary-foreground'
          >
            Transactions
          </Link>
          <Link
            href="/create"
            className='text-primary-foreground'
          >
            Create
          </Link>
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={closeIsOpen}
          className=""
        >
          <X />
        </Button>

      </motion.div>
    </>
  )
}

export default MobileNav