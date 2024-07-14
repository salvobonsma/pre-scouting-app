import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"

import SetMatchStatuses, {MatchStatus} from "@/lib/database/set-match-statuses";
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
import DebouncedInput from "@/components/debounced-input";
import {TeamStatus} from "@/lib/database/set-team-statues";

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

export default function MatchesTable({
                                         data,
                                         columnVisibility,
                                         setColumnVisibility,
                                         statusStates,
                                         setStatusStates,
                                         teamEntryId
                                     }:
                                           {
                                               data: Match[],
                                               statusStates: { key: string, status: TeamStatus }[],
                                               setStatusStates: Dispatch<SetStateAction<{
                                                   key: string,
                                                   status: TeamStatus
                                               }[]>>,
                                               columnVisibility: VisibilityState,
                                               setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>,
                                               teamEntryId: number
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
    const [globalFilter, setGlobalFilter] = React.useState("");

    const columns: ColumnDef<Match>[] = [
        {
            id: "select",
            header: ({table}) => (
                  <Checkbox
                        checked={
                              table.getIsAllPageRowsSelected() ||
                              (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
                        aria-label="Select all"
                  />
            ),
            cell: ({row}) => (
                  <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                  />
            )
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
                }[row.original.compLevel];

                return <div className={"ml-4"}>{compLevelText}</div>;
            },
            sortingFn: (rowA, rowB) => {
                const compLevelOrder = ["qm", "ef", "qf", "sf", "f"];

                const compLevelA = rowA.original.compLevel;
                const compLevelB = rowB.original.compLevel;

                const indexA = compLevelOrder.indexOf(compLevelA);
                const indexB = compLevelOrder.indexOf(compLevelB);

                return indexA - indexB;
            },
            enableGlobalFilter: true
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
                      {new Date(row.original.startTime as number * 1000).toLocaleDateString()}
                  </div>
            ),
            enableGlobalFilter: true
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
                        row.original.redScore > (row.original.blueScore) ? "font-bold" : "",
                        row.original.friendlyAlliance ? "underline" : ""
                  )}>
                      {row.original.redScore}
                  </div>
            ),
            enableGlobalFilter: true
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
                        row.original.redScore < row.original.blueScore ? "font-bold" : "",
                        !row.original.friendlyAlliance ? "underline" : ""
                  )}>
                      {row.original.blueScore}
                  </div>
            ),
            enableGlobalFilter: true
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
                  <div className={cn("ml-4", row.original.friendlyScore > row.original.opponentScore ? "font-bold" : "")}>
                      {row.original.friendlyScore}
                  </div>
            ),
            enableGlobalFilter: true
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
                  <div className={cn("ml-4", (row.original.friendlyScore < row.original.opponentScore ? "font-bold" : ""))}>
                      {row.original.opponentScore}
                  </div>
            ),
            enableGlobalFilter: true
        },
        {
            accessorKey: "status",
            header: ({column}) => {
                return (
                      <div className={"flex"}>
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
                  <div className={"ml-4"}>
                      <StatusBadge status={statusStates.find(
                            value => value.key == row.original.key
                      )?.status ?? "notStarted"}/>
                  </div>
            ),
            enableGlobalFilter: true
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
                                              onClick={async () => {
                                                  await setStatus("notStarted", [row.original.key])
                                              }}
                                        >
                                            <StatusBadge status={"notStarted"}/>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                              className={"justify-center"}
                                              onClick={async () => {
                                                  await setStatus("inProgress", [row.original.key])
                                              }}
                                        >
                                            <StatusBadge status={"inProgress"}/>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                              className={"justify-center"}
                                              onClick={async () => {
                                                  await setStatus("completed", [row.original.key])
                                              }}
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
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        state: {
            sorting,
            columnVisibility,
            globalFilter
        },
        initialState: {
            pagination: {
                pageSize: 10
            }
        }
    });

    async function setStatus(status: MatchStatus, keys: string[]) {
        setStatusStates(await SetMatchStatuses(status, teamEntryId, keys));
    }

    return (
          <div className={"mt-sm"}>
              <div className={"flex justify-between mb-6"}>
                  <DebouncedInput
                        debounce={0.1}
                        placeholder="Search..."
                        value={globalFilter}
                        onChange={(value) => setGlobalFilter(String(value))}
                        className={"max-w-md"}
                  />
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
                                          onClick={async () => {
                                              await setStatus("notStarted", table.getFilteredSelectedRowModel().rows.map(row => row.original.key))
                                          }}
                                    >
                                        <StatusBadge status={"notStarted"}/>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                          className={"justify-center"}
                                          onClick={async () => {
                                              await setStatus("inProgress", table.getFilteredSelectedRowModel().rows.map(row => row.original.key))
                                          }}
                                    >
                                        <StatusBadge status={"inProgress"}/>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                          className={"justify-center"}
                                          onClick={async () => {
                                              await setStatus("completed", table.getFilteredSelectedRowModel().rows.map(row => row.original.key))
                                          }}
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