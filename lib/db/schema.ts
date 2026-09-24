import { boolean, integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull(),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull(),
  accessToken: text("access_token"), refreshToken: text("refresh_token"), idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
  scope: text("scope"), password: text("password"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(), identifier: text("identifier").notNull(), value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export const products = pgTable("kv_products", {
  id: text("id").primaryKey(), title: text("title").notNull(), slug: text("slug").notNull().unique(),
  price: integer("price").notNull().default(0), description: text("description").notNull().default(""),
  shortDescription: text("short_description").notNull().default(""), occasion: text("occasion").notNull(),
  thumbnail: text("thumbnail").notNull().default(""), images: jsonb("images").$type<string[]>().notNull().default([]),
  videos: jsonb("videos").$type<unknown[]>().notNull().default([]), features: jsonb("features").$type<string[]>().notNull().default([]),
  designDetails: jsonb("design_details").$type<unknown[]>().notNull().default([]), showcase: jsonb("showcase").$type<unknown[]>().notNull().default([]),
  format: text("format").notNull().default("Animated"), status: text("status").notNull().default("draft"), featured: boolean("featured").notNull().default(false),
  displayOrder: integer("display_order").notNull().default(0), seoTitle: text("seo_title").notNull().default(""), seoDescription: text("seo_description").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export const occasions = pgTable("kv_occasions", {
  id: text("id").primaryKey(), name: text("name").notNull(), slug: text("slug").notNull().unique(), icon: text("icon").notNull().default("Sparkles"), description: text("description").notNull().default(""), displayOrder: integer("display_order").notNull().default(0), active: boolean("active").notNull().default(true),
})

export const content = pgTable("kv_content", { key: text("key").primaryKey(), value: jsonb("value").$type<Record<string, unknown>>().notNull().default({}), updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow() })

export const schema = { user, session, account, verification, products, occasions, content }
export type ProductRow = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
export type OccasionRow = typeof occasions.$inferSelect
export type ContentRow = typeof content.$inferSelect
export default schema
