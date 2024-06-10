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
import React from "react";
import {ArrowUpDown, MoreVertical, TagIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import SetTeamStatues, {TeamStatus} from "@/lib/database/set-team-statues";
import {reload} from "@/lib/utils";

export type Team = {
    teamNumber: number,
    teamName: string,
    status: TeamStatus
}

export function Columns(eventID: number): ColumnDef<Team>[] {
    return [
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
                  <Link href={`/${eventID}/${row.getValue("teamNumber")}`}>
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
                  <Link href={`/${eventID}/${row.getValue("teamNumber")}`}>
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
                      <StatusBadge status={row.getValue("status")}/>
                  </div>
            )
        }
    ]
}

export default function TeamsTable<TData>({data, eventId}: {
    data: TData[]
    eventId: number
}) {
    const columns = Columns(eventId);

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

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

    async function SetStatues(status: TeamStatus) {
        await SetTeamStatues(
              eventId,
              table.getFilteredSelectedRowModel().rows.map(row => row.getValue("teamNumber")),
              status
        );
        reload();
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
                              <DropdownMenuSubTrigger>
                                  <TagIcon className="mr-2 h-4 w-4"/>
                                  Set {table.getFilteredSelectedRowModel().rows.length > 1 ? "Statues" : "Status"}
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                  <DropdownMenuSubContent>
                                      <DropdownMenuItem
                                            className={"justify-center"}
                                            onClick={() => SetStatues("notStarted")}
                                      >
                                          <StatusBadge status={"notStarted"}/>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                            className={"justify-center"}
                                            onClick={() => SetStatues("inProgress")}
                                      >
                                          <StatusBadge status={"inProgress"}/>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                            className={"justify-center"}
                                            onClick={() => SetStatues("completed")}
                                      >
                                          <StatusBadge status={"completed"}/>
                                      </DropdownMenuItem>
                                  </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                          </DropdownMenuSub>
                      </DropdownMenuContent>
                  </DropdownMenu>
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