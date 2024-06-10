'use client'

import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction} from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import DeleteEvent from "@/lib/database/delete-event";
import {reload} from "@/lib/utils";

export default function DeleteEventDialog(props: {
    id: number,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}) {
    async function deleteEvent(id: number) {
        await DeleteEvent(id);
        reload();
    }

    return (
          <AlertDialog open={props.open} onOpenChange={props.setOpen}>
              <AlertDialogContent>
                  <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this event.
                      </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction asChild><Button onClick={() => deleteEvent(props.id)}
                                                         variant={"destructive"}>Continue</Button></AlertDialogAction>
                  </AlertDialogFooter>
              </AlertDialogContent>
          </AlertDialog>
    )
}