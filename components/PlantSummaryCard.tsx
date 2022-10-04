import React, {ReactNode} from "react";
import {MainPlantSummaryPayload} from "../src/server/router/plants";
import {IoWaterOutline} from "react-icons/io5";
import {TbNotes} from "react-icons/tb"
import {BiDollar} from "react-icons/bi";
import {trpc} from "../src/utils/trpc";
import DatePopover from "./Popover";
import {getDateDisplayString, getShortDate} from "../src/utils/dateUtils";

function PlantSummaryField(props: { fieldValue: string, icon?: ReactNode, toolTipText?: string | undefined }) {
  return (
    <div className="p-2 text-center w-full relative" title={props.toolTipText}>
      {props.icon && <div className="absolute left-0 top-0 p-0.5">{props.icon}</div>}
      {props.fieldValue}
    </div>
  );
}

function PlantSummaryHeading(props: { plant: MainPlantSummaryPayload; }) {
  return props.plant.nickName ?
    (<>
      <div className="text-xl text-bold">{props.plant.nickName}</div>
      <div className="text-xs text-slate-600">{props.plant.commonName}</div>
    </>)
    :
    (<div className="text-xl text-bold">{props.plant.commonName}</div>)
}

export default function PlantSummaryCard(props: { plant: MainPlantSummaryPayload, refreshData: () => Promise<void> }) {
  const waterDateMutation = trpc.useMutation(["plant.addWaterDate"],
    {
      onSuccess: () => {
        props.refreshData()
      },
    }
  );

  function handleWaterEvent(date: string) {
    waterDateMutation.mutate({plantId: props.plant.id, waterDate: new Date(date)});
  }

  function getWaterDateDisplay() {
    return props.plant.waterDates[0] ? getDateDisplayString(props.plant.waterDates[0].date) : "Not watered yet :(";
  }

  function getWaterDateToolTip() {
    return props.plant.waterDates[0] ? getShortDate(props.plant.waterDates[0].date) : undefined;
  }

  return (
    <div
      className="bg-green-300 rounded-lg flex flex-col justify-center items-center shadow-lg divide-y divide-dashed divide-medium-brown relative">
      <div>
        <div className="absolute right-0 top-0 p-0.5 cursor-pointer">
          <DatePopover title="Watered On:" saveDate={handleWaterEvent} />
        </div>
        <div className="flex flex-col justify-center w-full text-center p-2">
          <PlantSummaryHeading {...props}/>
        </div>
      </div>
      <div
        className="flex justify-center w-full flex-col items-center text-sm divide-y divide-dashed divide-medium-brown">
        <div className="text-center w-full relative">
          <PlantSummaryField icon={<IoWaterOutline/>} fieldValue={getWaterDateDisplay()} toolTipText={getWaterDateToolTip()}/>
          {props.plant.waterInstructions &&
            <PlantSummaryField fieldValue={props.plant.waterInstructions}/>}
        </div>
        {props.plant.purchaseDate &&
          <PlantSummaryField icon={<BiDollar/>} fieldValue={getDateDisplayString(props.plant.purchaseDate)}
                             toolTipText={getShortDate(props.plant.purchaseDate)}/>}
        {props.plant.notes &&
          <PlantSummaryField icon={<TbNotes/>} fieldValue={props.plant.notes}/>}
      </div>
    </div>
  );
}
