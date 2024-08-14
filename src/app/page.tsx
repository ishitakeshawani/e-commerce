import { HydrateClient } from "~/trpc/server";
import SignUp from "./signup/page"

export default function Home() {


  return (
    <HydrateClient>
      <main className="flex flex-col min-h-screen items-center">
       <SignUp />
      </main>
    </HydrateClient>
  );
}
