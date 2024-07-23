'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreVertical} from "lucide-react";
import React, {ReactNode} from "react";

export default function ActionDropdown({statusMenu}: { statusMenu: ReactNode }) {
    return (
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size={"icon"} className={"mx-2"}>
                      <MoreVertical/>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side={"bottom"} align={"end"} className={"w-44"}>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator/>
                  <DropdownMenuSub>
                      {statusMenu}
                  </DropdownMenuSub>
              </DropdownMenuContent>
          </DropdownMenu>
    )
}