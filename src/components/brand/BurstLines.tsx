/** Three short red strokes that "pop" out of a corner, as on the posters. */
export function BurstLines({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 60 60" className={`text-luneo-red ${className}`}>
      <g stroke="currentColor" strokeWidth="7" strokeLinecap="round">
        <path d="M30 8 L36 26" />
        <path d="M8 26 L26 34" />
        <path d="M12 52 L28 44" />
      </g>
    </svg>
  );
}
