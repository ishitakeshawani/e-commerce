import { HydrateClient } from "~/trpc/server";
import ProductsPage from "./products/page";

export default function Home() {


  return (
    <HydrateClient>
      <main className="flex flex-col min-h-screen items-center">
       <ProductsPage />
      </main>
    </HydrateClient>
  );
}
