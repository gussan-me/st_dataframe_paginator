import "../st-dataframe-paginator.css"
interface PageSizeSelectorProps {
  pageSize: number
  setPageSize: (size: number) => void
  options?: number[]
}

export function PageSizeSelector({
  pageSize,
  setPageSize,
  options = [10, 20, 50],
}: PageSizeSelectorProps) {
  return (
    <select
      className="page-size-select"
      value={pageSize}
      onChange={(e) => setPageSize(Number(e.target.value))}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}
