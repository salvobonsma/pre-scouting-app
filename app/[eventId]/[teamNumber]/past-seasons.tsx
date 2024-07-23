'use client'

import {ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable,} from "@tanstack/react-table";

import React from "react";
import {ArrowDown, ArrowUp, Minus} from "lucide-react";
import QuickTooltip from "@/components/quick-tooltip";
import {withOrdinalSuffix} from "@/lib/utils";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import DataTablePagination from "@/components/data-table-pagination";
import {Separator} from "@/components/ui/separator";

export type Year = {
    year: number,
    winRate: number,
    rank: {
        rank: number,
        of: number
    },
    epa: {
        epa: number,
        percentile: number
    }
}

export const columns: ColumnDef<Year>[] = [
    {
        accessorKey: "year",
        header: "Year",
    },
    {
        accessorKey: "winRate",
        header: () => (<span className={"text-nowrap"}>Win rate</span>),
        cell: ({row}) => {
            const rate = row.getValue("winRate") as Year["winRate"] * 100;
            return (
                  <QuickTooltip
                        trigger={
                            <span className={"text-nowrap"}>
                                {rate.toFixed()}<span className={"muted"}> of 100</span>
                            </span>
                        }
                        content={`Theoretically would win ${rate.toFixed()} out of 100 matches if put up against the same opponents`}
                  />
            )
        }
    },
    {
        accessorKey: "rank",
        header: () => (<span className={"text-nowrap"}>World rank</span>),
        cell: ({row}) => {
            const {rank, of} = row.getValue("rank") as Year["rank"];
            return (<span className={"text-nowrap"}>{rank} <span className={"muted"}>of {of}</span></span>)
        }
    },
    {
        accessorKey: "epa",
        header: () => (<div className={"text-nowrap"}>Average EPA</div>),
        cell: ({row}) => {
            const {epa, percentile} = row.getValue("epa") as Year["epa"];
            let arrow;
            let placement;
            if (percentile < .4) {
                arrow = (<ArrowUp className={"w-5 h-5 self-center"}/>);
                placement = "Above";
            } else if (percentile < .6) {
                arrow = (<Minus className={"w-5 h-5 self-center"}/>);
                placement = "Around";
            } else {
                arrow = (<ArrowDown className={"w-5 h-5 self-center"}/>);
                placement = "Below";
            }

            return (
                  <div className="text-nowrap">
                      <QuickTooltip
                            trigger={
                                <div className={"flex gap-0.5"}>
                                    <p>{epa.toFixed(1)}</p>
                                    {arrow}
                                </div>
                            }
                            content={`${placement} average; ${withOrdinalSuffix(percentile * 100)} percentile`}
                      />
                  </div>
            );
        }
    }
]

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export default function PastSeasons<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 5
            }
        }
    });

    if (data.length < 1) return;

    return (
          <div>
              <h1 className={"mt"}>Past Seasons</h1>
              <Separator/>
              <div className={"mt-sm"}>
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
                  <div className="flex items-center justify-end space-x-2 py-4">
                      <DataTablePagination table={table}/>
                  </div>
              </div>
          </div>
    );
}