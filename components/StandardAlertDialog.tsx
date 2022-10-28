import * as AlertDialog from "@radix-ui/react-alert-dialog";
import {DangerButton, NeutralButton} from "./StandardButtons";
import React, {ReactNode} from "react";

export const StandardAlertDialog = (props: {
  title: string;
  description: string;
  triggerNode: ReactNode,
  actionText: string,
  onDialogAction: () => void }) =>  {
  return (<AlertDialog.Root>
    <AlertDialog.Trigger asChild={true}>{props.triggerNode}</AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-gray-900 bg-opacity-60 inset-0 fixed"/>
      <AlertDialog.Content
        className="animate-scaleIn origin-[0%_0%] fixed top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 rounded-md bg-slate-200 w-v50 p-4 max-w-lg">
        <AlertDialog.Title className="text-xl mb-2 font-medium">{props.title}</AlertDialog.Title>
        <AlertDialog.Description className="mb-4 font-light text-slate-600">
          {props.description}
        </AlertDialog.Description>
        <div className="flex justify-end">
          <AlertDialog.Cancel className="mr-6"><NeutralButton label="Cancel"/></AlertDialog.Cancel>
          <AlertDialog.Action><DangerButton label={props.actionText} onClick={props.onDialogAction}/></AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>)
}
