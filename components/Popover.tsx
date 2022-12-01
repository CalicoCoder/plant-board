import {Popover, PopoverTrigger, PopoverClose, PopoverContent, PopoverArrow} from "@radix-ui/react-popover";
import React, {ReactNode, useState} from "react";
import {getTodayInHtmlInputFormat} from "../src/utils/dateUtils";
import {InfoTooltip} from "./Tooltips";
import {StandardButton} from "./StandardButtons";

export default function DatePopover(props: {
  icon: ReactNode,
  popoverInstructions: string;
  tooltipText: ReactNode,
  saveDate: (date: string) => void
}) {
  const [date, setDate] = useState(getTodayInHtmlInputFormat());

  return (
    <Popover>
      <PopoverTrigger><InfoTooltip tooltipText={props.tooltipText}>{props.icon}</InfoTooltip></PopoverTrigger>
      <PopoverContent align="start" onOpenAutoFocus={(event) => {event.preventDefault()}}
                      className="border-2 border-medium-brown bg-brown-texture rounded-lg p-2 animate-scaleIn origin-popover cursor-default drop-shadow-lg z-10 flex flex-col">
        <PopoverArrow className="fill-medium-brown"/>
        <div>{props.popoverInstructions}</div>
        <input className="rounded-md cursor-pointer mt-1 mb-3" type="date" value={date}
               onChange={(e) => setDate(e.target.value)}/>
        <PopoverClose asChild={true}>
          <StandardButton classNames="block" onClick={() => props.saveDate(date)} label="Add Date"/>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}
