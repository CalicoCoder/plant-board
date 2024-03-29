import PlantForm from "./PlantForm";
import {convertDateToString, getTodayInHtmlInputFormat} from "../../src/utils/dateUtils";
import {trpc} from "../../src/utils/trpc";
import {PlantCreateInput} from "../../src/server/db/types";
import {NeutralButton, StandardButton} from "../StandardButtons";
import React from "react";

export default function AddPlantForm(props: { onSubmitAction: () => void, onCancelAction: () => void }) {
  const plantDefaults = {
    nickName: "",
    commonName: "",
    purchaseDate: getTodayInHtmlInputFormat(),
    waterInstructions: "",
    waterFrequency: 0,
    notes: ""
  }

  const newPlantMutation = trpc.plant.create.useMutation(
    {onSuccess: props.onSubmitAction}
  );

  function handleFormSubmit(formValues: PlantCreateInput) {
    const purchaseDate = convertDateToString(formValues.purchaseDate);
    newPlantMutation.mutate({...formValues, purchaseDate})
  }

  const formButtons =
    (<>
      <NeutralButton classNames="mr-4" onClick={props.onCancelAction} label="Cancel"/>
      <StandardButton label="Save Plant" type="submit"/>
    </>);

  return (
    <PlantForm initialPlantValues={plantDefaults} formTitle="Add New Plant"
               onSubmitHandler={handleFormSubmit} formButtons={formButtons}/>
  );
}
