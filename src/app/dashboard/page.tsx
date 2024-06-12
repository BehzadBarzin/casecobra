import { db } from "@/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import React from "react";
import { formatPrice } from "@/lib/utils";
import StatusDropdown from "@/components/StatusDropdown";

const Dashboard = async () => {
  // ---------------------------------------------------------------------------
  // Get currently logged in user
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  // ---------------------------------------------------------------------------
  // Check if user is admin
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.email !== ADMIN_EMAIL) {
    return notFound();
  }
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Get orders from db
  const orders = await db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      shippingAddress: true,
    },
  });
  // ---------------------------------------------------------------------------
  // Get weekly and monthly sums from db
  const lastWeekSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    _sum: {
      amount: true,
    },
  });
  // ---------------------------------------------------------------------------
  const lastMonthSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    _sum: {
      amount: true,
    },
  });
  // ---------------------------------------------------------------------------
  // Temp: Constants for weekly and monthly goals
  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2500;
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="mx-auto flex w-full max-w-7xl flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-16">
          {/* Top Target Cards---------------------------------------------- */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Weekly Sales / Goal Card------------------------------------ */}
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Week</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastWeekSum._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(WEEKLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastWeekSum._sum.amount ?? 0) * 100) / WEEKLY_GOAL}
                />
              </CardFooter>
            </Card>
            {/* Monthly Sales / Goal Card----------------------------------- */}
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Month</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastMonthSum._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(MONTHLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastMonthSum._sum.amount ?? 0) * 100) / MONTHLY_GOAL}
                />
              </CardFooter>
            </Card>
            {/* ------------------------------------------------------------ */}
          </div>
          {/* Table Title--------------------------------------------------- */}
          <h1 className="text-4xl font-bold tracking-tight">Order History</h1>
          {/* Orders Table-------------------------------------------------- */}
          <Table>
            {/* Table Titles------------------------------------------------ */}
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Purchase date
                </TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            {/* /Table Titles----------------------------------------------- */}
            {/* Table Body-------------------------------------------------- */}
            <TableBody>
              {/* Orders Table---------------------------------------------- */}
              {orders.map((order) => (
                // Loop through orders
                <TableRow key={order.id} className="bg-accent">
                  {/* Customer---------------------------------------------- */}
                  <TableCell>
                    <div className="font-medium">
                      {order.shippingAddress?.name}
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {order.user.email}
                    </div>
                  </TableCell>
                  {/* Status Dropdown--------------------------------------- */}
                  <TableCell className="hidden sm:table-cell">
                    <StatusDropdown id={order.id} orderStatus={order.status} />
                  </TableCell>
                  {/* Purchase date----------------------------------------- */}
                  <TableCell className="hidden md:table-cell">
                    {order.createdAt.toLocaleDateString()}
                  </TableCell>
                  {/* Amount------------------------------------------------ */}
                  <TableCell className="text-right">
                    {formatPrice(order.amount)}
                  </TableCell>
                  {/* ------------------------------------------------------ */}
                </TableRow>
              ))}
            </TableBody>
            {/* /Table Body------------------------------------------------- */}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
