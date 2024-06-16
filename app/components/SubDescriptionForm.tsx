"use client"

import { Textarea } from "@/components/ui/textarea"
import { SaveButton } from "./SubmitButtons"
import { updateDescription } from "../actions"
import { useFormState } from "react-dom";
import { useEffect } from "react";
import {  useToast } from "@/components/ui/use-toast";

interface iAppProps{
    subName: string;
    description: string|null|undefined
}

const initState={
    message: '',
    ststus:'',
}

export default function SubDescriptionForm({description, subName}:iAppProps){
    const [state, formAction] = useFormState(updateDescription, initState);
    const {toast}=  useToast()

    useEffect(()=>{
        if(state.status==='green'){
            toast({
                title: "Success",
                description:state.message,
            })
        }else if(state.status==='error'){
            toast({
                title:"Error!",
                description: state.message,
            })
        }
    },[state, toast])
    return(
        <form className="mt-3">
                <input type="hidden" name="subName" value={subName} />
                <Textarea defaultValue={description?? undefined} placeholder="Edit Subreadit description" maxLength={120} minLength={10} name="description"/>
                <SaveButton/>
            </form>
    )
}