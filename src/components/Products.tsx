import Link from "next/link";
import Container from "./Container";
import { category } from "@/constants";
import Image from "next/image";
import Product from "./Product";
import { getProducts } from "@/helpers";

const Products = async () => {
  const products = await getProducts();

  return (
    <section className="mt-10 mb-60">
      <Container>
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-3xl font-semibold">Choose a category</h2>
          <p className="text-lg text-center">
            Explore dozens of customized layouts made by our brilliant
            designers.
          </p>
          <div className="flex items-center gap-2 md:gap-6 mt-5">
            {category.map((items) => (
              <Link
                key={items.href}
                href={items.href}
                className=" text-zinc-500  flex gap-2 hover:text-black cursor-pointer duration-200"
              >
                <Image src={items.icon} alt={`${items.title} image`} />
                <p>{items.title}</p>
                <div className="h-7 w-[1px] bg-designColor inline-flex" />
              </Link>
            ))}
          </div>
        </div>
        <Product products={products} />
      </Container>
    </section>
  );
};

export default Products;
