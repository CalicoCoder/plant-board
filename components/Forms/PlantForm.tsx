import React, {ReactNode, useState} from "react";
import FormInput, {StandardFormInput} from "./FormInput";
import {StandardButton} from "../StandardButtons";
import {PlantCreateInput, PlantUpdateByIdInput} from "../../src/server/router/plants";

const formInputs = [
  {
    id: 1,
    inputHtmlAttributes: {
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
    inputHtmlAttributes: {
      name: "commonName",
      placeholder: "Actual name of plant, e.g. Monstera deliciosa",
      required: false,
      type: "text"
    },
    label: "Plant Common Name",
  },
  {
    id: 3,
    inputHtmlAttributes: {
      name: "purchaseDate",
      placeholder: "",
      required: false,
      type: "date"
    },
    label: "Date of Purchase",
  },
  {
    id: 4,
    inputHtmlAttributes: {
      name: "waterInstructions",
      placeholder: "2 Cups from bottom",
      required: false,
      type: "text"
    },
    label: "Watering Instructions",
  },
  {

    id: 5,
    inputHtmlAttributes: {
      name: "notes",
      placeholder: "Needs direct sunlight",
      required: false,
      type: "text"
    },
    label: "Notes",
  },
] as StandardFormInput[];

// TODO: figure out why onSubmitHandler can not have this signature (onSubmitHandler: (formValues: (PlantCreateInput | PlantUpdateByIdInput)) => void)
export default function PlantForm(props: { initialPlantValues: (PlantCreateInput | PlantUpdateByIdInput), formTitle: string, submitButtonLabel: string, onSubmitHandler: (formValues: any) => void, additionalButtons?: ReactNode }) {
  const [formValues, setFormValues] = useState(props.initialPlantValues);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({...formValues, [e.currentTarget.name]: e.currentTarget.value});
  }

  function handleFormSubmit() {
    props.onSubmitHandler(formValues);
  }

  return (
    <div>
      <form className="flex flex-col p-5 text-slate-600">
        <div className="justify-center text-center text-xl">{props.formTitle}</div>
        {
          formInputs.map((formInput) => {
            const formInputName = formInput.inputHtmlAttributes.name! as keyof typeof formValues;

            formInput = {
              ...formInput,
              inputHtmlAttributes: {
                ...formInput.inputHtmlAttributes,
                onChange: onChangeHandler,
                value: formValues[formInputName]
              }
            }
            return <FormInput key={formInput.id} {...formInput}/>
          })
        }
        <div className="flex justify-center mt-4">
          <StandardButton label={props.submitButtonLabel} onClick={handleFormSubmit}/>
          {props.additionalButtons}
        </div>
      </form>
    </div>
  )
}
