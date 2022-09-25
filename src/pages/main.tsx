import {trpc} from "../utils/trpc";
import {NextPage} from "next";
import Layout from "../../components/layout";
import {MainPlantSummaryPayload} from "../server/router/plants";

const Main: NextPage = () => {
  const plants = trpc.useQuery(["plant.getPlantsSummary"]);

  return (
    <Layout>
      <div className="container mx-auto flex flex-col items-center min-h-screen pt-8 p-4">
        <div className="pt-6 text-slate-700 grid gap-4 grid-cols-6 grid-rows-3">
          {
            plants.data ? plants.data.map(
              (plant: MainPlantSummaryPayload) => {
                return (
                  <div
                    className="bg-green-300 rounded-lg flex flex-col justify-center items-center shadow-lg divide-y divide-dashed divide-medium-brown"
                    key={plant.id}>
                    <div className="flex flex-col justify-center w-full text-center p-2 ">
                      <div className="text-xl text-bold">{plant.nickName ? plant.nickName : "NO NICKNAME"}</div>
                      <div className="text-xs text-slate-600">{plant.commonName}</div>
                    </div>
                    <div className="flex justify-center w-full flex-col justify-center items-center text-sm p-2">
                      <div>{plant.waterDates[0] ? plant.waterDates[0].date.toLocaleString('en-US', { dateStyle: 'medium' }) : "Not watered yet :("}</div>
                    </div>
                  </div>
                );
              }) : <p>No plants stored</p>
          }
        </div>
      </div>
    </Layout>
  );
}

export default Main;
