export const TrashIcon = ({ className }: { className?: string }) => {
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
        <path d="M3 6h18" /> 
        <path d="M8 6v16c0 .552.448 1 1 1h6c.552 0 1-.448 1-1V6" /> 
        <path d="M10 11v6M14 11v6" /> 
        <path d="M5 6l1-4h12l1 4" /> 
      </svg>
    )
  }