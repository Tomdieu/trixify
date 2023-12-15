import {Plus} from "lucide-react";
import {Button as NxButton} from "@nextui-org/react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

// import {Avatar, AvatarGroup} from "@nextui-org/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function CreateChat(){
    return (
        <Dialog>
            <DialogTrigger asChild>
            <NxButton isIconOnly={true} className={"p-2 rounded-md border dark:border-stone-600"}>
                <Plus color={"#BCC1CA"} className={"dark:text-stone-50"}/>
            </NxButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Group</DialogTitle>
                    <DialogDescription>
                        To create a group you need to add at least 2 people in.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className={"grid grid-cols-1 items-center gap-4"}>
                        <Label htmlFor={"group_name"} className={"text-left"}>Group Name</Label>
                        <Input
                            id="group_name"
                            required={true}
                            placeholder={"Group name"}
                            className="col-span-3"
                        />
                    </div>
                    <div className={"grid grid-cols-1 items-center gap-4"}>
                        <Label htmlFor={"description"} className={"text-left"}>Description</Label>
                        <Textarea
                            id="description"
                            required={true}
                            className="col-span-3"
                            placeholder={"description"}
                        />
                    </div>
                    <div className={"grid grid-cols-1 items-center gap-4"}>
                        <Label htmlFor={"members"} className={"text-left"}>Members</Label>
                        <Input
                            id="members"
                            required={true}
                            type={"search"}
                            placeholder={"Group name"}
                            className="col-span-3"
                        />
                    </div>

                    <div className={"flex gap-0.5"}>
                        <Avatar className={"border"}>
                            <AvatarImage src="http://localhost:8000/media/avatars/avatar_2DWKpgm.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar className={"border"}>
                            <AvatarImage src="http://localhost:8000/media/avatars/avatar_2DWKpgm.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}