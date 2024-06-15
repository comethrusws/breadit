import { Card } from "@/components/ui/card";

export default function SubbreaditRoute(){
    return(
        <div className="max-w-[80%] mx-auto flex gap-x-10 mt-4">
            <div className="w-[65%] flex flex-col gap-y-5">
                hello from post
            </div>

            <div className="w-[35%] ">
                <Card>
                    <div className="bg-muted font-semibold p-4 ">About Community</div>
                </Card>
            </div>
        </div>
    )
}