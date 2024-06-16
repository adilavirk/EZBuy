"use client";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, StateProps } from "../../type";
import Image from "next/image";
// import deleteIcon from "../../public/icons/deleteIcon.svg";
import { Minus, Plus, X } from "lucide-react";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
  resetCart,
  resetFavorite,
} from "@/redux/proSlice";
import toast, { Toaster } from "react-hot-toast";
import FormattedPrice from "./FormattedPrice";
import { calculatePercentage } from "@/helpers";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [rawPrice, setRawPrice] = useState(0); //rawPrice is the actual price of product
  const { productData } = useSelector((state: StateProps) => state.pro);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your cart?"
    );
    if (confirmReset) {
      dispatch(resetCart());
      toast.success("Cart Reset Successfully!");
      router.push("/");
    }
  };

  //   price value
  useEffect(() => {
    let amount = 0;
    let rawAmount = 0;
    productData.map(
      (item: ProductType) => (amount += item?.price * item?.quantity)
    );
    productData.map(
      (item: ProductType) => (rawAmount += item?.previousPrice * item?.quantity)
    );
    setTotalAmount(amount);
    setRawPrice(rawAmount);
  }, [productData]);

  //stripe payment
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const handleCheckOut = async () => {
    const stripe = await stripePromise;
    const response = await fetch("http://localhost:3000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: productData,
        email: session?.user?.email,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      // await dispatch(saveOrder({ order: productData, id: data.id }));
      stripe?.redirectToCheckout({ sessionId: data.id });
      dispatch(resetFavorite());
    } else {
      throw new Error("Failed to create Stripe Payment");
    }
  };
  return (
    <>
      {productData.length > 0 ? (
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
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    SubTotal
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Saving
                  </th>
                </tr>
              </thead>
              {productData?.map((item: ProductType) => (
                <tbody key={item?._id}>
                  <tr className="bg-white border-b-[1px] border-b-zinc-300">
                    <th
                      scope="row"
                      className="px-6 py-4 flex items-center gap-3"
                    >
                      <X
                        onClick={() => {
                          dispatch(deleteProduct(item?._id)),
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
                    <td className="flex items-center gap-4 px-6 py-4">
                      <span className="border border-zinc-300 p-1 rounded-md hover:border-zinc-800 cursor-pointer duration-200 inline-flex items-center justify-center">
                        <Minus
                          onClick={() =>
                            item?.quantity > 1
                              ? dispatch(decreaseQuantity(item)) &&
                                toast.success(
                                  "Quantity decreased Successfully!"
                                )
                              : toast.error("Cannot delete less than 1")
                          }
                          className="w-4 h-4"
                        />
                      </span>
                      <span className="font-semibold">{item?.quantity}</span>
                      <span className="border border-zinc-300 p-1 rounded-md hover:border-zinc-800 cursor-pointer duration-200 inline-flex items-center justify-center">
                        <Plus
                          onClick={() => {
                            dispatch(increaseQuantity(item)),
                              toast.success(`${item?.title} quantity added`);
                          }}
                          className="w-4 h-4"
                        />
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <FormattedPrice amount={item?.price * item?.quantity} />
                    </td>
                    <td className="px-6 py-4">
                      <p className="bg-zinc-900 w-20 text-sm font-semibold text-center py-1 rounded-md text-white">
                        {calculatePercentage(item?.price, item?.previousPrice)}{" "}
                        %save
                      </p>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <button
            onClick={handleReset}
            className="bg-zinc-950 text-zinc-200 w-36 py-3 mt-5 rounded-md uppercase text-xs font-semibold hover:bg-red-700 hover:text-white"
          >
            Reset Cart
          </button>
          <div className="mt-4 bg-white max-w-xl p-4 flex flex-col gap-1">
            <p className="border-b-[1px] border-b-designColor py-1">
              Cart Summary
            </p>
            <p className="flex items-center justify-between">
              Total Items <span>{productData.length}</span>
            </p>
            <p className="flex items-center justify-between">
              Price{" "}
              <span>
                <FormattedPrice amount={rawPrice} />
              </span>
            </p>
            <p className="flex items-center justify-between">
              Discount{" "}
              <span>
                <FormattedPrice amount={rawPrice - totalAmount} />
              </span>
            </p>
            <p className="flex items-center justify-between">
              Total Price{" "}
              <span>
                <FormattedPrice
                  amount={totalAmount}
                  className="font-semibold text-lg"
                />
              </span>
            </p>
            <button
              onClick={handleCheckOut}
              className="bg-zinc-800 text-zinc-200 my-2 py-2 uppercase text-center rounded-md font-semibold hover:bg-black hover:text-white duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="py-10 flex flex-col  gap-1 items-center justify-center">
          <p className="text-lg font-bold">Your cart is empty</p>
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

export default Cart;
