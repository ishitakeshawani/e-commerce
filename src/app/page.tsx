import { HydrateClient } from "~/trpc/server";
import { Navbar } from "./_components/navbar";
import { Banner } from "./_components/banner";
import SignUp from "./signup";
import { VerifyOTP } from "./verifyotp";

export default async function Home() {


  return (
    <HydrateClient>
      <main className="flex flex-col min-h-screen items-center">
       <Navbar />
       <Banner />
       <SignUp />
      </main>
    </HydrateClient>
  );
}
