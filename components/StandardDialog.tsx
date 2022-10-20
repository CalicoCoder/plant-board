import React, {ReactNode} from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {IoCloseCircle} from "react-icons/io5";

export const DialogContent = (props: { children: ReactNode }) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="bg-gray-900 bg-opacity-60 inset-0 fixed"/>
      <DialogPrimitive.Content
        className="fixed top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 rounded-md bg-brown-texture w-v50">
        {props.children}
        <DialogPrimitive.Close className="absolute top-0 right-0 mt-1.5 mr-1.5" aria-label="Close"><IoCloseCircle
          className="fill-green-500 hover:fill-green-600 focus:fill-green-600" size="1.5em"/></DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
