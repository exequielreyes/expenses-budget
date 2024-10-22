export const CategoryIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 17a3 3 0 1 0 6 0 3 3 0 1 0-6 0" />
    </svg>
  )
}