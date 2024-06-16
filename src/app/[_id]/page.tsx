import { getProducts } from "@/helpers";
import React from "react";
import { ProductType } from "../../../type";
import Container from "@/components/Container";
import Image from "next/image";
import FormattedPrice from "@/components/FormattedPrice";

import toast, { Toaster } from "react-hot-toast";
import ProductDetailsAddToCartButton from "@/components/ProductDetailsAddToCartButton";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const SingleProductPage = async ({ searchParams }: Props) => {
  // Log searchParams to debug
  console.log("searchParams:", searchParams);

  const products = await getProducts();

  const _idString = searchParams?._id;

  // Ensure _idString is available and valid
  if (!_idString || Array.isArray(_idString)) {
    console.error("Invalid _id parameter");
    return <div>Error: Invalid product ID</div>;
  }

  const _id = Number(_idString);
  if (isNaN(_id)) {
    console.error("Invalid _id parameter");
    return <div>Error: Invalid product ID</div>;
  }

  const singleProduct = (_id: number) => {
    const item = products.find((product: ProductType) => product._id === _id);
    return item;
  };

  const product = singleProduct(_id);

  if (!product) {
    console.error("Product not found");
    return <div>Error: Product not found</div>;
  }

  return (
    <Container className="flex flex-col items-center md:flex-row px-4">
      <div className="w-full md:w-1/2 overflow-hidden bg-zinc-50 flex items-center justify-center p-10">
        <Image
          src={product.image}
          alt="product image"
          width={500}
          height={500}
          className="transform transition-transform hover:scale-110 duration-500"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-2">
        <h2 className="text-3xl font-semibold">{product.title}</h2>
        <p className="flex items-center gap-10">
          <FormattedPrice
            amount={product.price}
            className="text-lg font-semibold"
          />
          <FormattedPrice
            amount={product.previousPrice}
            className="text-zinc-500 line-through"
          />
        </p>
        <p>
          You saved{" "}
          <FormattedPrice
            amount={product.previousPrice - product.price}
            className="text-base font-semibold bg-designColor underline underline-offset-2"
          />{" "}
          from this product.
        </p>
        <ProductDetailsAddToCartButton products={product} />

        {product.isNew && (
          <p className="text-designColor font-semibold ">New Arrival</p>
        )}
        <p>
          Brand: <span className="font-semibold">{product.brand}</span>
        </p>
        <p>
          Category: <span className="font-semibold">{product.category}</span>
        </p>
        <p>{product.description}</p>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "black",
            color: "#fff",
          },
        }}
      />
    </Container>
  );
};

export default SingleProductPage;
