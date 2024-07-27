'use client'

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Edit, MoreVertical, Trash} from "lucide-react";

export default function EventDropdown(props: { id: number, name: string }) {
    return (
          <>
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size={"icon"} className={"mx-2"}>
                          <MoreVertical/>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side={"bottom"}>
                      <DropdownMenuItem disabled>
                          <Edit className="mr-2 h-4 w-4"/>
                          Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" disabled>
                          <Trash className="mr-2 h-4 w-4"/>
                          Delete
                      </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
          </>
    )
}