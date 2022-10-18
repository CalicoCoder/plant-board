import PlantForm from "./PlantForm";
import {getTodayInHtmlInputFormat} from "../../src/utils/dateUtils";
import {trpc} from "../../src/utils/trpc";

export default function AddPlantForm(props: { onSubmitAction: () => void }) {
  const plantDefaults = {
    nickName: "",
    commonName: "",
    purchaseDate: getTodayInHtmlInputFormat(),
    waterInstructions: "",
    notes: ""
  }

  const newPlantMutation = trpc.useMutation(["plant.createPlant"],
    {
      onSuccess: () => {
        props.onSubmitAction()
      },
    }
  );

  // TODO: Look into using a type from prisma here
  function handleFormSubmit(formValues:Record<string, unknown>) {
    console.log("we in here");
    console.dir(formValues);
    newPlantMutation.mutate({...formValues})
  }

  return (
    <PlantForm onSubmitHandler={handleFormSubmit} initialPlantValues={plantDefaults} formTitle="Add New Plant" submitButtonLabel="Save Plant" />
  );
}
