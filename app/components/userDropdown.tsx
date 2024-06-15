/* eslint-disable @next/next/no-img-element */
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {  LogoutLink  } from '@kinde-oss/kinde-auth-nextjs/components'

interface iAppProps{
    userImage: string|null;
}

export default function UserDropdown({userImage}: iAppProps) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <div className='outline-none rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-4'>
                <MenuIcon className='w-6 h-6 lg:w-5 lg:h-5'/>
                <img src={userImage ?? 'https://commons.wikimedia.org/wiki/File:Default_pfp.jpg'} alt="" className='rounded-full h-8 w-8 hidden lg:block'></img>
            </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuItem>
                <Link className='w-full' href="/br/create">Create Community</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link className='w-full' href="/create">Create Post</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link className='w-full' href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>

            <DropdownMenuItem>
                <LogoutLink className='w-full'>Logout</LogoutLink>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

