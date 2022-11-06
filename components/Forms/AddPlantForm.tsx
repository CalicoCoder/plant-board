import PlantForm from "./PlantForm";
import {convertDateToString, getTodayInHtmlInputFormat} from "../../src/utils/dateUtils";
import {trpc} from "../../src/utils/trpc";
import {PlantCreateInput} from "../../src/server/router/plants";


export default function AddPlantForm(props: { onSubmitAction: () => void }) {
  const plantDefaults = {
    nickName: "",
    commonName: "",
    purchaseDate: getTodayInHtmlInputFormat(),
    waterInstructions: "",
    notes: ""
  }

  const newPlantMutation = trpc.useMutation(["plant.createPlant"],
    {onSuccess: props.onSubmitAction}
  );

  function handleFormSubmit(formValues: PlantCreateInput) {
    const purchaseDate = convertDateToString(formValues.purchaseDate);
    newPlantMutation.mutate({...formValues, purchaseDate})
  }

  return (
    <PlantForm onSubmitHandler={handleFormSubmit} initialPlantValues={plantDefaults} formTitle="Add New Plant"
               submitButtonLabel="Save Plant"/>
  );
}
