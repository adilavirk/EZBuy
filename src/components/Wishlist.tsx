"use client";
import Button from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, StateProps } from "../../type";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import {
  addToCart,
  decreaseQuantity,
  deleteFavorite,
  increaseQuantity,
  resetFavorite,
} from "@/redux/proSlice";
import { Minus, Plus, X } from "lucide-react";
import FormattedPrice from "./FormattedPrice";
import { calculatePercentage } from "@/helpers";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Wishlist = () => {
  const { favoriteData } = useSelector((state: StateProps) => state.pro);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your wishlist?"
    );
    if (confirmReset) {
      dispatch(resetFavorite());
      toast.success("Wishlist Reset Successfully!");
      router.push("/");
    }
  };
  return (
    <>
      {favoriteData.length > 0 ? (
        <div className="mt-5 flex flex-col">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-white uppercase bg-zinc-950">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product Information
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Unit Price
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Availability
                  </th>
                </tr>
              </thead>
              {favoriteData?.map((item: ProductType) => (
                <tbody key={item?._id}>
                  <tr className="bg-white border-b-[1px] border-b-zinc-300">
                    <th
                      scope="row"
                      className="px-6 py-4 flex items-center gap-3"
                    >
                      <X
                        onClick={() => {
                          dispatch(deleteFavorite(item?._id)),
                            toast.success(
                              `${item?.title} is removed successfuly!`
                            );
                        }}
                        className="hover:text-red-600 cursor-pointer h-4 w-4 duration-200"
                      />
                      <Image
                        src={item?.image}
                        alt={`${item?.title} image`}
                        width={500}
                        height={500}
                        className="w-24 object-contain"
                      />
                      <p className="text-base text-black font-medium">
                        {item?.title}
                      </p>
                    </th>
                    <td className="px-6 py-4">
                      <FormattedPrice amount={item?.price} />
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        title="Add to cart"
                        onClick={() =>
                          dispatch(
                            addToCart(item),
                            toast.success(` ${item?.title} added successfully`)
                          )
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          {/* Reset Button */}
          <Button title="Reset Wishlist" onClick={handleReset} />
        </div>
      ) : (
        <div className="py-10 flex flex-col  gap-1 items-center justify-center">
          <p className="text-lg font-bold">Your wishlist is empty</p>
          <Link
            href={"/"}
            className="text-sm uppercase font-semibold underline underline-offset-2 hover:text-designColor duration-200 cursor-pointer"
          >
            Go back to Shopping
          </Link>
        </div>
      )}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000",
            color: " #fff",
          },
        }}
      />
    </>
  );
};

export default Wishlist;
