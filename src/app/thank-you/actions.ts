"use server";

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// Server Action: Get the order from database
export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user.email) {
    throw new Error("You need to be logged in to view this page.");
  }

  // Get order from database
  const order = await db.order.findFirst({
    where: { id: orderId, userId: user.id },
    include: {
      billingAddress: true,
      configuration: true,
      shippingAddress: true,
      user: true,
    },
  });

  if (!order) throw new Error("This order does not exist.");

  // If order is paid, return it
  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
};
