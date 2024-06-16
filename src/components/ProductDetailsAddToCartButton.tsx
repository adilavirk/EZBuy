"use client";
import { addToCart } from "@/redux/proSlice";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { ProductType } from "../../type";
interface Props {
  products?: ProductType;
}

const ProductDetailsAddToCartButton = ({ products }: Props) => {
  //ADD  TO CART
  const dispatch = useDispatch();

  return (
    <button
      onClick={() =>
        dispatch(
          addToCart(products),
          toast.success(`${products?.title} is added to cart`)
        )
      }
      className="bg-designColor/80 text-zinc-700 px-6 py-2 font-medium rounded-md hover:bg-designColor hover:text-black cursor-pointer duration-200 shadow-lg w-40 my-2 capitalize"
    >
      Add to cart
    </button>
  );
};

export default ProductDetailsAddToCartButton;
