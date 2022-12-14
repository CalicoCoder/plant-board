import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {RiMenuLine} from "react-icons/ri";
import {IoAdd} from "react-icons/io5";
import React from "react";

export default function BoardMenu(props: { refreshData: () => Promise<void>, openNewPlantDialog: () => void }) {
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild={true}
                              className="z-10 self-baseline lg:fixed lg:left-[5%] lg:top-50 lg:drop-shadow-lg hover:lg:drop-shadow-xl">
          <button
            className="bg-green-200 focus-visible:outline-none active:bg-green-300 hover:bg-green-300 rounded lg:rounded-full p-2">
            <RiMenuLine/>
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="bg-slate-100 hover:bg-slate-200 rounded-lg drop-shadow-xl animate-scaleIn origin-dropdown">
            <DropdownMenu.Item className="menu-item">
              <button onClick={props.openNewPlantDialog}><IoAdd/><span>Add New Plant</span></button>
            </DropdownMenu.Item>
            <DropdownMenu.Arrow className="fill-slate-100"/>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
}
