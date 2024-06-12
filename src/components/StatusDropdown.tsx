"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { changeOrderStatus } from "@/app/dashboard/actions";
import { useRouter } from "next/navigation";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

// Map order status to label
const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
  awaiting_shipment: "Awaiting Shipment",
  fulfilled: "Fulfilled",
  shipped: "Shipped",
};

const StatusDropdown = ({
  id,
  orderStatus,
}: {
  id: string;
  orderStatus: OrderStatus;
}) => {
  // ---------------------------------------------------------------------------
  // To navigate around the app
  const router = useRouter();
  // ---------------------------------------------------------------------------
  // React Query mutation that uses Server Action to update status
  const { mutate } = useMutation({
    mutationKey: ["change-order-status"],
    mutationFn: changeOrderStatus,
    onSuccess: () => router.refresh(),
  });
  // ---------------------------------------------------------------------------
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Button (trigger)------------------------------------------------ */}
        <Button
          variant="outline"
          className="flex w-52 items-center justify-between"
        >
          {LABEL_MAP[orderStatus]}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        {/* Menu Items------------------------------------------------------ */}
        {Object.keys(OrderStatus).map((status) => (
          // For each status, create a menu item
          <DropdownMenuItem
            key={status}
            className={cn(
              "flex cursor-default items-center gap-1 p-2.5 text-sm hover:bg-zinc-100",
              {
                "bg-zinc-100": orderStatus === status,
              },
            )}
            onClick={() => mutate({ id, newStatus: status as OrderStatus })}
          >
            <CheckIcon
              className={cn(
                "mr-2 h-4 w-4 text-primary",
                orderStatus === status ? "opacity-100" : "opacity-0",
              )}
            />
            {LABEL_MAP[status as OrderStatus]}
          </DropdownMenuItem>
        ))}
        {/* ---------------------------------------------------------------- */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdown;
