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

export default function DeleteEventDialog(props: {
    id: number,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}) {
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
                      <AlertDialogAction asChild><Button variant={"destructive"}>Continue</Button></AlertDialogAction>
                  </AlertDialogFooter>
              </AlertDialogContent>
          </AlertDialog>
    )
}