import {trpc} from "../utils/trpc";
import {NextPage} from "next";
import Layout from "../../components/Layout";
import {MainPlantSummaryPayload} from "../server/router/plants";
import PlantSummaryCard from "../../components/PlantSummaryCard";
import React, {useEffect} from "react";
import BoardMenu from "../../components/BoardMenu"

const Board: NextPage = () => {
  const plantsSummaryQuery = trpc.useQuery(["plant.getPlantsSummary"]);
  const {isLoading, isError, data, error} = plantsSummaryQuery;
  const [plants, setPlants] = React.useState([] as typeof data);

  function plantWaterDateComparatorFunction(plantA: MainPlantSummaryPayload, plantB: MainPlantSummaryPayload) {
    if (!plantB.waterDates[0]) return 1;
    if (!plantA.waterDates[0]) return -1;

    if (plantA.waterDates[0].date > plantB.waterDates[0].date) {
      return -1;
    } else if (plantA.waterDates[0].date < plantB.waterDates[0].date) {
      return 1;
    } else return 0;

  }

  function setAndSortPlantsByWaterDate(data: MainPlantSummaryPayload[]) {
    setPlants(data.sort(plantWaterDateComparatorFunction));
  }

  async function refetchPlantData() {
    const {data} = await plantsSummaryQuery.refetch();
    data && setAndSortPlantsByWaterDate(data);
  }

  useEffect(() => {
    data && setAndSortPlantsByWaterDate(data);
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
    plantSummaryHtml = <div className="pt-2 lg:pt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">{plantSummaryHtml}</div>
  } else if(plants && plants.length == 0){
    plantSummaryHtml = (
      <div>
        No plants created yet, use the green hamburger menu to the left to create one? But really I should have a link here.
      </div>)
  }

  return (
    <Layout>
        <div className="container mx-auto flex flex-col items-center min-h-screen px-2.5 pt-0 lg:p-10 lg:px-[9%] relative text-slate-600">
          <BoardMenu refreshData={refetchPlantData}/>
            {plantSummaryHtml}
        </div>
    </Layout>
  );
}

export default Board;
