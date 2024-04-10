import { Dispatch, SetStateAction } from "react";
import ScreenHeader from "../screen-header";

export default function NotesScreen({ setScreen }: { setScreen: Dispatch<SetStateAction<string>> }) {
  return (
    <div className="flex flex-col gap-5">
      <ScreenHeader setScreen={setScreen}>Notes</ScreenHeader>
      <div className="text-base">My Address</div>
      <div className="uppercase">111 first street, orlando, florida, 21345</div>
    </div>
  );
}
