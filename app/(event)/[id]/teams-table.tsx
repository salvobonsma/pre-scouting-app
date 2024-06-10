'use client'

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable
} from "@tanstack/react-table"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import StatusBadge from "@/components/ui/status-badge";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import React, {useState} from "react";
import {ArrowUpDown, TagIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu";
import SetTeamStatues, {TeamStatus} from "@/lib/database/set-team-statues";
import ActionDropdown from "@/app/(event)/[id]/action-dropdown";

export type Team = {
    teamNumber: number,
    teamName: string,
    status: TeamStatus
}

export default function TeamsTable<TData>({data, eventId}: {
    data: { teamNumber: number, teamName: string, status: TeamStatus }[]
    eventId: number
}) {
    const [statusStates, setStatusStates] = useState(
          data.map(team => ({teamNumber: team.teamNumber, status: team.status}))
    );
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const columns: ColumnDef<Team>[] = [
        {
            id: "select",
            header: ({table}) => (
                  <Checkbox
                        checked={
                              table.getIsAllPageRowsSelected() ||
                              (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                  />
            ),
            cell: ({row}) => (
                  <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                  />
            ),
        },
        {
            accessorKey: "teamNumber",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          <span className={"whitespace-nowrap"}>Team #</span>
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <Link href={`/${eventId}/${row.getValue("teamNumber")}`}>
                      <Button variant={"link"}>{row.getValue("teamNumber")}</Button>
                  </Link>
            )
        },
        {
            accessorKey: "teamName",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Name
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <Link href={`/${eventId}/${row.getValue("teamNumber")}`}>
                      <Button variant={"link"}>{row.getValue("teamName")}</Button>
                  </Link>
            )
        },
        {
            accessorKey: "status",
            header: ({column}) => {
                return (
                      <div className={"flex justify-end"}>
                          <Button
                                variant="ghost"
                                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                          >
                              Status
                              <ArrowUpDown className="ml-2 h-4 w-4"/>
                          </Button>
                      </div>
                )
            },
            cell: ({row}) => (
                  <div className={"flex justify-end mr-4"}>
                      <StatusBadge status={statusStates.find(
                            value => value.teamNumber == row.getValue("teamNumber")
                      )?.status ?? "notStarted"}/>
                  </div>
            )
        },
        {
            id: "actions",
            size: 20,
            cell: ({row}) => (
                  <div className={"flex justify-center"}>
                      <ActionDropdown statusMenu={(
                            <>
                                <DropdownMenuSubTrigger>
                                    <TagIcon className="mr-2 h-4 w-4"/>
                                    Set status
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem
                                              className={"justify-center"}
                                              onClick={() => setStatuesByTeam("notStarted", [row.getValue("teamNumber")])}
                                        >
                                            <StatusBadge status={"notStarted"}/>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                              className={"justify-center"}
                                              onClick={() => setStatuesByTeam("inProgress", [row.getValue("teamNumber")])}
                                        >
                                            <StatusBadge status={"inProgress"}/>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                              className={"justify-center"}
                                              onClick={() => setStatuesByTeam("completed", [row.getValue("teamNumber")])}
                                        >
                                            <StatusBadge status={"completed"}/>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </>
                      )}/>
                  </div>
            )
        }
    ];

    const table = useReactTable({
        data,
        // @ts-ignore
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            rowSelection,
            columnFilters
        },
    });

    async function setStatues(status: TeamStatus) {
        await setStatuesByTeam(
              status,
              table.getFilteredSelectedRowModel().rows.map(row => row.getValue("teamNumber"))
        );
    }

    async function setStatuesByTeam(status: TeamStatus, teams: number[]) {
        // @ts-ignore
        setStatusStates(await SetTeamStatues(eventId, teams, status));
    }

    return (
          <>
              <div className={"flex justify-between mb-6"}>
                  <div className="flex items-center">
                      <Input
                            placeholder="Search..."
                            value={(table.getColumn("teamName")?.getFilterValue() as string) ?? ""}
                            onChange={(event) => table.getColumn("teamName")?.setFilterValue(event.target.value)}
                      />
                  </div>
                  <ActionDropdown statusMenu={(
                        <>
                            <DropdownMenuSubTrigger>
                                <TagIcon className="mr-2 h-4 w-4"/>
                                Set {table.getFilteredSelectedRowModel().rows.length > 1 ? "statues" : "status"}
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem
                                          className={"justify-center"}
                                          onClick={() => setStatues("notStarted")}
                                    >
                                        <StatusBadge status={"notStarted"}/>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                          className={"justify-center"}
                                          onClick={() => setStatues("inProgress")}
                                    >
                                        <StatusBadge status={"inProgress"}/>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                          className={"justify-center"}
                                          onClick={() => setStatues("completed")}
                                    >
                                        <StatusBadge status={"completed"}/>
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </>
                  )}/>
              </div>
              <Table className={"overflow-x-scroll"}>
                  <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className={"border-t-0"}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                          <TableHead key={header.id}>
                                              {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column.columnDef.header,
                                                          header.getContext()
                                                    )}
                                          </TableHead>
                                    );
                                })}
                            </TableRow>
                      ))}
                  </TableHeader>
                  <TableBody>
                      {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                  <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                  >
                                      {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                      cell.column.columnDef.cell,
                                                      cell.getContext()
                                                )}
                                            </TableCell>
                                      ))}
                                  </TableRow>
                            ))
                      ) : (
                            <TableRow>
                                <TableCell
                                      colSpan={columns.length}
                                      className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                      )}
                  </TableBody>
              </Table></>
    )
}