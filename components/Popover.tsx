import {Popover, PopoverTrigger, PopoverClose, PopoverContent, PopoverArrow} from "@radix-ui/react-popover";
import React, {ReactNode, useState} from "react";
import {getTodayInHtmlInputFormat} from "../src/utils/dateUtils";
import {InfoTooltip} from "./Tooltips";

export default function DatePopover(props: {
  icon: ReactNode,
  popoverInstructions: string;
  tooltipText: ReactNode,
  saveDate: (date: string) => void
}) {
  const [date, setDate] = useState(getTodayInHtmlInputFormat());

  return (
    <Popover>
      <PopoverTrigger><InfoTooltip triggerContent={props.icon}
                                   tooltipText={props.tooltipText}/></PopoverTrigger>
      <PopoverContent align="start"
                      className="border-2 border-medium-brown bg-green-leaf rounded-lg p-2 animate-scaleIn origin-popover cursor-default drop-shadow-lg z-10 space-y-2">
        <PopoverArrow className="fill-medium-brown"/>
        <div>{props.popoverInstructions}</div>
        <input className="rounded-lg cursor-pointer" type="date" value={date}
               onChange={(e) => setDate(e.target.value)}/>
        <PopoverClose asChild={true}>
          <button className="rounded-lg cursor-pointer bg-light-brown hover:bg-medium-brown block p-1 "
                  onClick={() => props.saveDate(date)}>Add Date
          </button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}
