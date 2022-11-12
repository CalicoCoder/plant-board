import React, {FunctionComponent} from "react";
interface ButtonProps {
  label: string
  onClick?: () => void
  classNames?: string,
  type?: 'submit' | 'reset' | 'button' | undefined;
}


const BaseButton: FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  return <button type={props.type} onClick={props.onClick}
                 className={`inline-block px-6 lg:px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase
                 rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none
                 focus:ring-0 active:shadow-lg transition duration-150 ease-in-out ${props.classNames}`}>{props.label}
  </button>;
}

BaseButton.defaultProps = {
  type: "button"
};

export function StandardButton(props: ButtonProps) {
  return <BaseButton onClick={props.onClick} label={props.label} type={props.type}
                     classNames={`bg-green-500 hover:bg-green-600 focus:bg-green-600 active:bg-green-800 ${props.classNames}`}/>;
}

export function DangerButton(props: ButtonProps) {
  return <BaseButton onClick={props.onClick} label={props.label} type={props.type}
                     classNames={`bg-red-500 hover:bg-red-600 focus:bg-red-600 active:bg-red-800 ${props.classNames}`}/>;
}

export function NeutralButton(props: ButtonProps) {
  return <BaseButton onClick={props.onClick} label={props.label} type={props.type}
                     classNames={`bg-slate-400 hover:bg-slate-500 focus:bg-slate-500 active:bg-slate-700 ${props.classNames}`}/>;
}

