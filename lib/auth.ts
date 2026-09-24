import { betterAuth } from "better-auth"
import { Pool } from "pg"

const origin = (value?: string) => value ? (value.startsWith("http") ? value : `https://${value}`) : undefined
const baseURL = origin(process.env.BETTER_AUTH_URL) || origin(process.env.VERCEL_PROJECT_PRODUCTION_URL) || origin(process.env.VERCEL_URL) || process.env.V0_RUNTIME_URL || "http://localhost:3000"
const trustedOrigins = ["http://localhost:3000", baseURL, process.env.V0_RUNTIME_URL, process.env.V0_DEV_APP_URL, process.env.V0_BUILD_URL, process.env.V0_SANDBOX_URL].filter(Boolean) as string[]

export const auth = betterAuth({
  database: new Pool({ connectionString: process.env.DATABASE_URL }),
  baseURL,
  trustedOrigins,
  emailAndPassword: { enabled: true },
  user: { modelName: "user", fields: { emailVerified: "email_verified", createdAt: "created_at", updatedAt: "updated_at" } },
  session: { modelName: "session", fields: { expiresAt: "expires_at", createdAt: "created_at", updatedAt: "updated_at", userId: "user_id", ipAddress: "ip_address", userAgent: "user_agent" } },
  account: { modelName: "account", fields: { accountId: "account_id", providerId: "provider_id", userId: "user_id", accessToken: "access_token", refreshToken: "refresh_token", idToken: "id_token", accessTokenExpiresAt: "access_token_expires_at", refreshTokenExpiresAt: "refresh_token_expires_at", createdAt: "created_at", updatedAt: "updated_at" } },
  verification: { modelName: "verification", fields: { expiresAt: "expires_at", createdAt: "created_at", updatedAt: "updated_at" } },
  ...(process.env.NODE_ENV === "development" ? { advanced: { defaultCookieAttributes: { sameSite: "none" as const, secure: true } } } : {}),
})
