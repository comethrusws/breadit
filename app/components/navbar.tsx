import React from 'react'
import RedditText from "../../public/logo-name.svg"
import redditMobile from "../../public/reddit-full.svg"
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './themeToggle'

function Navbar() {
  return (
    <nav className='h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between '>
        <Link href="/" className='flex items-center gap-x-3'>
            <Image src={redditMobile} alt='Breadit' className='h-10 w-fit'/>
            <Image src={RedditText} alt='Breadit Desktop' className='h-9 w-fit hidden lg:block'/>
        </Link>

        <div className='flex items-center gap-x-2'>
        <ThemeToggle/>
        <Button variant={'secondary'}>Sign Up</Button>
        <Button>Log in</Button>
        </div>
    </nav>
  )
}

export default Navbar