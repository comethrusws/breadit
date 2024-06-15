"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { Prisma } from "@prisma/client";

export async function updateUsername(prevState:any,formData: FormData){
    const {getUser} = getKindeServerSession();
    const user= await getUser();

    if(!user){
        return redirect("/api/auth/login");
    }

    const username= formData.get("username") as string;
    
    try {
        await prisma.user.update({
            where:{
                id: user.id
            },
            data:{
                userName: username,
            }
        });
    
        return {
            message: "Changed username successfully!",
            status:"green"
        }
    
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code==='P2002'){
                return{
                    message:"This username is already taken",
                    status:"error"
                }
            }
        };
        throw error
    }

}

export async function createCommunity(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user) {
      return redirect("/api/auth/login");
    }
  
    try {
      const name = formData.get("name") as string;
  
      const data = await prisma.subbreadit.create({
        data: {
          name: name,
          userId: user.id,
        },
      });
  
      return redirect(`/br/${data.name}`);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return {
            message: "This name is already taken!",
            status: "error",
          };
        }
      }
      throw e;
    }
  }
  