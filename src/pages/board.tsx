import {trpc} from "../utils/trpc";
import {NextPage} from "next";
import Layout from "../../components/layout";
import {MainPlantSummaryPayload} from "../server/router/plants";
import PlantSummaryCard from "../../components/PlantSummaryCard";
import React, {useEffect} from "react";
import BoardMenu from "../../components/BoardMenu"

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
