"use client";

import { WifiIcon } from "lucide-react";
import Clock, { useCurrentTime } from "../clock";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

const days = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

export default function Mobile({
  comp,
  setScreen,
}: {
  comp?: React.ReactNode;
  setScreen?: Dispatch<SetStateAction<string>>;
}) {
  const { time } = useCurrentTime();

  const getTime = () => {
    const hour = ((time.getHours() + 11) % 12) + 1;
    const minutes =
      time.getMinutes().toString().length !== 1 ? time.getMinutes().toString() : `0${time.getMinutes().toString()}`;
    const timeFormat = time.getHours() >= 12 ? "PM" : "AM";
    return `${hour}:${minutes} ${timeFormat}`;
  };

  return (
    <div className="shadow-md shadow-black w-[20.5rem] h-[41rem] border-2 flex flex-col gap-2 rounded-[1.8rem] border-black dark:border-white relative bg-[url('/background.webp')] p-1 bg-contain select-none text-xs overflow-hidden">
      <div className="w-full h-full bg-transparent border border-white/50 absolute rounded-[1.8rem] top-0 left-0"></div>
      {comp ? (
        <div className="absolute px-7 pt-3 top-0 left-0 w-full h-full bg-white dark:bg-black">
          <div className="absolute h-6 w-28 left-1/2 -translate-x-1/2 top-3 bg-black rounded-3xl z-40 border-[0.5px] border-white/50 border-l-white border-b-white"></div>
          <div className="flex items-center gap-2">
            <div className="mr-auto text-sm">{getTime()}</div>
            <WifiIcon className="w-5" />
            <div className="dark:bg-slate-50 text-white bg-slate-900 border dark:border-slate-50 h-4 w-8 rounded-md dark:text-black grid place-content-center">
              100
            </div>
          </div>
          <div className="h-full mt-3 w-full">{comp}</div>
        </div>
      ) : (
        <>
          <div className="px-6 pt-2 flex h-full flex-col gap-8 w-full">
            <div className="absolute h-6 w-28 left-1/2 -translate-x-1/2 top-3 bg-black rounded-3xl border-[0.5px] border-white/50 border-l-white border-b-white"></div>
            <div className="flex items-center gap-2 text-white">
              <div className="mr-auto text-sm">{getTime()}</div>
              <WifiIcon className="w-5" color="white" />
              <div className="bg-slate-50 dark:text-white dark:bg-slate-900 dark:border dark:border-slate-50 h-4 w-8 rounded-md text-black grid place-content-center">
                100
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="bg-white/50 relative rounded-lg h-auto w-auto aspect-square">
                  <Clock />
                </div>
                <div className="grid place-content-center text-white">Clock</div>
              </div>
              <div className="space-y-1">
                <div className="bg-white dark:bg-black/90 dark:border dark:border-white rounded-lg p-4 hover:bg-white/80 transition-colors cursor-pointer h-auto w-auto aspect-square">
                  <div className="uppercase text-red-800 dark:text-red-200">
                    {days[time.getDay() as keyof typeof days]}
                  </div>
                  <div className="text-xl">{`${time.toLocaleString("default", {
                    month: "long",
                  })} ${time.getDate()}`}</div>
                </div>
                <div className="grid place-content-center text-white">Calendar</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6 mt-auto">
              <div className="w-auto aspect-square z-10">
                <Button
                  className="bg-[url('/notes-icon.png')] bg-contain w-full h-full rounded-lg"
                  onClick={() => {
                    if (setScreen) setScreen("notesScreen");
                  }}
                ></Button>
                <div className="grid place-content-center text-white">Notes</div>
              </div>
              <div className="w-auto aspect-square z-10">
                <Button
                  className="bg-[url('/files-icon.png')] bg-contain w-full h-full rounded-lg"
                  onClick={() => {
                    if (setScreen) setScreen("fileScreen");
                  }}
                ></Button>
                <div className="grid place-content-center text-white">Files</div>
              </div>
              <div className="w-auto aspect-square z-10">
                <Button className="bg-[url('/reminders-icon.png')] bg-contain w-full h-full rounded-lg"></Button>
                <div className="grid place-content-center text-white">Reminders</div>
              </div>
              <div className="w-auto aspect-square z-10">
                <Button className="bg-[url('/photos-icon.png')] bg-contain w-full h-full rounded-lg"></Button>
                <div className="grid place-content-center text-white">Photos</div>
              </div>
            </div>
          </div>
          <div className="p-1 bg-white/50 w-4 rounded-3xl mx-auto grid place-content-center mt-2 border border-y-0 rounded-t-3xl border-white/50">
            <div className="w-1 h-1 bg-white rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-4 gap-7 mt-auto p-4 px-6 rounded-3xl bg-white/50">
            <div className="w-auto aspect-square z-10">
              <Button
                className="bg-[url('/phone-icon.png')] bg-contain w-full h-full rounded-lg"
                onClick={() => {
                  if (setScreen) setScreen("phoneScreen");
                }}
              ></Button>
            </div>
            <div className="w-auto aspect-square z-10">
              <Button
                className="bg-[url('/messages-icon.png')] bg-contain w-full h-full rounded-lg"
                onClick={() => {
                  if (setScreen) setScreen("messageScreen");
                }}
              ></Button>
            </div>
            <div className="w-auto aspect-square z-10">
              <Button className="bg-[url('/safari-icon.png')] bg-contain w-full h-full rounded-lg"></Button>
            </div>
            <div className="w-auto aspect-square z-10">
              <Button className="bg-[url('/mail-icon.png')] bg-contain w-full h-full rounded-lg"></Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
