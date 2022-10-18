import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {RiMenuLine} from "react-icons/ri";
import {IoAdd} from "react-icons/io5";
import React from "react";
import {DialogContent, DialogTrigger, Dialog} from "./StandardDialog";
import AddPlantForm from "./Forms/AddPlantForm";

export default function BoardMenu(props: { refreshData: () => Promise<void> }) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  async function handleFormSubmit() {
    setIsDialogOpen(false);
    await props.refreshData();
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="fixed left-80 top-60">
            <button className="bg-green-200 rounded-full p-2">
              <RiMenuLine/>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="bg-slate-100 hover:bg-slate-200 rounded-lg drop-shadow-xl animate-scaleIn origin-dropdown">
              <DropdownMenu.Item className="menu-item">
                <DialogTrigger asChild={true}>
                  <button><IoAdd/><span>Add New Plant</span></button>
                </DialogTrigger>
              </DropdownMenu.Item>
              <DropdownMenu.Arrow className="fill-slate-100"/>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <DialogContent><AddPlantForm onSubmitAction={handleFormSubmit}/></DialogContent>
      </Dialog>
    </>
  );
}
