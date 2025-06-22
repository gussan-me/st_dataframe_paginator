// components/DataTable.tsx
import React from "react"
import { flexRender, Table } from "@tanstack/react-table"
import "../st-dataframe-paginator.css"

type Props<T> = {
  table: Table<T>
  columnWidths: Record<string, number>
  pageData: any[]
  onMouseDownResize: (colId: string, e: React.MouseEvent) => void
}

export function DataTable<T>({
  table,
  columnWidths,
  pageData,
  onMouseDownResize,
}: Props<T>) {
  const totalWidth =
    Object.values(columnWidths).reduce((a, b) => a + b, 0) || 800

  return (
    <div className="scroll-wrapper">
      <table className="table" style={{ minWidth: totalWidth }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="th"
                  style={{
                    width: columnWidths[header.id] || 100,
                    minWidth: columnWidths[header.id] || 100,
                    maxWidth: columnWidths[header.id] || 100,
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  <div
                    className="resize-handle"
                    onMouseDown={(e) => onMouseDownResize(header.id, e)}
                  />
                  {({
                    asc: " ↑",
                    desc: " ↓",
                  }[header.column.getIsSorted() as string] ?? null)}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {pageData.map((row) => (
            <tr key={row.id} className="tr">
              {row.getVisibleCells().map((cell) => {
                const isNumber = typeof cell.getValue() === "number"
                return (
                  <td
                    key={cell.id}
                    className={`td ${isNumber ? "td-right" : "td-left"}`}
                    title={String(cell.getValue())}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
