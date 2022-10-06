import React, {ReactNode} from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

function ToolTipContent(props: { tooltipText: string }) {
  return (
    <Tooltip.Content
      className="border border-medium-brown bg-green-leaf rounded-lg p-2 drop-shadow-lg animate-scaleIn origin-tooltip">
      {props.tooltipText}
      <Tooltip.Arrow className="fill-medium-brown"/>
    </Tooltip.Content>
  );
}

export function InfoTooltip(props: { triggerContent: ReactNode, iconTooltipText: string, cssClasses?: string }) {
  return (
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger className={props.cssClasses + " cursor-help"}>
        {props.triggerContent}
      </Tooltip.Trigger>
      <ToolTipContent tooltipText={props.iconTooltipText}/>
    </Tooltip.Root>
  )
}
