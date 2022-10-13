import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {RiMenuLine} from "react-icons/ri";
import {IoAdd} from "react-icons/io5";
import React from "react";

export default function BoardMenu() {
  return (
    <DropdownMenu.Root defaultOpen={true}>
      <DropdownMenu.Trigger className="fixed left-80 top-60">
        <button className="bg-green-200 rounded-full p-2">
          <RiMenuLine/>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-slate-100 hover:bg-slate-200 rounded-lg drop-shadow-xl animate-scaleIn origin-dropdown">
          <DropdownMenu.Item className="menu-item">
            <button><IoAdd/><span>Add New Plant</span></button>
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="fill-slate-100"/>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
