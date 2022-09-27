import React, {ReactNode} from "react";
import {MainPlantSummaryPayload} from "../src/server/router/plants";
import {IoWaterOutline} from "react-icons/io5";
import {TbNotes} from "react-icons/tb"
import {BiDollar} from "react-icons/bi";

type MyProps = {
  // using `interface` is also ok
  plant: MainPlantSummaryPayload;
};
type MyState = {};

function PlantSummaryField(props: { fieldValue: string, icon: ReactNode }) {
  return <div className="p-2 text-center w-full relative">
    <div className="absolute left-0 top-0 p-0.5">{props.icon}</div>
    {props.fieldValue}
  </div>;
}

export default class PlantSummaryCard extends React.Component<MyProps, MyState> {
  /* Might want to move this into its own component, keep in mind if similar usages elsewhere */
  SummaryHeading = () => {
    return this.props.plant.nickName ?
      (<>
        <div className="text-xl text-bold">{this.props.plant.nickName}</div>
        <div className="text-xs text-slate-600">{this.props.plant.commonName}</div>
      </>)
      :
      (<div className="text-xl text-bold">{this.props.plant.commonName}</div>)
  }

  render() {
    return (
      <div
        className="bg-green-300 rounded-lg flex flex-col justify-center items-center shadow-lg divide-y divide-dashed divide-medium-brown">
        <div className="flex flex-col justify-center w-full text-center p-2">
          <this.SummaryHeading/>
        </div>
        <div
          className="flex justify-center w-full flex-col items-center text-sm divide-y divide-dashed divide-medium-brown">
          <div className="p-2 text-center w-full relative">
            <div className="absolute left-0 top-0 p-0.5"><IoWaterOutline/></div>
            <div>{this.props.plant.waterDates[0] ? this.props.plant.waterDates[0].date.toLocaleString('en-US', {dateStyle: 'medium'}) : "Not watered yet :("}</div>
            <div
              className="p-2 text-center w-full">{this.props.plant.waterInstructions ? this.props.plant.waterInstructions : "N/A"}</div>
          </div>
          {this.props.plant.purchaseDate &&
            <PlantSummaryField icon={<BiDollar/>}
                               fieldValue={this.props.plant.purchaseDate.toLocaleString("en-US", {dateStyle: "medium"})}/>}
          {this.props.plant.notes &&
            <PlantSummaryField icon={<TbNotes/>}
                               fieldValue={this.props.plant.notes}/>}
        </div>
      </div>
    );
  }
}
