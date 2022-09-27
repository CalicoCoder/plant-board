import React, {ReactNode} from "react";
import {MainPlantSummaryPayload} from "../src/server/router/plants";
import {IoWaterOutline} from "react-icons/io5";
import {TbNotes} from "react-icons/tb"
import {BiDollar} from "react-icons/bi";

function PlantSummaryField(props: { fieldValue: string, icon: ReactNode }) {
  return <div className="p-2 text-center w-full relative">
    <div className="absolute left-0 top-0 p-0.5">{props.icon}</div>
    {props.fieldValue}
  </div>;
}

function SummaryHeading(props: { plant: MainPlantSummaryPayload; }) {
  return props.plant.nickName ?
    (<>
      <div className="text-xl text-bold">{props.plant.nickName}</div>
      <div className="text-xs text-slate-600">{props.plant.commonName}</div>
    </>)
    :
    (<div className="text-xl text-bold">{props.plant.commonName}</div>)
}

export default function PlantSummaryCard(props: { plant: MainPlantSummaryPayload; }) {
  return (
    <div
      className="bg-green-300 rounded-lg flex flex-col justify-center items-center shadow-lg divide-y divide-dashed divide-medium-brown">
      <div className="flex flex-col justify-center w-full text-center p-2">
        <SummaryHeading {...props}/>
      </div>
      <div
        className="flex justify-center w-full flex-col items-center text-sm divide-y divide-dashed divide-medium-brown">
        <div className="p-2 text-center w-full relative">
          <div className="absolute left-0 top-0 p-0.5"><IoWaterOutline/></div>
          <div>{props.plant.waterDates[0] ? props.plant.waterDates[0].date.toLocaleString('en-US', {dateStyle: 'medium'}) : "Not watered yet :("}</div>
          <div
            className="p-2 text-center w-full">{props.plant.waterInstructions ? props.plant.waterInstructions : "N/A"}</div>
        </div>
        {props.plant.purchaseDate &&
          <PlantSummaryField icon={<BiDollar/>}
                             fieldValue={props.plant.purchaseDate.toLocaleString("en-US", {dateStyle: "medium"})}/>}
        {props.plant.notes &&
          <PlantSummaryField icon={<TbNotes/>}
                             fieldValue={props.plant.notes}/>}
      </div>
    </div>
  );
}
