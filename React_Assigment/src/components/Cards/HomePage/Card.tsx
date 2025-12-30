export default function Card() {
  return (
    <div
      className="relative p-4 bg-CardContainer w-75 h-50 shadow-xl border-2 border-gray-200 rounded-2xl
     text-text-Secondary"
    >
      {/* Title */}
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
          />
        </svg>
        Completed Experiments
      </div>

      {/* Number Of Conducted Experiments */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-text-Primary text-h1-sm ">
        7
      </span>
    </div>
  );
}
