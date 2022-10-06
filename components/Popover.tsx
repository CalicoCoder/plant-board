import * as PopoverPrimitive from '@radix-ui/react-popover';
import {GiWateringCan} from "react-icons/gi";
import {PopoverContent} from "@radix-ui/react-popover";
import React, {useState} from "react";
import {getTodayInHtmlInputFormat} from "../src/utils/dateUtils";
import {PopoverArrow} from "@radix-ui/react-popover";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export default function DatePopover(props: {
  title: string;
  saveDate: (date: string) => void
}) {
  const [date, setDate] = useState(getTodayInHtmlInputFormat());

  return (
    <Popover>
      <PopoverTrigger><GiWateringCan size="1.2em"/></PopoverTrigger>
      <PopoverContent align="start"
                      className="border-2 border-medium-brown bg-green-leaf rounded-lg p-2 animate-scaleIn origin-popover cursor-default drop-shadow-lg z-10 space-y-2">
        <PopoverArrow className="fill-medium-brown"/>
        <div>{props.title}</div>
        <input className="rounded-lg cursor-pointer" type="date" value={date}
               onChange={(e) => setDate(e.target.value)}/>
        <button className="rounded-lg cursor-pointer bg-light-brown hover:bg-medium-brown block p-1 "
                onClick={() => props.saveDate(date)}>Add Date
        </button>
      </PopoverContent>
    </Popover>
  )
}
