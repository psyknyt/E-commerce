import { useContext } from "react";
import { DataContext } from "../../DataContext";

export default function CategroyButton({ props }) {
  const ctx = useContext(DataContext);

  return (
    <div className="flex justify-between rounded-xl pr-5 pl-2 py-auto bg-white hover:bg-blue-500 hover:text-white">
      <div className="flex flex-1 py-2 gap-2 justify-center items-center">
        <div className="relative inline-flex items-center gap-2">
          <input
            type="checkbox"
            className="absolute opacity-0 w-6 h-6"
            checked={true}
            onChange={(ev) => ctx.handleCategoryFilter(ev, props)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div className="">{props}</div>
      </div>
    </div>
  );
}
