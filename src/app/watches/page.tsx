import Container from "@/components/Container";
import Product from "@/components/Product";
import { getWatches } from "@/helpers";
import React from "react";

const page = async () => {
  const watches = await getWatches();
  return (
    <Container>
      <div className="flex items-center justify-between border-b-[1px] border-b-zinc-400 pb-4">
        <h2>Watches</h2>
        <p>Get the Watches you want</p>
      </div>
      <p className="mt-4 text-zinc-500 font-semibold">
        Showing all {watches.length}
      </p>
      <Product products={watches} />
    </Container>
  );
};

export default page;
