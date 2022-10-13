import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {RiMenuLine} from "react-icons/ri";
import {IoAdd} from "react-icons/io5";
import React from "react";
import * as Dialog from '@radix-ui/react-dialog';
import PlantForm from "./Forms/PlantForm";

export default function BoardMenu() {
  return (
    <Dialog.Root>
      <DropdownMenu.Root defaultOpen={true}>
        <DropdownMenu.Trigger className="fixed left-80 top-60">
          <button className="bg-green-200 rounded-full p-2">
            <RiMenuLine/>
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="bg-slate-100 hover:bg-slate-200 rounded-lg drop-shadow-xl animate-scaleIn origin-dropdown">
            <DropdownMenu.Item className="menu-item">
              <Dialog.Trigger>
                <button><IoAdd/><span>Add New Plant</span></button>
              </Dialog.Trigger>
            </DropdownMenu.Item>
            <DropdownMenu.Arrow className="fill-slate-100"/>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-gray-900 bg-opacity-60 inset-0 fixed"/>
        <Dialog.Content
          className="fixed top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 rounded-md bg-brown-texture w-v50"><PlantForm/></Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
