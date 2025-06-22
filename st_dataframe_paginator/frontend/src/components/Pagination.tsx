// Pagination.tsx
interface PaginationProps {
  pageCount: number
  pageIndex: number
  gotoPage: (index: number) => void
  labels?: {
    first?: string
    prev?: string
    next?: string
    last?: string
  }
}

export function Pagination({
  pageCount,
  pageIndex,
  gotoPage,
  labels = {
    first: "first",
    prev: "prev",
    next: "next",
    last: "last",
  },
}: PaginationProps) {
  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => gotoPage(0)}
        disabled={pageIndex === 0}
      >
        {labels.first}
      </button>
      <button
        className="pagination-btn"
        onClick={() => gotoPage(pageIndex - 1)}
        disabled={pageIndex === 0}
      >
        {labels.prev}
      </button>
      <span style={{ fontWeight: 600 }}>
        {pageIndex + 1} / {pageCount === 0 ? 1 : pageCount}
      </span>
      <button
        className="pagination-btn"
        onClick={() => gotoPage(pageIndex + 1)}
        disabled={pageIndex >= pageCount - 1}
      >
        {labels.next}
      </button>
      <button
        className="pagination-btn"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={pageIndex >= pageCount - 1}
      >
        {labels.last}
      </button>
    </div>
  )
}
