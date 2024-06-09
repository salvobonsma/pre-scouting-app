'use client'

import {TeamStatus} from "@/lib/database/set-status";
import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"

export type Team = {
    teamNumber: number,
    teamName: string,
    status: TeamStatus
}

export const columns: ColumnDef<Team>[] = [
    {
        accessorKey: "teamNumber",
        header: "Team #",
    },
    {
        accessorKey: "teamName",
        header: "Name",
    },
    {
        accessorKey: "status",
        header: "Status",
    }
]

export default function TeamsTable<TData, TValue>({data, columns, eventId}: {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    eventId: number
}) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
          <div className="rounded-md border p-1">
              <Table>
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
          </div>
    )
}