export const PlusIcon = ({ className }: { className?: string }) => {
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
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}