"use client";

import { checkDealLocation } from "@/actions/locate-deal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import USStates from "@/lib/json-db/states.json";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function StateForm() {
  const [state, setState] = useState("");
  const [key, setKey] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!state || state.length === 0) {
      toast.error("Please select a state");
    } else if (!key || key.length === 0) {
      toast.error("Please enter a key");
    } else if (await checkDealLocation(state, key)) {
      toast.success("Perfect! You cracked it.");
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
    <form className="flex gap-5 flex-wrap" onSubmit={handleSubmit}>
      <Input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        className="w-72"
        placeholder="Enter key"
      />
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
