export const CloseEyeIcon = ({ className }: { className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
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
      <path d="M21 9c-2.4 2.667-5.4 4-9 4-3.6 0-6.6-1.333-9-4M3 15l2.5-3.8M21 14.976 18.508 11.2M9 17l.5-4M15 17l-.5-4" />
    </svg>
  );
};