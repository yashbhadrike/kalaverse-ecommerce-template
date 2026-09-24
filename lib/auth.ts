import { betterAuth } from "better-auth"
import { Pool } from "pg"

const origin = (value?: string) => value ? (value.startsWith("http") ? value : `https://${value}`) : undefined
const baseURL = origin(process.env.BETTER_AUTH_URL) || origin(process.env.VERCEL_PROJECT_PRODUCTION_URL) || origin(process.env.VERCEL_URL) || process.env.V0_RUNTIME_URL || "http://localhost:3000"
const trustedOrigins = [
  "http://localhost:3000",
  baseURL,
  origin(process.env.BETTER_AUTH_URL),
  origin(process.env.VERCEL_PROJECT_PRODUCTION_URL),
  origin(process.env.VERCEL_URL),
  origin(process.env.VERCEL_BRANCH_URL),
  process.env.V0_RUNTIME_URL,
  process.env.V0_DEV_APP_URL,
  process.env.V0_BUILD_URL,
  process.env.V0_SANDBOX_URL,
].filter(Boolean) as string[]

const database = new Pool({
  connectionString: process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL,
  options: "-c search_path=neon_auth,public",
})

export const auth = betterAuth({
  database,
  baseURL,
  trustedOrigins,
  emailAndPassword: { enabled: true },
  advanced: {
    database: { generateId: "uuid" },
    ...(process.env.NODE_ENV === "development" ? { defaultCookieAttributes: { sameSite: "none" as const, secure: true } } : {}),
  },
  // Neon provisions Better Auth in the neon_auth schema using Better Auth's
  // default camelCase column names. The search_path above selects those tables.
})
