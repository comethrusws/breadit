import React from 'react'
import prisma from '../lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { SettingsForm } from '../components/settingsForm';
import { Separator} from "@/components/ui/separator"

async function getData(userId: string){
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        }, select:{
            userName: true,
        }
    });

    return data;
}

export default async function SettingPage() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user){
        return redirect("/api/auth/login");
    }
    const  data = await getData(user.id)
    return (
        <div className='max-w-[80%] mx-auto flex flex-col mt-4'>
            <p className='text-3xl font-bold'>Hello, { data?.userName }!</p>
            <Separator className="my-4" />
            <SettingsForm username={data?.userName}/>
        </div>
    )
}
