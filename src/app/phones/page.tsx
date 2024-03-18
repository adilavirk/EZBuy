import Container from "@/components/Container";
import Product from "@/components/Product";
import { getPhones } from "@/helpers";
import React from "react";

const Phone = async () => {
  const phones = await getPhones();
  return (
    <Container>
      <div className="border-b-[1px] border-b-zinc-400 pb-4 flex items-center justify-between">
        <h2>Phones</h2>
        <p>Get the Phone you want</p>
      </div>
      <p className="mt-4 text-zinc-500 font-semibold">
        Showing all {phones.length}
      </p>
      <Product products={phones} />
    </Container>
  );
};

export default Phone;
