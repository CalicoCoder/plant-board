import React, {useState} from "react";
import FormInput, {StandardFormInput} from "./FormInput";
import StandardButton from "../StandardButton";

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

export default function PlantForm(props: { initialPlantValues: Record<string, unknown>, formTitle: string, submitButtonLabel: string, onSubmitHandler: (formValues: Record<string, unknown>) => void }) {
  const [formValues, setFormValues] = useState(props.initialPlantValues);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({...formValues, [e.currentTarget.name]: e.currentTarget.value});
  }

  function handleFormSubmit() {
    props.onSubmitHandler(formValues);
  }

  return (
    <div>
      <form className="flex flex-col p-5 text-green-900">
        <div className="justify-center text-center text-xl">{props.formTitle}</div>
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
          <StandardButton label={props.submitButtonLabel} onClick={handleFormSubmit}/>
        </div>
      </form>
    </div>
  )
}
