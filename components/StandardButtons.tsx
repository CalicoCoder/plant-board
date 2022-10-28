import React from "react";

export function BaseButton(props: { label: string, onClick?: (...args: never[]) => void, classNames?: string }) {
  return <button type="button" onClick={props.onClick}
                 className={`inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase
                 rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none
                 focus:ring-0 active:shadow-lg transition duration-150 ease-in-out ${props.classNames}`}>{props.label}
  </button>;
}

export function StandardButton(props: { label: string, onClick?: (...args: never[]) => void }) {
  return <BaseButton onClick={props.onClick} label={props.label}
                     classNames="bg-green-500 hover:bg-green-600 focus:bg-green-600 active:bg-green-800"/>;
}

export function DangerButton(props: { label: string, onClick?: (...args: never[]) => void }) {
  return <BaseButton onClick={props.onClick} label={props.label}
                     classNames="bg-red-500 hover:bg-red-600 focus:bg-red-600 active:bg-red-800"/>;
}

export function NeutralButton(props: { label: string, onClick?: (...args: never[]) => void }) {
  return <BaseButton onClick={props.onClick} label={props.label}
                     classNames="bg-slate-400 hover:bg-slate-500 focus:bg-slate-500 active:bg-slate-700"/>;
}

