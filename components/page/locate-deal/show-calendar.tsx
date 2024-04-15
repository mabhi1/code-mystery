"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import calendarDetails from "@/lib/json-db/calendar.json";
import { SparkleIcon, SquareChevronLeftIcon, SquareChevronRightIcon } from "lucide-react";
import CalendarDates from "./calendar-dates";

export default function ShowCalendar() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(0);

  const showPrevious = () => {
    if (currentMonth === 0) return;
    setCurrentMonth((currentMonth) => currentMonth - 1);
  };

  const showNext = () => {
    if (currentMonth === 11) return;
    setCurrentMonth((currentMonth) => currentMonth + 1);
  };

  return (
    <>
      <Button id="decrypt" className="hidden" onClick={() => setShowCalendar((prev) => !prev)}>
        {showCalendar ? "Hide Calendar" : "Show Calendar"}
      </Button>
      {showCalendar && (
        <div className="w-96 border p-2 space-y-5 pb-5">
          <div className="flex justify-between items-center px-2">
            <Button variant="ghost" size="icon" disabled={currentMonth === 0} onClick={showPrevious}>
              <SquareChevronLeftIcon className="w-8" />
            </Button>
            <span className="capitalize">{calendarDetails.monthNames[currentMonth]}</span>
            <Button variant="ghost" size="icon" disabled={currentMonth === 11} onClick={showNext}>
              <SquareChevronRightIcon className="w-8" />
            </Button>
          </div>
          <div className="grid grid-cols-7">
            {calendarDetails.weeks.map((week, idx) => (
              <span className="capitalize text-center" key={idx}>
                {week}
              </span>
            ))}
          </div>
          <CalendarDates month={calendarDetails.dates[currentMonth]} />
          <div className="uppercase text-xs text-muted-foreground px-5 flex gap-2 items-center">
            <SparkleIcon className="w-4" />
            {calendarDetails.info[currentMonth]}
          </div>
        </div>
      )}
    </>
  );
}
