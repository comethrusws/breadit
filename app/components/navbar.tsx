import React from 'react'
import RedditText from "../../public/logo-name.svg"
import redditMobile from "../../public/reddit-full.svg"
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './themeToggle'
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import UserDropdown from './userDropdown'

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className='h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between '>
        <Link href="/" className='flex items-center gap-x-3'>
            <Image src={redditMobile} alt='Breadit' className='h-10 w-fit'/>
            <Image src={RedditText} alt='Breadit Desktop' className='h-9 w-fit hidden lg:block'/>
        </Link>

        <div className='flex items-center gap-x-2'>
        <ThemeToggle/>
        { user ? (
          <div>
            <UserDropdown userImage={user.picture}/>
          </div>
        ): (
          <div className='flex items-center gap-x-2'>
              <Button variant={'secondary'} asChild><RegisterLink>Sign Up</RegisterLink></Button>
              <Button asChild><LoginLink>Login in</LoginLink></Button>

          </div>
        )}
        </div>
    </nav>
  )
}

export default Navbar