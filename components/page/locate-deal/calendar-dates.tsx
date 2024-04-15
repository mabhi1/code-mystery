import { cn } from "@/lib/utils";

export default function CalendarDates({ month }: { month: number[] }) {
  const prepareCalendar = () => {
    let started = false;
    let current = " ";
    const dates = [];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === month[0] && j === month[1]) {
          current = "1";
          started = true;
        } else if (i > month[2] || (i === month[2] && j > month[3])) {
          current = " ";
          started = false;
        } else if (started) {
          current = (Number(current) + 1).toString();
        }
        if (current.length === 1 && current !== " ") current = "0" + current;
        dates.push(current);
      }
    }

    return (
      <div className="grid grid-cols-7 gap-y-5 gap-x-5 px-3">
        {dates.map((date, idx) => (
          <span
            className={cn(
              "text-center w-7 p-1 px-[0.4rem] rounded-full mx-auto",
              month[4].toString() === date && "bg-black text-white dark:bg-white dark:text-black"
            )}
            key={idx}
          >
            {date}
          </span>
        ))}
      </div>
    );
  };

  return prepareCalendar();
}
