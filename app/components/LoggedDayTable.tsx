export interface LogEntry {
  id: string;
  date: string;
  leetcodeProblems: number;
  dsaHours: number;
  workout: boolean;
  projectHours: number;
}

interface LoggedDayTableProps {
  entries: LogEntry[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CalendarIcon = () => (
  <svg
    className="size-5 text-[#314158]"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
);

const EditIcon = () => (
  <svg
    className="size-4 text-[#314158]"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
  </svg>
);

const DeleteIcon = () => (
  <svg
    className="size-4 text-[#314158]"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
    <path
      fillRule="evenodd"
      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
    />
  </svg>
);

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function LoggedDayTable({
  entries,
  onEdit,
  onDelete,
}: LoggedDayTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-[14px] bg-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
      {/* Header */}
      <div className="flex h-[57px] items-center gap-2 border-b border-slate-200 bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] px-6">
        <CalendarIcon />
        <span className="text-base font-normal tracking-tight text-[#0f172b]">
          Logged Days
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="h-[48.5px] border-b border-slate-200 bg-slate-50">
              <th className="px-6 text-left text-base font-bold tracking-tight text-[#314158]">
                Date
              </th>
              <th className="px-6 text-left text-base font-bold tracking-tight text-[#314158]">
                LC Problems
              </th>
              <th className="px-6 text-left text-base font-bold tracking-tight text-[#314158]">
                DSA Hours
              </th>
              <th className="px-6 text-left text-base font-bold tracking-tight text-[#314158]">
                Workout
              </th>
              <th className="px-6 text-left text-base font-bold tracking-tight text-[#314158]">
                Project Hours
              </th>
              <th className="w-[140px] px-6"></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr
                key={entry.id}
                className="group h-[65px] border-b border-slate-100"
              >
                <td className="px-6 text-base tracking-tight text-[#0f172b]">
                  {formatDate(entry.date)}
                </td>
                <td className="px-6 text-base tracking-tight text-[#314158]">
                  {entry.leetcodeProblems}
                </td>
                <td className="px-6 text-base tracking-tight text-[#314158]">
                  {entry.dsaHours}
                </td>
                <td className="px-6">
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-slate-100 text-base text-[#62748e]">
                    {entry.workout ? 'Y' : 'N'}
                  </span>
                </td>
                <td className="px-6 text-base tracking-tight text-[#314158]">
                  {entry.projectHours}
                </td>
                <td className="px-6">
                  <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => onEdit(entry.id)}
                      className="flex size-7 items-center justify-center rounded hover:bg-slate-100"
                      aria-label="Edit entry"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => onDelete(entry.id)}
                      className="flex size-7 items-center justify-center rounded hover:bg-slate-100"
                      aria-label="Delete entry"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-base text-[#62748e]"
                >
                  No entries logged yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
