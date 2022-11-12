import PlantForm from "./PlantForm";
import {convertDateToString, getDateInHtmlInputFormat} from "../../src/utils/dateUtils";
import {trpc} from "../../src/utils/trpc";
import {MainPlantSummaryPayload, PlantUpdateByIdInput} from "../../src/server/router/plants";
import {DangerButton} from "../StandardButtons";
import React from "react";
import {StandardAlertDialog} from "../StandardAlertDialog";

export default function EditPlantForm(props: { onSubmitAction: () => void, plantData: MainPlantSummaryPayload }) {
  const plantValues = {
    id: props.plantData.id,
    nickName: props.plantData.nickName,
    commonName: props.plantData.commonName ? props.plantData.commonName : "",
    purchaseDate: props.plantData.purchaseDate ? getDateInHtmlInputFormat(props.plantData.purchaseDate) : "",
    waterInstructions: props.plantData.waterInstructions ? props.plantData.waterInstructions : "",
    notes: props.plantData.notes ? props.plantData.notes : ""
  }

  const updatePlantMutation = trpc.useMutation(["plant.updatePlant"],
    {onSuccess: props.onSubmitAction}
  );

  function handleFormSubmit(formValues: PlantUpdateByIdInput) {
    const purchaseDate = convertDateToString(formValues.purchaseDate);
    updatePlantMutation.mutate({...formValues, purchaseDate})
  }

  const deletePlantMutation = trpc.useMutation(["plant.deletePlant"],
    {onSuccess: props.onSubmitAction}
  );

  function handlePlantDelete() {
    deletePlantMutation.mutate({id: plantValues.id});
  }

  const extraFormButton = (
    <StandardAlertDialog onDialogAction={handlePlantDelete} actionText="Yes, delete plant" title="Are you sure?"
                         description="Once a plant is deleted it cannot be recovered. Please confirm you wish to delete this plant and all water dates associated with it."
                         triggerNode={<DangerButton classNames="ml-4" label="Delete Plant"/>}
    />);

  return (
    <PlantForm onSubmitHandler={handleFormSubmit} additionalButtons={extraFormButton} initialPlantValues={plantValues}
               formTitle="Edit Plant" submitButtonLabel="Update Plant"/>);
}
