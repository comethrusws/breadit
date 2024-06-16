import { updateDescription } from "@/app/actions";
import {SubDescriptionForm} from "@/app/components/SubDescriptionForm";
import { SaveButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Cake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData(name: string){
    const data = await prisma.subbreadit.findUnique({
        where:{
            name: name,
        },
        select:{
            name: true,
            createdAt: true,
            description: true,
            userId: true,
        }
    });
    return data;
}

export default async function SubbreaditRoute({params}:{params:{id: string}}){
    const data= await getData(params.id);
    const {getUser}= getKindeServerSession();
    const user = await getUser();

    return(
        <div className="max-w-[80%] mx-auto flex gap-x-10 mt-4">
            <div className="w-[65%] flex flex-col gap-y-5">
                hello from post
            </div>

            <div className="w-[35%] ">
                <Card>
                    <div className="bg-muted font-semibold p-4 ">About Community</div>
                    <div className="p-4">
                        <div className="flex items-center gap-x-3">
                            <Image className="rounded-full h-16 w-16" src={`https://avatar.vercel.sh/${data?.name}`} width={60} height={60} alt="image of Subbreadit"/>
                            <Link className="font-medium" href={`/br/${data?.name}`}>br/{data?.name}</Link>
                        </div>

                        {user?.id === data?.userId?(
                            <SubDescriptionForm
                            description={data?.description}
                            subName={params.id}
                          />
                        ):(
                            <p className="text-secondary-foreground text-sm font-normal mt-2">{data?.description}</p>
                        )}

                        <div className=" flex items-center gap-x-2 mt-4">
                            <Cake className="h-5 w-5 text-muted-foreground text-xs"/>
                            <p className="text-xs text-muted-foreground">Created: {new Date(data?.createdAt as Date).toLocaleDateString('en-us', {weekday:'long', year:'numeric', month:'short'})}</p>
                        </div>

                        <Separator className="my-5"/>
                        <Button asChild className="rounded-full w-full">
                            <Link href={user?.id ? `/br/${data?.name}/create` : '/api/auth/login'}> Create Post</Link>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}