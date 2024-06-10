'use client'

import {TeamStatus} from "@/lib/database/set-status";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
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
import {ArrowUpDown} from "lucide-react";

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

    const table = useReactTable({
        data,
        // @ts-ignore
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection
        },
    });

    return (
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
                                )
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
          </Table>
    )
}