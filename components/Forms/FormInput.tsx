import {useState} from "react";

export default function FormInput(props) {
  const {label, onChange, id, errorMessage, lastInput, ...inputProps} = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  }

  return (
    <div className="flex flex-col p-1.5">
      <label>{label}</label>
      <input className="rounded" {...inputProps} onChange={onChange} onBlur={handleFocus} onFocus={() => lastInput && setFocused(true)} focused={focused.toString()}/>
      <span className="text-red-400">{errorMessage}</span>
    </div>
  )
}
