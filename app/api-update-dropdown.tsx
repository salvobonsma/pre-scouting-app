'use client'

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Edit, MoreVertical} from "lucide-react";

export default function ApiUpdateDropdown(props: { api: API }) {
    return (
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size={"icon"}>
                      <MoreVertical/>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side={"bottom"} align={"end"}>
                  <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4"/>
                      Update
                  </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
    );
}

// So you can't change any random env var
interface API {
    api: "tba"
}