import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"

import {MatchStatus} from "@/lib/database/set-match-status";
import DataTablePagination from "@/components/data-table-pagination";
import React, {Dispatch, SetStateAction} from "react";
import ActionDropdown from "@/app/(event)/[id]/action-dropdown";
import {
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu";
import {ArrowUpDown, TagIcon} from "lucide-react";
import StatusBadge from "@/components/status-badge";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {cn} from "@/lib/utils";

type Match = {
    key: string,
    compLevel: "qm" | "ef" | "qf" | "sf" | "f",
    startTime: number
    redScore: number,
    blueScore: number,
    friendlyScore: number,
    opponentScore: number,
    friendlyAlliance: boolean,
    status: MatchStatus,
}

export const columns: ColumnDef<Match>[] = [
    {accessorKey: "friendlyAlliance"},
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
        accessorKey: "compLevel",
        header: ({column}) => {
            return (
                  <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  >
                      Level
                      <ArrowUpDown className="ml-2 h-4 w-4"/>
                  </Button>
            )
        },
        cell: ({row}) => {
            const compLevelText = {
                "qm": "Qualifications",
                "ef": "Elimination Finals",
                "qf": "Quarter Finals",
                "sf": "Semifinals",
                "f": "Finals"
            }[row.getValue("compLevel") as "qm" | "ef" | "qf" | "sf" | "f"];

            return <div className={"ml-4"}>{compLevelText}</div>;
        },
        sortingFn: (rowA, rowB) => {
            const compLevelOrder = ["qm", "ef", "qf", "sf", "f"];

            const compLevelA = rowA.getValue("compLevel") as "qm" | "ef" | "qf" | "sf" | "f";
            const compLevelB = rowB.getValue("compLevel") as "qm" | "ef" | "qf" | "sf" | "f";

            const indexA = compLevelOrder.indexOf(compLevelA);
            const indexB = compLevelOrder.indexOf(compLevelB);

            return indexA - indexB;
        }
    },
    {
        accessorKey: "startTime",
        header: ({column}) => {
            return (
                  <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  >
                      Date
                      <ArrowUpDown className="ml-2 h-4 w-4"/>
                  </Button>
            )
        },
        cell: ({row}) => (
              <div className={"ml-4"}>
                  {new Date(row.getValue("startTime") as number * 1000).toLocaleDateString()}
              </div>
        ),
    },
    {
        accessorKey: "redScore",
        header: ({column}) => {
            return (
                  <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  >
                      Red Alliance Score
                      <ArrowUpDown className="ml-2 h-4 w-4"/>
                  </Button>
            )
        },
        cell: ({row}) => (
              <div className={cn(
                    "ml-4",
                    row.getValue("redScore") as number > (row.getValue("blueScore") as number) ? "font-bold" : "",
                    row.getValue("friendlyAlliance") ? "underline" : ""
              )}>
                  {row.getValue("redScore")}
              </div>
        ),
    },
    {
        accessorKey: "blueScore",
        header: ({column}) => {
            return (
                  <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  >
                      Blue Alliance Score
                      <ArrowUpDown className="ml-2 h-4 w-4"/>
                  </Button>
            )
        },
        cell: ({row}) => (
              <div className={cn(
                    "ml-4",
                    (row.getValue("redScore") as number) < (row.getValue("blueScore") as number) ? "font-bold" : "",
                    !row.getValue("friendlyAlliance") ? "underline" : ""
              )}>
                  {row.getValue("blueScore")}
              </div>
        ),
    },
    {
        accessorKey: "friendlyScore",
        header: ({column}) => {
            return (
                  <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  >
                      Friendly Alliance Score
                      <ArrowUpDown className="ml-2 h-4 w-4"/>
                  </Button>
            )
        },
        cell: ({row}) => (
              <div className={cn("ml-4", (row.getValue("friendlyScore") as number > (row.getValue("opponentScore") as number) ? "font-bold" : ""))}>
                  {row.getValue("friendlyScore")}
              </div>
        ),
    },
    {
        accessorKey: "opponentScore",
        header: ({column}) => {
            return (
                  <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  >
                      Opponent Alliance Score
                      <ArrowUpDown className="ml-2 h-4 w-4"/>
                  </Button>
            )
        },
        cell: ({row}) => (
              <div className={cn("ml-4", ((row.getValue("friendlyScore") as number) < (row.getValue("opponentScore") as number) ? "font-bold" : ""))}>
                  {row.getValue("opponentScore")}
              </div>
        ),
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
            );
        },
        cell: ({row}) => (
              <div className={"flex justify-end ml-4"}>
                  <StatusBadge status={row.getValue("status")}/>
              </div>
        )
    },
    {
        id: "actions",
        cell: ({row}) => (
              <div className={"flex justify-center gap-4"}>
                  <Button variant={"outline"}>Match view</Button>
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
                                    >
                                        <StatusBadge status={"notStarted"}/>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                          className={"justify-center"}
                                    >
                                        <StatusBadge status={"inProgress"}/>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                          className={"justify-center"}
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
]

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export default function PastSeasons<TData, TValue>({columns, data, columnVisibility, setColumnVisibility}:
                                                         DataTableProps<TData, TValue> & {
                                                       columnVisibility: VisibilityState,
                                                       setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>
                                                   }) {
    const [sorting, setSorting] = React.useState<SortingState>([
        {
            id: "status",
            desc: true
        },
        {
            id: "startTime",
            desc: false
        }
    ]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnVisibility
        },
        initialState: {
            pagination: {
                pageSize: 10
            }
        }
    });

    return (
          <div className={"mt-sm"}>
              <Table className={"overflow-x-scroll"}>
                  <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className={"border-t-0"}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                          <TableHead className={"text-nowrap"} key={header.id}>
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
              </Table>
              <div className="flex items-center justify-end space-x-2 py-4">
                  <DataTablePagination table={table}/>
              </div>
          </div>
    );
}