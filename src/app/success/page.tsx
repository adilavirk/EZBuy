"use client";

import Container from "@/components/Container";
import { resetCart } from "@/redux/proSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetCart());
  }, []);
  return (
    <Container className="flex items-center justify-center py-20">
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
        <h2 className="text-4xl font-bold">
          {" "}
          Your Payment Accepted by nextamazonpro.com{" "}
        </h2>
        <p>Now you can view your Orders or continue Shopping with us</p>
        <div className="flex items-center gap-x-5">
          <Link href={"/order"}>
            <button className="successBtn">View Orders</button>
          </Link>
          <Link href={"/"}>
            <button className="successBtn">Continue Shopping</button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default page;
