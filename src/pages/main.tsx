import {trpc} from "../utils/trpc";
import {NextPage} from "next";
import {Plant} from "@prisma/client";
import Layout from "../../components/layout";

const Main: NextPage = () => {
  // const plant = trpc.useQuery(["plant.plantByNickname", {nickname: "Big ZZ"}]);
  const plants = trpc.useQuery(["plant.getAll"]);

  return (
    <Layout>
      <div className="container mx-auto flex flex-col items-center min-h-screen pt-8 p-4">
        <div className="pt-6 text-slate-700 grid gap-4 grid-cols-6 grid-rows-3">
          {
            plants.data ? plants.data.plants.map(
              (plant: Plant) => (
                <div className="bg-green-300 rounded-lg flex flex-col justify-center items-center shadow-lg divide-y divide-dashed divide-medium-brown" key={plant.id}>
                  <div className="flex justify-center w-full text-center text-xl p-2">{plant.nickName ? plant.nickName : "NO NICKNAME"}</div>
                  <div className="flex justify-center w-full text-center p-2">{plant.commonName}</div>
                  <div className="flex justify-center w-full flex-col justify-center items-center text-sm p-2">
                    <div>{plant.waterDates.length}</div>
                    <div>{plant.waterInstructions}</div>
                  </div>
                </div>
              )) : <p>No plants stored</p>
          }
        </div>
      </div>
    </Layout>
  );
}

export default Main;
