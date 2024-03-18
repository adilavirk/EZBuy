import Container from "@/components/Container";
import Product from "@/components/Product";
import { getAccessories } from "@/helpers";
import React from "react";

const page = async () => {
  const accessories = await getAccessories();
  return (
    <Container>
      <div className="flex items-center justify-between border-b-[1px] border-zinc-400 pb-4">
        <h2>Accessories</h2>
        <p>Get the Accessories you want</p>
      </div>
      <p className="text-zinc-500 font-semibold mt-4 ">
        Showing all {accessories.length}
      </p>
      <Product products={accessories} />
    </Container>
  );
};

export default page;
