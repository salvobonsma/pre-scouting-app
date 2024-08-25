'use client'

import * as React from "react"

import {Button} from "@/components/ui/button"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"
import {Drawer, DrawerContent, DrawerTrigger,} from "@/components/ui/drawer"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {Team} from "@prisma/client";
import {ChevronsUpDown} from "lucide-react";

export function TeamDropdown({eventId, teams, a, b, side}: {
    eventId: number,
    teams: Team[],
    a: string | undefined,
    b: string | undefined,
    side: "a" | "b"
}) {
    const [open, setOpen] = React.useState(false);
    const [selectedTeam, setSelectedTeam] = React.useState<Team | null>(
          teams.find(value => `${value.number}` == (side == "a" ? a : b)) ?? null
    );

    if (typeof window !== "undefined" && window.innerWidth > 768) {
        return (
              <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                      <Button variant="outline" className="w-80 justify-between">
                          {selectedTeam ? <>{label(selectedTeam)}</> : <p className={"muted"}>Select a team...</p>}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                      </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="start">
                      <StatusList eventId={eventId} a={a} b={b} side={side} teams={teams} setOpen={setOpen}/>
                  </PopoverContent>
              </Popover>
        )
    }

    return (
          <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                  <Button variant="outline" className="w-80 justify-between">
                      {selectedTeam ? <>{label(selectedTeam)}</> : <p className={"muted"}>Select a team...</p>}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                  </Button>
              </DrawerTrigger>
              <DrawerContent>
                  <div className="mt-4 border-t">
                      <StatusList eventId={eventId} a={a} b={b} side={side} teams={teams} setOpen={setOpen}/>
                  </div>
              </DrawerContent>
          </Drawer>
    )
}

function StatusList({
                        setOpen,
                        teams,
                        eventId,
                        a,
                        b,
                        side
                    }: {
    setOpen: (open: boolean) => void
    teams: Team[],
    eventId: number, a: string | undefined, b: string | undefined, side: "a" | "b"
}) {
    return (
          <Command>
              <CommandInput placeholder="Filter teams..."/>
              <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                      {teams.map((team) => (
                            !((side == "a" && b == `${team.number}`) || (side == "b" && a == `${team.number}`)) && (
                                  <CommandItem
                                        key={team.number}
                                        value={label(team)}
                                        onSelect={async (value) => {
                                            setOpen(false)
                                            if (side == "a") {
                                                a = value;
                                            } else {
                                                b = value;
                                            }
                                            window.open(`/${eventId}/overview/compare?${side == "a" ? `a=${team.number}` : (a ? `a=${a}` : "")}&${side == "b" ? `b=${team.number}` : (b ? `b=${b}` : "")}`, "_self");
                                        }}
                                  >
                                      {label(team)}
                                  </CommandItem>
                            )
                      ))}
                  </CommandGroup>
              </CommandList>
          </Command>
    );
}

function label(team: Team) {
    return `Team ${team.number}, ${team.name}`;
}