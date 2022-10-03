import * as PopoverPrimitive from '@radix-ui/react-popover';
import {GiWateringCan} from "react-icons/gi";
import {PopoverContent} from "@radix-ui/react-popover";
import React, {useState} from "react";
import {MainPlantSummaryPayload} from "../src/server/router/plants";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export default function DatePopover(props: { saveData: (date: string) => void }) {
  // TODO: Fix this toIsostring to be in a util or some better abstraction for getting proper default today date
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  return (
    <Popover>
      <PopoverTrigger><GiWateringCan size="1.2em"/></PopoverTrigger>
      <PopoverContent className="bg-green-leaf p-2 rounded-lg border border-black drop-shadow-lg z-10">
        <div>Enter Watering Date:</div>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/><br/>
        <button onClick={() => props.saveData(date)} >Save</button>
      </PopoverContent>
    </Popover>
  )
}
