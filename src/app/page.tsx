import { HydrateClient } from "~/trpc/server";
import { Navbar } from "./_components/navbar";
import { Banner } from "./_components/banner";

export default async function Home() {


  return (
    <HydrateClient>
      <main className="flex flex-col min-h-screen">
       <Navbar />
       <Banner />
      </main>
    </HydrateClient>
  );
}
