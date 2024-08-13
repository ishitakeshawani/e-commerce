import { api, HydrateClient } from "~/trpc/server";
import { Navbar } from "./_components/navbar";

export default async function Home() {

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
       <Navbar />
      </main>
    </HydrateClient>
  );
}
