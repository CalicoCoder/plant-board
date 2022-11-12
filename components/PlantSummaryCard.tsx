import React, {ReactNode} from "react";
import {MainPlantSummaryPayload} from "../src/server/router/plants";
import {IoWaterOutline} from "react-icons/io5";
import {TbNotes} from "react-icons/tb"
import {BiDollar} from "react-icons/bi";
import {trpc} from "../src/utils/trpc";
import DatePopover from "./Popover";
import {getDateDisplayString, getShortDate} from "../src/utils/dateUtils";
import {InfoTooltip} from "./Tooltips";
import {GiWateringCan} from "react-icons/gi";
import {MdModeEdit} from "react-icons/md";
import EditPlantForm from "./Forms/EditPlantForm";
import {StandardDialog} from "./StandardDialog";

function PlantSummaryField(props: { fieldValue: string, fieldTooltipText?: ReactNode, icon?: ReactNode, iconTooltipText?: string, }) {
  return (
    <div className="p-3 text-center w-full relative">
      {props.icon && props.iconTooltipText &&
        <InfoTooltip tooltipText={props.iconTooltipText}
                     cssClasses="absolute left-0 top-0 p-0.5">
          {props.icon}
        </InfoTooltip>
      }
      {
        props.fieldTooltipText ?
          <InfoTooltip tooltipText={props.fieldTooltipText}>{props.fieldValue}</InfoTooltip> :
          <span>{props.fieldValue}</span>
      }
    </div>
  );
}

function PlantSummaryHeading(props: { plant: MainPlantSummaryPayload; }) {
  return props.plant.nickName ?
    (<>
      <div className="text-xl text-bold">{props.plant.nickName}</div>
      <div className="text-xs">{props.plant.commonName}</div>
    </>)
    :
    (<div className="text-xl text-bold">{props.plant.commonName}</div>)
}

export default function PlantSummaryCard(props: { plant: MainPlantSummaryPayload, refreshData: () => Promise<void> }) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  async function handleFormSubmit() {
    setIsDialogOpen(false);
    await props.refreshData();
  }

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

  return (
    <>
      <StandardDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <EditPlantForm plantData={props.plant} onSubmitAction={handleFormSubmit}/>
      </StandardDialog>
      <div
        className="bg-green-300 rounded-lg flex flex-col justify-center items-center shadow-lg divide-y divide-dashed divide-medium-brown relative">
        <div>
          <div className="absolute right-0 top-0 p-0.5 cursor-pointer">
              <InfoTooltip cssClasses="cursor-pointer" tooltipText="Edit Plant">
                <MdModeEdit onClick={() => setIsDialogOpen(true)} className="w-[1.4em] h-[1.4em] lg:w-[1.2em] lg:h-[1.2em] cursor-pointer"/>
              </InfoTooltip>
            <DatePopover icon={<GiWateringCan className="cursor-pointer ml-1 w-[1.5em] h-[1.5em] lg:w-[1.2em] lg:h-[1.2em]"/>}
                         popoverInstructions="Watered On:" tooltipText="Add Watering Date" saveDate={handleWaterEvent}/>
          </div>
          <div className="flex flex-col justify-center w-full text-center p-4 pt-7 lg:p-3 lg:pt-4">
            <PlantSummaryHeading {...props}/>
          </div>
        </div>
        <div
          className="flex justify-center w-full flex-col items-center text-sm divide-y divide-dashed divide-medium-brown">
          <div className="text-center w-full relative">
            <PlantSummaryField icon={<IoWaterOutline/>} iconTooltipText="Water Info"
                               fieldValue={getWaterDateDisplay()}
                               fieldTooltipText={props.plant.waterDates[0] &&
                                 <span>Watered on:<br/> {getShortDate(props.plant.waterDates[0].date)}</span>
                               }/>
            {props.plant.waterInstructions &&
              <PlantSummaryField fieldValue={props.plant.waterInstructions} fieldTooltipText="Watering Instructions"/>}
          </div>
          {props.plant.purchaseDate &&
            <PlantSummaryField icon={<BiDollar className="w-[1.2em] h-[1.2em] lg:w-[1em] lg:h-[1em]"/>} iconTooltipText="Purchase Date"
                               fieldValue={getDateDisplayString(props.plant.purchaseDate)}
                               fieldTooltipText={
                                 <span>Purchased on:<br/> {getShortDate(props.plant.purchaseDate)}</span>
                               }/>}
          {props.plant.notes &&
            <PlantSummaryField icon={<TbNotes/>} fieldValue={props.plant.notes}/>}
        </div>
      </div>
    </>
  );
}
