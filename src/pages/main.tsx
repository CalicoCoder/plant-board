import {trpc} from "../utils/trpc";
import {NextPage} from "next";
import {Plant} from "@prisma/client";

const Main: NextPage = () => {
  // const plant = trpc.useQuery(["plant.plantByNickname", {nickname: "Big ZZ"}]);
  const plants = trpc.useQuery(["plant.getAll"]);

  return (
    <>
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <div className="pt-6 text-2xl text-blue-500 grid gap-4 grid-cols-6 grid-rows-3">
          {
            plants.data ? plants.data.plants.map(
              (plant: Plant) => (
                <div className="bg-slate-300 rounded-lg flex flex-col justify-center items-center" key={plant.id}>
                  <div>{plant.nickName}</div>
                  <div>{plant.commonName}</div>
                  <div>
                    <div>{plant.waterDates.length}</div>
                    <div>{plant.waterInstructions}</div>
                  </div>
                </div>
              )) : <p>No plants stored</p>
          }
        </div>
      </main>
    </>
  );
}

export default Main;
