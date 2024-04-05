"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePicker({ date, setDate }: { date: Date; setDate: React.Dispatch<React.SetStateAction<Date>> }) {
  return (
    <Popover>
      <PopoverTrigger className="cursor-text">{format(date, "PPP")}</PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => (date ? setDate(date) : setDate(new Date()))}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
