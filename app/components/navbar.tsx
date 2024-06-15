import React from 'react'
import RedditText from "../../public/logo-name.svg"
import redditMobile from "../../public/reddit-full.svg"
import Link from 'next/link'
import Image from 'next/image'

function Navbar() {
  return (
    <nav className='h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between'>
        <Link href="/" className='flex items-center gap-x-3'>
            <Image src={redditMobile} alt='Breadit' className='h-10 w-fit'/>
            <Image src={RedditText} alt='Breadit Desktop' className='h-9 w-fit hidden lg:block'/>
        </Link>
    </nav>
  )
}

export default Navbar