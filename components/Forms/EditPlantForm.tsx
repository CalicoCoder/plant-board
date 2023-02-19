import PlantForm from "./PlantForm";
import {convertDateToString, getDateInHtmlInputFormat} from "../../src/utils/dateUtils";
import {trpc} from "../../src/utils/trpc";
import {MainPlantSummaryPayload, PlantUpdateByIdInput} from "../../src/server/db/types";
import {DangerButton, StandardButton} from "../StandardButtons";
import React from "react";
import {StandardAlertDialog} from "../StandardAlertDialog";

export default function EditPlantForm(props: { onSubmitAction: () => void, plantData: MainPlantSummaryPayload }) {
  const plantValues = {
    id: props.plantData.id,
    nickName: props.plantData.nickName,
    commonName: props.plantData.commonName ? props.plantData.commonName : "",
    purchaseDate: props.plantData.purchaseDate ? getDateInHtmlInputFormat(props.plantData.purchaseDate) : "",
    waterInstructions: props.plantData.waterInstructions ? props.plantData.waterInstructions : "",
    waterFrequency: props.plantData.waterFrequency ? props.plantData.waterFrequency : 0,
    notes: props.plantData.notes ? props.plantData.notes : ""
  }

  const updatePlantMutation = trpc.plant.update.useMutation({onSuccess: props.onSubmitAction}
  );

  function handleFormSubmit(formValues: PlantUpdateByIdInput) {
    const purchaseDate = convertDateToString(formValues.purchaseDate);
    // TODO:RE Need to figure out how to stop the waterFrequency from coming back as text from formValues
    const waterFrequency = parseInt(formValues.waterFrequency) ?? 0;
    updatePlantMutation.mutate({...formValues, purchaseDate, waterFrequency})
  }

  const deletePlantMutation = trpc.plant.delete.useMutation({onSuccess: props.onSubmitAction}
  );

  function handlePlantDelete() {
    deletePlantMutation.mutate({id: plantValues.id});
  }

  const formButtons = (
    <>
      <StandardButton label="Update Plant" type="submit"/>
      <StandardAlertDialog onDialogAction={handlePlantDelete} actionText="Yes, delete plant" title="Are you sure?"
                           description="Once a plant is deleted it cannot be recovered. Please confirm you wish to delete this plant and all water dates associated with it."
                           triggerNode={<DangerButton classNames="ml-4" label="Delete Plant"/>}
      />
    </>
  );

  return (
    <PlantForm initialPlantValues={plantValues} formTitle="Edit Plant"
               onSubmitHandler={handleFormSubmit} formButtons={formButtons} />);
}
