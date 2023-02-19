import React, {FormEvent, ReactNode, useState} from "react";
import FormInput, {StandardFormInput} from "./FormInput";
import {PlantCreateInput, PlantUpdateByIdInput} from "../../src/server/db/types";

const formInputs = [
  {
    id: 1,
    inputHtmlAttributes: {
      name: "nickName",
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
      name: "waterFrequency",
      placeholder: "2",
      required: false,
      type: "number",
      min: 0
    },
    label: "Watering Frequency (in days)",
  },
  {

    id: 6,
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
export default function PlantForm(props: { initialPlantValues: (PlantCreateInput | PlantUpdateByIdInput), formTitle: string, onSubmitHandler: (formValues: any) => void, formButtons?: ReactNode }) {
  const [formValues, setFormValues] = useState(props.initialPlantValues);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({...formValues, [e.currentTarget.name]: e.currentTarget.value});
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onSubmitHandler(formValues);
  }

  return (
    <div>
      <form className="flex flex-col p-5 text-slate-600" onSubmit={handleFormSubmit}>
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
          {props.formButtons}
        </div>
      </form>
    </div>
  )
}
