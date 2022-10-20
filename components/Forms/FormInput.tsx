import React from "react";

export interface StandardFormInput {
  id: number,
  inputAttributes: React.InputHTMLAttributes<HTMLInputElement>,
  errorMessage: string,
  label: string,
  value: string,
  onChange: React.FormEvent<HTMLInputElement>
}

export default function FormInput(props: StandardFormInput) {
  const {label, errorMessage} = props;

  return (
    <div className="flex flex-col p-1.5">
      <label>{label}:</label>
      <input className="rounded" {...props.inputAttributes} />
      <span className="text-red-400">{errorMessage}</span>
    </div>
  )
}
