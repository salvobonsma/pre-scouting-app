'use client'

import {TeamStatus} from "@/lib/database/set-status";
import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import StatusBadge from "@/components/ui/status-badge";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export type Team = {
    teamNumber: number,
    teamName: string,
    status: TeamStatus
}

export function Columns(eventID: number): ColumnDef<Team>[] {
    return [
        {
            accessorKey: "teamNumber",
            header: () => (<span className={"whitespace-nowrap"}>Team #</span>),
            cell: ({row}) => (
                  <Link href={`/${eventID}/${row.getValue("teamNumber")}`}>
                      <Button variant={"link"}>{row.getValue("teamNumber")}</Button>
                  </Link>
            )
        },
        {
            accessorKey: "teamName",
            header: "Name",
            cell: ({row}) => (
                  <Link href={`/${eventID}/${row.getValue("teamNumber")}`}>
                      <Button variant={"link"}>{row.getValue("teamName")}</Button>
                  </Link>
            )
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({row}) => (
                  <div className={"flex"}>
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

    const table = useReactTable({
        data,
        // @ts-ignore
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

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