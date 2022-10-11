import {trpc} from "../utils/trpc";
import {NextPage} from "next";
import Layout from "../../components/layout";
import {MainPlantSummaryPayload} from "../server/router/plants";
import PlantSummaryCard from "../../components/PlantSummaryCard";
import React, {useEffect} from "react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {RiMenuLine} from "react-icons/ri";
import {IoAdd} from "react-icons/io5";

const Board: NextPage = () => {
  const plantsSummaryQuery = trpc.useQuery(["plant.getPlantsSummary"]);
  const {isLoading, isError, data, error} = plantsSummaryQuery;
  const [plants, setPlants] = React.useState(data);

  async function refetchPlantData() {
    const {data} = await plantsSummaryQuery.refetch();
    if (data) {
      setPlants(data);
    }
  }

  useEffect(() => {
    setPlants(data);
  }, [data]);

  let plantSummaryHtml;

  if (isLoading)
    plantSummaryHtml = (<div>Loading...</div>)

  if (isError)
    plantSummaryHtml = (<div>Error! <div>{error?.message}</div></div>)

  if (plants && plants.length > 0) {
    plantSummaryHtml = plants.map(
      (plant: MainPlantSummaryPayload) => {
        return (<PlantSummaryCard key={plant.id} plant={plant} refreshData={refetchPlantData}/>);
      });
  }

  return (
    <Layout>
      <div className="container mx-auto flex flex-col items-center min-h-screen pt-8 p-4 relative">
        <BoardMenu/>
        <div className="pt-6 text-slate-700 grid gap-4 grid-cols-6">
          {plantSummaryHtml}
        </div>
      </div>
    </Layout>
  );
}

export default Board;

export function BoardMenu() {
  return (
    <DropdownMenu.Root defaultOpen={true}>
      <DropdownMenu.Trigger className="fixed left-80 top-60">
        <button className="bg-green-200 rounded-full p-2">
          <RiMenuLine/>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-slate-100 rounded-lg drop-shadow-xl animate-scaleIn origin-dropdown">
          <DropdownMenu.Item className="menu-item">
            <button><IoAdd/> Add New Plant</button>
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="fill-slate-100"/>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
