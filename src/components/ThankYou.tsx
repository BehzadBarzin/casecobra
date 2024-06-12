"use client";

import { useQuery } from "@tanstack/react-query";
import { getPaymentStatus } from "../app/thank-you/actions";
import { useSearchParams } from "next/navigation";

const ThankYou = () => {
  // ---------------------------------------------------------------------------
  // Get orderId from search params
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  // ---------------------------------------------------------------------------
  // Get order from database using server action
  const { data } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: true,
    retryDelay: 500,
  });
  // ---------------------------------------------------------------------------
  // Server action hasn't returned anything yet
  if (data === undefined) {
    return <div>No Order Yet!</div>;
  }
  // ---------------------------------------------------------------------------
  // Server action returned 'false' meaning that order didn't exist on database
  if (data === false) {
    return <div>No Order</div>;
  }
  // ---------------------------------------------------------------------------
  // Valid Order found in db
  return <div className="bg-white">{data.id}</div>;
};

export default ThankYou;
