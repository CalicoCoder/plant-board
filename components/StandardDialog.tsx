import React, {Dispatch, ReactNode, SetStateAction} from 'react';
import {
  Portal,
  Overlay,
  Content,
  Close,
  Root
} from '@radix-ui/react-dialog';
import {IoCloseCircle} from "react-icons/io5";

export interface StandardDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export const StandardDialog = (props: StandardDialogProps) => {
  return (
    <Root open={props.open} onOpenChange={props.onOpenChange}>
      <Portal>
        <Overlay className="bg-gray-900 bg-opacity-60 inset-0 fixed z-40"/>
        <Content onOpenAutoFocus={(event) => {event.preventDefault()}}
                 className="z-40 overflow-scroll animate-scaleIn origin-[0%_0%] fixed top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 max-h-full rounded-md bg-brown-texture w-v90 md:w-v50">
          {props.children}
          <Close className="absolute top-0 right-0 mt-1.5 mr-1.5" aria-label="Close"><IoCloseCircle
            className="fill-green-500 hover:fill-green-600 focus:fill-green-600" size="1.5em"/></Close>
        </Content>
      </Portal>
    </Root>
  );
}
