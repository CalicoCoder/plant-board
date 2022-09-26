import React from "react";
import {MainPlantSummaryPayload} from "../src/server/router/plants";

type MyProps = {
  // using `interface` is also ok
  plant: MainPlantSummaryPayload;
};
type MyState = {};

export default class PlantSummaryCard extends React.Component<MyProps, MyState> {
  getSummaryHeading = () => {
    return  this.props.plant.nickName ?
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
        {
          // If there is a nickname show that on top and common name below
          // If no nickname than common name should be on top
        }
        <div className="flex flex-col justify-center w-full text-center p-2 ">
          {
            // plant.nickName ?
          }
          {this.getSummaryHeading()}
        </div>
        <div className="flex justify-center w-full flex-col justify-center items-center text-sm p-2">
          <div>{this.props.plant.waterDates[0] ? this.props.plant.waterDates[0].date.toLocaleString('en-US', {dateStyle: 'medium'}) : "Not watered yet :("}</div>
        </div>
      </div>
    );
  }
}
