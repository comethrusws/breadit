"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { Prisma, TypeOfVote } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { JSONContent } from "@tiptap/react";

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

export async function updateDescription(prevState:any, formData: FormData){
  const {getUser} = getKindeServerSession();
  const user = await getUser();

  if(!user){
    return redirect("/api/auth/login");
  };

  try {
    const subName= formData.get("subName") as string;
    const  description= formData.get("description") as string;
  
    await prisma.subbreadit.update({
      where:{
        name: subName,
      },
      data:{
        description: description,
      }
    });
    return{
      status:"green",
      message:"Updated the description successfully"
    }
  
  } catch (error) {
    return {
    message:"Sorry, Something went wrong!",
    status:"red"
    }
  }

}

export async function createPost(
  { jsonContent }: { jsonContent: JSONContent | null },
  formData: FormData
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const title = formData.get("title") as string;
  const imageUrl = formData.get("imageUrl") as string | null;
  const subName = formData.get("subName") as string;

  const data = await prisma.post.create({
    data: {
      title: title,
      imageString: imageUrl ?? undefined,
      subName: subName,
      userId: user.id,
      textContent: jsonContent ?? undefined,
    },
  });

  return redirect(`/post/${data.id}`);
}

export async function handleVote(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const postId = formData.get("postId") as string;
  const voteDirection = formData.get("voteDirection") as TypeOfVote;

  const vote = await prisma.vote.findFirst({
    where: {
      postId: postId,
      userId: user.id,
    },
  });

  if (vote) {
    if (vote.voteType === voteDirection) {
      await prisma.vote.delete({
        where: {
          id: vote.id,
        },
      });

      return revalidatePath("/", "page");
    } else {
      await prisma.vote.update({
        where: {
          id: vote.id,
        },
        data: {
          voteType: voteDirection,
        },
      });
      return revalidatePath("/", "page");
    }
  }

  await prisma.vote.create({
    data: {
      voteType: voteDirection,
      userId: user.id,
      postId: postId,
    },
  });

  return revalidatePath("/", "page");
}

export async function createComment(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const comment = formData.get("comment") as string;
  const postId = formData.get("postId") as string;

  const data = await prisma.comemnt.create({
    data: {
      text: comment,
      userId: user.id,
      postId: postId,
    },
  });

  revalidatePath(`/post/${postId}`);
}