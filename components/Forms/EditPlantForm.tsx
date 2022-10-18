import PlantForm from "./PlantForm";
import {getDateInHtmlInputFormat} from "../../src/utils/dateUtils";
import {trpc} from "../../src/utils/trpc";
import {MainPlantSummaryPayload} from "../../src/server/router/plants";

export default function EditPlantForm(props: { onSubmitAction: () => void, plantData: MainPlantSummaryPayload }) {
  const plantValues = {
    id: props.plantData.id,
    nickName: props.plantData.nickName,
    commonName: props.plantData.commonName,
    purchaseDate: props.plantData.purchaseDate ? getDateInHtmlInputFormat(props.plantData.purchaseDate) : "",
    waterInstructions: props.plantData.waterInstructions ? props.plantData.waterInstructions : "",
    notes: props.plantData.notes ? props.plantData.notes : ""
  }

  const newPlantMutation = trpc.useMutation(["plant.updatePlant"],
    {
      onSuccess: () => {
        props.onSubmitAction()
      },
    }
  );

  // TODO: Look into using a type from prisma here
  function handleFormSubmit(formValues:Record<string, unknown>) {
    newPlantMutation.mutate({...formValues})
  }

  return (
    <PlantForm onSubmitHandler={handleFormSubmit} initialPlantValues={plantValues} formTitle="Edit Plant" submitButtonLabel="Update Plant" />
  );
}
