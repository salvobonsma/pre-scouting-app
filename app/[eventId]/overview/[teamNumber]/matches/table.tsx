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
import DataTablePagination from "@/components/data-table-pagination";
import React, {Dispatch, SetStateAction, useEffect} from "react";
import {ArrowUpDown, ChevronDown} from "lucide-react";
import StatusBadge, {toLabel} from "@/components/status-badge";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import DebouncedInput from "@/components/debounced-input";
import {Match} from "@/app/[eventId]/overview/[teamNumber]/matches/matches";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function MatchesTable({
                                         data,
                                         columnVisibility,
                                         setColumnVisibility,
                                         sorting,
                                         setSorting,
                                         setOrderedMatches,
                                         setCurrentMatch,
                                         setTab,
                                         teamsPerspective
                                     }:
                                           {
                                               data: Match[],
                                               columnVisibility: VisibilityState,
                                               sorting: SortingState,
                                               setSorting: Dispatch<SetStateAction<SortingState>>
                                               setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>,
                                               setOrderedMatches: Dispatch<SetStateAction<Match[]>>,
                                               setCurrentMatch: Dispatch<SetStateAction<string | undefined>>,
                                               setTab: Dispatch<SetStateAction<string>>,
                                               teamsPerspective: boolean
                                           }) {
    const [globalFilter, setGlobalFilter] = React.useState("");

    const columns: ColumnDef<Match>[] = [
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
            accessorFn: originalRow => ({
                "qm": "Qualifications",
                "ef": "Elimination Finals",
                "qf": "Quarter Finals",
                "sf": "Semifinals",
                "f": "Finals"
            }[originalRow.compLevel]),
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
            accessorFn: originalRow => new Date(originalRow.startTime as number * 1000).toLocaleDateString(),
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
            accessorKey: "record",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Scouting Recorded
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"capitalize"}>{`${row.original.record}`}</p>
            ),
            enableGlobalFilter: false
        },
        {
            accessorKey: "autoAmpScores",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Auto Amp Scores
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"ml-4"}>{row.original.record ? row.original.autoAmpScores : undefined}</p>
            ),
            enableGlobalFilter: false
        },
        {
            accessorKey: "autoSpeakerScores",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Auto Speaker Scores
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"ml-4"}>{row.original.record ? row.original.autoSpeakerScores : undefined}</p>
            ),
            enableGlobalFilter: false
        },
        {
            accessorKey: "leftStartingZone",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Left Starting Zone
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"ml-4 capitalize"}>{row.original.record ? `${row.original.leftStartingZone}` : undefined}</p>
            ),
            enableGlobalFilter: false
        },
        {
            accessorKey: "centerLineNote",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Center Line Note
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"ml-4 capitalize"}>{row.original.record ? `${row.original.centerLineNote}` : undefined}</p>
            ),
            enableGlobalFilter: false
        },
        {
            accessorKey: "teleopAmpScores",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Teleop Amp Scores
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"ml-4"}>{row.original.record ? row.original.teleopAmpScores : undefined}</p>
            ),
            enableGlobalFilter: false
        },
        {
            accessorKey: "teleopSpeakerScores",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Teleop Speaker Scores
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"ml-4"}>{row.original.record ? row.original.teleopAmpScores : undefined}</p>
            ),
            enableGlobalFilter: false
        },
        {
            accessorKey: "pickupFrom",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Pickup From
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"ml-4"}>{row.original.record ? (
                        row.original.pickupFrom.length == 0 ?
                              "Neither" :
                              row.original.pickupFrom.map(value => value == "source" ? "Source" : "Ground").join(" & ")
                  ) : undefined}</p>
            ),
            enableGlobalFilter: false
        },
        {
            accessorKey: "finalStatus",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Final Status
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"ml-4 text-nowrap"}>{row.original.record ? (
                        row.original.finalStatus == "parked" ? "Parked" : (
                              row.original.finalStatus == "onstage" ? "Onstage" : (
                                    row.original.finalStatus == "attemptedAndFailed" ? "Attempted And Failed" : (
                                          "Not Attempted"
                                    )
                              )
                        )
                  ) : undefined}</p>
            ),
            enableGlobalFilter: false
        },
        {
            accessorKey: "trap",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Trap
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"ml-4 capitalize"}>{row.original.record ? `${row.original.trap}` : undefined}</p>
            ),
            enableGlobalFilter: false
        },
        {
            accessorKey: "driverSkill",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Driver Skill
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"ml-4 text-nowrap"}>{row.original.record ? (
                        row.original.driverSkill == "effective" ? "Effective" : (row.original.driverSkill == "average" ? "Average" : "Not Effective")
                  ) : undefined}</p>
            ),
            enableGlobalFilter: false
        },
        {
            accessorKey: "defenceSkill",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Defence Skill
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"ml-4 text-nowrap"}>{row.original.record ? (
                        row.original.defenceSkill == "effective" ? "Effective" : (row.original.defenceSkill == "average" ? "Average" : "Not Effective")
                  ) : undefined}</p>
            ),
            enableGlobalFilter: false
        },
        {
            accessorKey: "speed",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Speed
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"ml-4 text-nowrap"}>{row.original.record ? (
                        row.original.speed == "fast" ? "Fast" : (row.original.speed == "average" ? "Average" : "Slow")
                  ) : undefined}</p>
            ),
            enableGlobalFilter: false
        },
        {
            accessorKey: "noteStuck",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Note Stuck
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"ml-4 capitalize"}>{row.original.record ? `${row.original.noteStuck}` : undefined}</p>
            ),
            enableGlobalFilter: false
        },
        {
            accessorKey: "noteDrop",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Note Dropped
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"ml-4 capitalize"}>{row.original.record ? `${row.original.noteDrop}` : undefined}</p>
            ),
            enableGlobalFilter: false
        },
        {
            accessorKey: "breakage",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Breakage
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"ml-4 capitalize"}>{row.original.record ? `${row.original.breakage}` : undefined}</p>
            ),
            enableGlobalFilter: false
        },
        {
            accessorKey: "immobilized",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Immobilized
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"ml-4 capitalize"}>{row.original.record ? `${row.original.immobilized}` : undefined}</p>
            ),
            enableGlobalFilter: false
        },
        {
            accessorKey: "tippy",
            header: ({column}) => {
                return (
                      <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                      >
                          Tippy
                          <ArrowUpDown className="ml-2 h-4 w-4"/>
                      </Button>
                )
            },
            cell: ({row}) => (
                  <p className={"ml-4 capitalize"}>{row.original.record ? `${row.original.tippy}` : undefined}</p>
            ),
            enableGlobalFilter: false
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
            accessorFn: originalRow => toLabel(originalRow.status),
            cell: ({row}) => (
                  <div className={"ml-4"}>
                      <StatusBadge status={row.original.status}/>
                  </div>
            ),
            enableGlobalFilter: true
        },
        {
            id: "actions",
            cell: ({row}) => (
                  <Button variant={"outline"} onClick={() => {
                      setCurrentMatch(row.original.key);
                      setTab("match");
                  }}>Match view</Button>
            ),
            enableHiding: false
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

    useEffect(() => {
        setOrderedMatches(table.getSortedRowModel().rows.map(value => value.original));
    }, [sorting, globalFilter, setOrderedMatches, table, setCurrentMatch]);

    return (
          <div className={"mt-sm"}>
              <div className={"flex justify-between mb-6 gap-3"}>
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
                              Visible Columns <ChevronDown className="ml-2 h-4 w-4"/>
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className={"h-96 overflow-scroll"}>
                          {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    if (column.id == "redScore") return (
                                          <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className={"mr-1 capitalize"}
                                                checked={
                                                      column.getIsVisible() ||
                                                      table.getAllColumns().find(value => value.id == "friendlyScore")?.getIsVisible()
                                                }
                                                onCheckedChange={(value) => {
                                                    if (value) {
                                                        if (teamsPerspective) {
                                                            setColumnVisibility(
                                                                  {
                                                                      ...columnVisibility,
                                                                      redScore: false,
                                                                      blueScore: false,
                                                                      friendlyScore: true,
                                                                      opponentScore: true
                                                                  }
                                                            );
                                                        } else {
                                                            setColumnVisibility(
                                                                  {
                                                                      ...columnVisibility,
                                                                      redScore: true,
                                                                      blueScore: true,
                                                                      friendlyScore: false,
                                                                      opponentScore: false
                                                                  }
                                                            )
                                                        }
                                                    } else {
                                                        setColumnVisibility(
                                                              {
                                                                  ...columnVisibility,
                                                                  redScore: false,
                                                                  blueScore: false,
                                                                  friendlyScore: false,
                                                                  opponentScore: false
                                                              }
                                                        )
                                                    }
                                                }}
                                          >Score</DropdownMenuCheckboxItem>
                                    )
                                    if (column.id == "blueScore" || column.id == "friendlyScore" || column.id == "opponentScore") return (
                                          <></>
                                    )

                                    let id = column.id;
                                    switch (column.id) {
                                        case "compLevel":
                                            id = "Competition Level";
                                            break;
                                        case "startTime":
                                            id = "Date";
                                            break;
                                        case "record":
                                            id = "Scouting Recorded";
                                            break;
                                        case "autoAmpScores":
                                            id = "Auto Amp Scores";
                                            break;
                                        case "autoSpeakerScores":
                                            id = "Auto Speaker Scores";
                                            break;
                                        case "leftStartingZone":
                                            id = "Left Starting Zone";
                                            break;
                                        case "centerLineNote":
                                            id = "Center Line Note";
                                            break;
                                        case "teleopAmpScores":
                                            id = "Teleop Amp Scores";
                                            break;
                                        case "teleopSpeakerScores":
                                            id = "Teleop Speaker Scores";
                                            break;
                                        case "pickupFrom":
                                            id = "Pickup From";
                                            break;
                                        case "finalStatus":
                                            id = "Final Status";
                                            break;
                                        case "driverSkill":
                                            id = "Driver Skill";
                                            break;
                                        case "defenceSkill":
                                            id = "Defence Skill";
                                            break;
                                        case "noteStuck":
                                            id = "Note Stuck";
                                            break;
                                        case "noteDrop":
                                            id = "Note Dropped";
                                            break;
                                    }

                                    return (
                                          <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className={"mr-1 capitalize"}
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