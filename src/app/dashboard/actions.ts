"use server";

import { db } from "@/db";
import { OrderStatus } from "@prisma/client";

// Server Action: Change Order status
export const changeOrderStatus = async ({
  id,
  newStatus,
}: {
  id: string;
  newStatus: OrderStatus;
}) => {
  await db.order.update({
    where: { id },
    data: { status: newStatus },
  });
};
