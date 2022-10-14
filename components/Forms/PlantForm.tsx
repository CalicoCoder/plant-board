import React, {useState} from "react";
import FormInput from "./FormInput";
import StandardButton from "../StandardButton";
import {trpc} from "../../src/utils/trpc";
import {getTodayInHtmlInputFormat} from "../../src/utils/dateUtils";
const inputs = [
  {
    id: 1,
    name: "nickName",
    type: "text",
    placeholder: "Your name for the plant, e.g. Mr.Monstera",
    errorMessage: "",
    label: "Plant Nickname",
    pattern: "",
    required: true
  },
  {
    id: 2,
    name: "commonName",
    type: "text",
    placeholder: "Actual name of plant, e.g. Monstera deliciosa",
    errorMessage: "",
    label: "Plant Common Name",
    required: false
  }, {

    id: 3,
    name: "purchaseDate",
    type: "date",
    placeholder: "",
    errorMessage: "",
    label: "Date of Purchase",
    required: false
  },
  {
    id: 4,
    name: "waterInstructions",
    type: "text",
    placeholder: "2 Cups from bottom",
    errorMessage: "",
    label: "Watering Instructions",
    required: false
  },
  {
    id: 5,
    name: "notes",
    type: "text",
    placeholder: "Needs direct sunlight",
    errorMessage: "",
    label: "Notes",
    required: true,
    lastInput: false
  },
];

export default function PlantForm(props: {onSubmitAction: () => void}) {
  const [formValues, setFormValues] = useState({
    nickName: "",
    commonName: "",
    purchaseDate: getTodayInHtmlInputFormat(),
    waterInstructions: "",
    notes: ""
  });

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormValues({...formValues, [e.currentTarget.name]: e.currentTarget.value});
  }

  const newPlantMutation = trpc.useMutation(["plant.createPlant"],
    {
      onSuccess: () => {
        console.log("plant was added :)")
        props.onSubmitAction()
      },
    }
  );

  function handleFormSubmit() {
    newPlantMutation.mutate({...formValues})
  }

  return (
    <div>
      <form className="flex flex-col p-5 text-green-900">
        <div className="justify-center text-center text-xl">Add New Plant</div>
        {
          inputs.map((input) => {
            return <FormInput key={input.id} {...input} onChange={onChange} value={formValues[input.name]}/>
          })
        }
        <div className="flex space-x-2 justify-center mt-4">
          <StandardButton label={"Save Plant"} onClick={handleFormSubmit}/>
        </div>
      </form>
    </div>
  )
}
