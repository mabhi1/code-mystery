"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import USStates from "@/lib/json-db/states.json";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function StateForm() {
  const [state, setState] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!state || state.length === 0) {
      toast.error("Please select a state");
    } else if (state.toLowerCase() === process.env.NEXT_PUBLIC_LOCATE_DEAL_STATE_NAME) {
      toast.success("Perfect! you cracked it.");
    } else {
      toast.error("Wrong answer");
    }
  };

  useEffect(() => {
    fetch("/api/encrypted-state", {
      method: "POST",
    });
  }, []);

  return (
    <form className="flex gap-5" onSubmit={handleSubmit}>
      <Select onValueChange={setState}>
        <SelectTrigger className="w-72">
          <SelectValue placeholder="Select State" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {USStates.map((state) => (
              <SelectItem value={state} className="capitalize" key={state}>
                {state}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button type="submit">Submit</Button>
    </form>
  );
}
