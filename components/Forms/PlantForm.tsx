import React, {useState} from "react";
import FormInput, {StandardFormInput} from "./FormInput";
import StandardButton from "../StandardButton";
import {trpc} from "../../src/utils/trpc";
import {getTodayInHtmlInputFormat} from "../../src/utils/dateUtils";

const inputs = [
  {
    id: 1,
    inputAttributes: {
      name: "nickName",
      pattern: "",
      placeholder: "Your name for the plant, e.g. Mr.Monstera",
      required: true,
      type: "text",
    },
    label: "Plant Nickname",

  },
  {
    id: 2,
    inputAttributes: {
      name: "commonName",
      placeholder: "Actual name of plant, e.g. Monstera deliciosa",
      required: false,
      type: "text"
    },
    label: "Plant Common Name",
  },
  {
    id: 3,
    inputAttributes: {
      name: "purchaseDate",
      placeholder: "",
      required: false,
      type: "date"
    },
    label: "Date of Purchase",
  },
  {
    id: 4,
    inputAttributes: {
      name: "waterInstructions",
      placeholder: "2 Cups from bottom",
      required: false,
      type: "text"
    },
    label: "Watering Instructions",
  },
  {

    id: 5,
    inputAttributes: {
      name: "notes",
      placeholder: "Needs direct sunlight",
      required: false,
      type: "text"
    },
    label: "Notes",
  },
] as StandardFormInput[];

export default function PlantForm(props: { onSubmitAction: () => void }) {
  const [formValues, setFormValues] = useState({
    nickName: "",
    commonName: "",
    purchaseDate: getTodayInHtmlInputFormat(),
    waterInstructions: "",
    notes: ""
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            input = {
              ...input,
              inputAttributes: {
                ...input.inputAttributes,
                onChange: onChangeHandler,
                value: formValues[input.inputAttributes.name]
              }
            }
            return <FormInput key={input.id} {...input}/>
          })
        }
        <div className="flex space-x-2 justify-center mt-4">
          <StandardButton label={"Save Plant"} onClick={handleFormSubmit}/>
        </div>
      </form>
    </div>
  )
}
