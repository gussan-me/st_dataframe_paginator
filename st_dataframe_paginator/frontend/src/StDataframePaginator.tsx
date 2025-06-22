import React, { useState, useEffect, useMemo, useRef } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table"
import {
  Streamlit,
  withStreamlitConnection,
  ComponentProps,
} from "streamlit-component-lib"
import { useRenderData } from "streamlit-component-lib-react-hooks"
import { DataTable } from "./components/DataTable"
import { Pagination } from "./components/Pagination"
import { PageSizeSelector } from "./components/PageSizeSelector"

function StDataframePaginator({ args }: ComponentProps) {
  const renderData = useRenderData()
  const data = (renderData.args["data"] as Record<string, any>[]) || []

  // Handle default values for pageSize and pageSizeOptions (optional support)
  const defaultPageSize = renderData.args?.pageSize ?? 10
  const pageSizeOptions = renderData.args?.pageSizeOptions ?? [10, 20, 50]

  // Set the initial value of pageSize to defaultPageSize
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [pageIndex, setPageIndex] = useState(0)

  // Reset pageIndex to 0 when pageSize changes to prevent pagination inconsistencies
  useEffect(() => {
    setPageIndex(0)
  }, [pageSize])

  // Manage state for column widths
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({})
  const [sorting, setSorting] = useState<SortingState>([])

  // Calculate default column width based on header string length
  const getDefaultColumnWidth = (header: string) => {
    return Math.max(80, header.length * 12)
  }

  // Generate columns dynamically from data. Column widths are initialized separately.
  const columns = useMemo(() => {
    if (!data || data.length === 0) return []

    return Object.keys(data[0]).map((key) => ({
      accessorKey: key,
      header: key,
      cell: (info: any) => info.getValue(),
    }))
  }, [data])

  // Initialize columnWidths once based on the data headers
  useEffect(() => {
    if (data.length === 0) return
    if (Object.keys(columnWidths).length > 0) return // すでに初期化済み

    const widths: Record<string, number> = {}
    Object.keys(data[0]).forEach((key) => {
      widths[key] = getDefaultColumnWidth(key)
    })
    setColumnWidths(widths)
  }, [data, columnWidths])

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const sortedRows = table.getSortedRowModel().rows
  const pageCount = Math.ceil(sortedRows.length / pageSize)
  const pageData = sortedRows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)

  // Manage resizing state using useRef to avoid unnecessary re-renders
  const resizingColRef = useRef<string | null>(null)
  const startXRef = useRef(0)
  const startWidthRef = useRef(0)

  // Start resizing on mouse down and register events
  const onMouseDownResize = (colId: string, e: React.MouseEvent) => {
    resizingColRef.current = colId
    startXRef.current = e.clientX
    startWidthRef.current = columnWidths[colId] || 100

    document.addEventListener("mousemove", onMouseMoveResize)
    document.addEventListener("mouseup", onMouseUpResize)

    e.preventDefault()
  }

  // On mouse down, start resizing and register mousemove and mouseup events
  const onMouseMoveResize = (e: MouseEvent) => {
    if (!resizingColRef.current) return

    const deltaX = e.clientX - startXRef.current
    const newWidth = Math.max(50, startWidthRef.current + deltaX)

    setColumnWidths((prev) => ({
      ...prev,
      [resizingColRef.current!]: newWidth,
    }))
  }

  // On mouse move, update the width of the currently resizing column
  const onMouseUpResize = () => {
    resizingColRef.current = null

    document.removeEventListener("mousemove", onMouseMoveResize)
    document.removeEventListener("mouseup", onMouseUpResize)
  }

  // Update Streamlit iframe height whenever layout-relevant data changes
  useEffect(() => {
    Streamlit.setFrameHeight()
  }, [data, columnWidths, pageData])

  return (
    <div className="container">
      <div className="scroll-wrapper">
        <DataTable
          table={table}
          columnWidths={columnWidths}
          pageData={pageData}
          onMouseDownResize={onMouseDownResize}
        />
      </div>

      {/* ページネーション */}
      <Pagination
        pageCount={pageCount}
        pageIndex={pageIndex}
        gotoPage={(page) => setPageIndex(Math.max(0, Math.min(page, pageCount - 1)))}
        labels={{
          first: renderData.args?.labels?.first || "first",
          prev: renderData.args?.labels?.prev || "prev",
          next: renderData.args?.labels?.next || "next",
          last: renderData.args?.labels?.last || "last",
        }}
      />

      {/* ページサイズ選択 */}
      <div style={{ marginTop: 10 }}>
        <label htmlFor="pageSizeSelector" style={{ fontWeight: 600 }}>
          {renderData.args?.labels?.displayed_record || "Displayed Record"}&nbsp;
        </label>
        <PageSizeSelector
          pageSize={pageSize}
          setPageSize={setPageSize}
          options={pageSizeOptions}
        />
      </div>
    </div>
  )
}

export default withStreamlitConnection(StDataframePaginator)
