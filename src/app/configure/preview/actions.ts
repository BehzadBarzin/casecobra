"use server";

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";

// Server Action: Create Stripe checkout session
export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  // Get configuration from db
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  });

  if (!configuration) {
    throw new Error("No such configuration found");
  }

  // Get authenticated user
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("You need to be logged in");
  }

  // Calculate total price
  const { finish, material } = configuration;

  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate")
    price += PRODUCT_PRICES.material.polycarbonate;

  // Create order in database
  let order: Order | undefined = undefined;

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
  });

  console.log(`UserID: ${user.id}`, `OrderID: ${configuration.id}`);

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId: user.id,
        configurationId: configuration.id,
      },
    });
  }
  try {
    // Create a Stripe product and checkout session
    const product = await stripe.products.create({
      name: "Custom iPhone Case",
      images: [configuration.imageUrl],
      default_price_data: {
        currency: "USD",
        unit_amount: price,
      },
    });

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
      payment_method_types: ["card", "paypal"],
      mode: "payment",
      shipping_address_collection: { allowed_countries: ["DE", "US"] },
      metadata: {
        userId: user.id,
        orderId: order.id,
      },
      line_items: [{ price: product.default_price as string, quantity: 1 }],
    });

    // Return Stripe checkout session url
    return { url: stripeSession.url, status: 200 };
  } catch (error) {
    console.error(error);
    return {
      url: null,
      status: (error as any).statusCode || 500,
    };
  }
};
