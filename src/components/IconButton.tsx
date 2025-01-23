export const IconButton = ({ children, onClick, className }: { children: React.ReactNode, onClick?: () => void, className?: string } ) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};  