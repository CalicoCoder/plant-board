import {trpc} from "../utils/trpc";
import {NextPage} from "next";
import Layout from "../../components/Layout";
import PlantSummaryCard from "../../components/PlantSummaryCard";
import React from "react";
import BoardMenu from "../../components/BoardMenu"
import AddPlantForm from "../../components/Forms/AddPlantForm";
import {StandardDialog} from "../../components/StandardDialog";
import {StandardButton} from "../../components/StandardButtons";
import {MainPlantSummaryPayload} from "../server/db/types";

const Board: NextPage = () => {
  const plantsSummaryQuery = trpc.plant.getPlantsSummary.useQuery();
  const {isSuccess, isLoading, isFetching, isError, data, error} = plantsSummaryQuery;
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  async function refetchPlantData() {
    await plantsSummaryQuery.refetch();
  }

  async function handleFormSubmit() {
    setIsDialogOpen(false);
    await refetchPlantData();
  }

  let plantSummaryHtml;
  if (isLoading || isFetching)
    plantSummaryHtml = (<div>Loading...</div>)

  if (isError)
    plantSummaryHtml = (<div>Error! <div>{error?.message}</div></div>)

  if (isSuccess ) {
    if (data.length == 0) {
      plantSummaryHtml = (
        <div>
          <div className="mb-5">No plants created yet.</div>
          <StandardButton label="Create new Plant" onClick={() => setIsDialogOpen(true)}/>
        </div>)
    } else {
      plantSummaryHtml = (data).map(
        (plant: MainPlantSummaryPayload) => {
          return (<PlantSummaryCard key={plant.id} plant={plant} refreshData={refetchPlantData}/>);
        });
      plantSummaryHtml =
        <div className="pt-2 lg:pt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 w-full">
          {plantSummaryHtml}
        </div>
    }
  }

  return (
    <Layout>
      <div
        className="container mx-auto flex flex-col items-center min-h-screen px-2.5 pt-0 lg:p-10 lg:px-[9%] relative text-slate-600">
        <BoardMenu refreshData={refetchPlantData} openNewPlantDialog={() => setIsDialogOpen(true)}/>
        {plantSummaryHtml}
      </div>
      <StandardDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AddPlantForm onSubmitAction={handleFormSubmit} onCancelAction={() => setIsDialogOpen(false)} />
      </StandardDialog>
    </Layout>
  );
}

export default Board;
