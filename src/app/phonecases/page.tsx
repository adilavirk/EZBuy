import Container from "@/components/Container";
import Product from "@/components/Product";
import { getPhoneCases } from "@/helpers";
import React from "react";

const Phone = async () => {
  const phoneCases = await getPhoneCases();
  return (
    <Container>
      <div className="border-b-[1px] border-b-zinc-400 pb-4 flex items-center justify-between">
        <h2>Phone Cases</h2>
        <p>Get the Phone Cases you want</p>
      </div>
      <p className="mt-4 text-zinc-500 font-semibold">
        Showing all {phoneCases.length}
      </p>
      <Product products={phoneCases} />
    </Container>
  );
};

export default Phone;
