import { PrismaClient } from "@prisma/client";

// -----------------------------------------------------------------------------
// declare global variable to cache PrismaClient (used for development environment)
declare global {
  var cachedPrisma: PrismaClient;
}

// -----------------------------------------------------------------------------
let prisma: PrismaClient;

// -----------------------------------------------------------------------------
// Instantiate Prisma Client
if (process.env.NODE_ENV === "production") {
  // In production always instantiate
  prisma = new PrismaClient();
} else {
  // in development, first check if cachedPrisma doesn't exist, create it and cache it
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }

  // then set 'cachedPrisma' to the 'prisma'
  prisma = global.cachedPrisma;
}

// Export prisma client as db
export const db = prisma;
