"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { updateUsername } from "../actions";
import { SubmitButton } from "./SubmitButtons";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const initialState = {
    message:"",
}

export function SettingsForm({
    username,
}: {
    username:string | null | undefined;
}){
    const [state, formAction] = useFormState(updateUsername,initialState);
    const{toast}=useToast();

    useEffect( () => {
        if(state?.status==="green"){
            toast({title:'Success!', description:state.message,});
        } else if(state?.status==="error"){
            toast({title:'Error', description:state.message},);
        }
    }, [state, toast])
    
    return (
        <form action={formAction}>
            <h1 className=" mt-1 text-2xl tracking-tight font-semibold">Settings</h1>
            <br />
            <Label className="text-lg ">Username</Label>
            <p className="text-muted-foreground text-xs">**You can change your username in this section!</p>

            <Input defaultValue={username ?? undefined} name="username" required className="mt-2" min={2} maxLength={21}/>
            {state?.status === 'error' && (<p className="text-xs text-red-500 mt-1">{state.message}</p>)}

            <div className="w-full flex mt-5 gap-x-5 justify-end">
                <Button variant={"secondary"} asChild type="button"><Link href="/">Cancel</Link></Button>
                <SubmitButton/>
            </div>
        </form>
    )
}
