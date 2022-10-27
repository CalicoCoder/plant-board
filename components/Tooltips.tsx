import React, {ReactNode} from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

function ToolTipContent(props: { tooltipText: ReactNode }) {
  return (
    <Tooltip.Content
      className="border border-medium-brown bg-green-leaf rounded-lg p-2 drop-shadow-lg animate-scaleIn origin-tooltip">
      {props.tooltipText}
      <Tooltip.Arrow className="fill-medium-brown"/>
    </Tooltip.Content>
  );
}

export function InfoTooltip(props: { children: ReactNode, tooltipText: ReactNode, cssClasses?: string }) {
  return (
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger className={props.cssClasses + " cursor-help"}>
        {props.children}
      </Tooltip.Trigger>
      <ToolTipContent tooltipText={props.tooltipText}/>
    </Tooltip.Root>
  )
}
