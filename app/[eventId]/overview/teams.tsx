'use client'

import React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowDown, ArrowUp, ArrowUpDown, ChevronDown, Minus} from "lucide-react";
import StatusBadge, {toLabel} from "@/components/status-badge";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {TeamStatus} from "@/lib/database/set-team-statues";
import DebouncedInput from "@/components/debounced-input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {ThreatGradeType} from "@/lib/database/set-threat-grade";
import {TeamEntry} from "@prisma/client";
import {percentile, withOrdinalSuffix} from "@/lib/utils";
import ThreatGrade from "@/components/threat-grade";
import QuickTooltip from "@/components/quick-tooltip";

export default function Teams({eventId, data}: { eventId: number, data: TeamEntry[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([
        {
            id: "totalEPA",
            desc: true
        },
        {
            id: "threatGrade",
            desc: true
        }
    ]);
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        autoEPA: false,
        teleopEPA: false,
        endgameEPA: false
    });

    function epaValue(epa: number, deviation: number) {
        let arrow;
        let placement;
        if (deviation > 0.2) {
            arrow = (<ArrowUp className={"w-5 h-5 self-center"}/>);
            placement = "Above";
        } else if (deviation > -0.2) {
            arrow = (<Minus className={"w-5 h-5 self-center"}/>);
            placement = "Around";
        } else {
            arrow = (<ArrowDown className={"w-5 h-5 self-center"}/>);
            placement = "Below";
        }

        return (
              <QuickTooltip
                    trigger={
                        <div className={"ml-4 flex gap-0.5"}>
                            <p>{epa.toFixed(1)}</p>
                            {arrow}
                        </div>
                    }
                    content={`${placement} average; ${withOrdinalSuffix((percentile(deviation) * 100))} percentile`}
              />
        );
    }

    const columns: ColumnDef<TeamEntry>[] = [
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
                );
            },
            cell: ({row}) => (
                  <p className={"ml-4"}>{row.original.teamNumber}</p>
            ),
            enableGlobalFilter: true,
            enableHiding: false
        },
        {
            accessorKey: "name",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Name
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                );
            },
            cell: ({row}) => (
                  <p className={"ml-4 w-44"}>{row.original.name}</p>
            ),
            enableGlobalFilter: true
        },
        {
            accessorKey: "threatGrade",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          <span className={"whitespace-nowrap"}>Threat Grade</span>
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                );
            },
            cell: ({row}) => (
                  <div className={"flex justify-center"}>
                      <ThreatGrade grade={row.original.threatGrade as ThreatGradeType} size={"small"}/>
                  </div>
            ),
            enableGlobalFilter: true
        },
        {
            accessorKey: "autoEPA",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          <span className={"whitespace-nowrap"}>Auto EPA</span>
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                );
            },
            cell: ({row}) => (
                  epaValue(row.original.autoEPA ?? 0, row.original.autoDeviation ?? 0)
            ),
            accessorFn: originalRow => originalRow.autoEPA?.toFixed(1),
            enableGlobalFilter: true
        },
        {
            accessorKey: "teleopEPA",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          <span className={"whitespace-nowrap"}>Teleop EPA</span>
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                );
            },
            cell: ({row}) => (
                  epaValue(row.original.teleopEPA ?? 0, row.original.teleopDeviation ?? 0)
            ),
            accessorFn: originalRow => originalRow.teleopEPA?.toFixed(1),
            enableGlobalFilter: true
        },
        {
            accessorKey: "endgameEPA",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          <span className={"whitespace-nowrap"}>Endgame EPA</span>
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                );
            },
            cell: ({row}) => (
                  epaValue(row.original.endgameEPA ?? 0, row.original.endgameDeviation ?? 0)
            ),
            accessorFn: originalRow => originalRow.endgameEPA?.toFixed(1),
            enableGlobalFilter: true
        },
        {
            accessorKey: "totalEPA",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          <span className={"whitespace-nowrap"}>Total EPA</span>
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                );
            },
            cell: ({row}) => (
                  epaValue(row.original.teleopEPA ?? 0, row.original.teleopDeviation ?? 0)
            ),
            accessorFn: originalRow => originalRow.totalEPA?.toFixed(1),
            enableGlobalFilter: true
        },
        {
            accessorKey: "winrate",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          <span className={"whitespace-nowrap"}>Winrate</span>
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                );
            },
            cell: ({row}) => (
                  <p className={"ml-4"}>
                      <QuickTooltip
                            trigger={
                                <>
                                    {((row.original.wins ?? 0) / ((row.original.wins ?? 0) + (row.original.losses ?? 0)) * 100).toFixed()}
                                    <span className={"muted"}> of 100</span>
                                </>
                            }
                            content={`Theoretically would win ${
                                  ((row.original.wins ?? 0) / ((row.original.wins ?? 0) + (row.original.losses ?? 0)) * 100).toFixed()
                            } out of 100 matches if put up against the same opponents`}
                      />
                  </p>
            ),
            enableGlobalFilter: true
        },
        {
            accessorKey: "worldRank",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          <span className={"whitespace-nowrap"}>World Rank</span>
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                );
            },
            cell: ({row}) => (
                  <p className={"ml-4"}>{withOrdinalSuffix(row.original.worldRank ?? 0)}</p>
            ),
            enableGlobalFilter: true
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
            accessorFn: originalRow => toLabel(originalRow.status as TeamStatus),
            cell: ({row}) => (
                  <div className={"flex justify-center"}>
                      <StatusBadge status={row.original.status as TeamStatus}/>
                  </div>
            ),
            enableGlobalFilter: true
        },
        {
            id: "actions",
            cell: ({row}) => (
                  <div className={"flex justify-center"}>
                      <a href={`/${eventId}/overview/${row.original.teamNumber}`}>
                          <Button variant={"outline"}>View team</Button>
                      </a>
                  </div>
            ),
            enableHiding: false
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
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            rowSelection,
            globalFilter,
            columnVisibility
        },
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: "includesString"
    });

    return (
          <>
              <div className={"flex mt-sm mb-6 gap-3"}>
                  <DebouncedInput
                        debounce={0.1}
                        placeholder="Fillter..."
                        value={globalFilter}
                        onChange={(value) => setGlobalFilter(String(value))}
                        className={"max-w-md"}
                  />
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="ml-auto">
                              Column Visibility <ChevronDown className="ml-2 h-4 w-4"/>
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                          {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    let id = "";
                                    switch (column.id) {
                                        case "name":
                                            id = "Name";
                                            break;
                                        case "threatGrade":
                                            id = "Threat Grade";
                                            break;
                                        case "autoEPA":
                                            id = "Auto EPA";
                                            break;
                                        case "teleopEPA":
                                            id = "Teleop EPA";
                                            break;
                                        case "endgameEPA":
                                            id = "Endgame EPA";
                                            break;
                                        case "totalEPA":
                                            id = "Total EPA";
                                            break;
                                        case "winrate":
                                            id = "Winrate";
                                            break;
                                        case "worldRank":
                                            id = "World Rank";
                                            break;
                                        case "status":
                                            id = "Status";
                                            break;
                                    }

                                    return (
                                          <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className={"mr-1"}
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                      column.toggleVisibility(value)
                                                }
                                          >{id}</DropdownMenuCheckboxItem>
                                    )
                                })}
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
              </Table>
          </>
    );
}