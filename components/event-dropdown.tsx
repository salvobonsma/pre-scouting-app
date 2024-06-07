'use client'

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Edit, MoreVertical, Trash} from "lucide-react";
import EditEventDialog from "@/components/dialogs/edit-event-dialog";
import DeleteEventDialog from "@/components/dialogs/delete-event-dialog";
import {useState} from "react";

export default function EventDropdown(props: { id: number }) {
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    return (
          <>
              <EditEventDialog id={props.id} open={editDialog} setOpen={setEditDialog}/>
              <DeleteEventDialog id={props.id} open={deleteDialog} setOpen={setDeleteDialog}/>
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size={"icon"} className={"mx-2"}>
                          <MoreVertical/>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side={"bottom"}>
                      <DropdownMenuItem onClick={() => setEditDialog(true)}>
                          <Edit className="mr-2 h-4 w-4"/>
                          Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => setDeleteDialog(true)}>
                          <Trash className="mr-2 h-4 w-4"/>
                          Delete
                      </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
          </>
    )
}