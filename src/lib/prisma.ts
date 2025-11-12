import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";

import ws from "ws";
neonConfig.webSocketConstructor = ws;

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
neonConfig.poolQueryViaFetch = true;

declare global {
  var prisma: PrismaClient | undefined;
}

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaNeon({ connectionString });
const options = process.env.NEXT_RUNTIME === "edge" ? { adapter } : undefined;
const prisma = global.prisma || new PrismaClient(options);

if (process.env.NEXT_RUNTIME !== "edge") global.prisma = prisma;

export default prisma;
