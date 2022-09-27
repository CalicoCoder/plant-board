import {trpc} from "../utils/trpc";
import {NextPage} from "next";
import Layout from "../../components/layout";
import {MainPlantSummaryPayload} from "../server/router/plants";
import PlantSummaryCard from "../../components/PlantSummaryCard";

const Main: NextPage = () => {
  const plants = trpc.useQuery(["plant.getPlantsSummary"]);

  return (
    <Layout>
      <div className="container mx-auto flex flex-col items-center min-h-screen pt-8 p-4">
        <div className="pt-6 text-slate-700 grid gap-4 grid-cols-6">
          {
            plants.data ? plants.data.map(
              (plant: MainPlantSummaryPayload) => {
                return (
                  <PlantSummaryCard  key={plant.id} plant={plant}/>
                );
              }) : <p>No plants stored</p>
          }
        </div>
      </div>
    </Layout>
  );
}

export default Main;
