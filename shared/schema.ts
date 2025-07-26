import { sql } from "drizzle-orm";
import { 
  pgTable, 
  text, 
  varchar, 
  timestamp, 
  jsonb, 
  pgEnum, 
  boolean,
  integer,
  index
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Language enum
export const languageEnum = pgEnum("language", ["en", "ko", "ja", "es"]);
export type Language = "en" | "ko" | "ja" | "es";

// Status enum  
export const statusEnum = pgEnum("status", ["draft", "published", "archived"]);

// Role enum
export const roleEnum = pgEnum("role", ["user", "admin", "super_admin"]);

// User storage table.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique(),
  role: roleEnum("role").default("user"),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  isActive: boolean("is_active").default(true),
  site: varchar("site").default("marinebiogroup"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact table
export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  inquiryType: varchar("inquiry_type", { length: 50 }).notNull(),
  message: text("message").notNull(),
  language: languageEnum("language").default("en"),
  site: varchar("site").default("marinebiogroup"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Newsletter table
export const newsletters = pgTable("newsletters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email", { length: 255 }).notNull(),
  language: languageEnum("language").default("en"),
  site: varchar("site").default("marinebiogroup"),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
});

// Blog posts table
export const blog_posts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }),
  imageUrl: varchar("image_url", { length: 500 }),
  language: languageEnum("language").default("en"),
  status: statusEnum("status").default("published"),
  authorId: varchar("author_id"),
  site: varchar("site").default("marinebiogroup"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// News table
export const news = pgTable("news", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }),
  imageUrl: varchar("image_url", { length: 500 }),
  language: languageEnum("language").default("en"),
  status: statusEnum("status").default("published"),
  authorId: varchar("author_id"),
  site: varchar("site").default("marinebiogroup"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Gallery table
export const gallery = pgTable("gallery", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  thumbnailUrl: varchar("thumbnail_url", { length: 500 }),
  category: varchar("category", { length: 100 }),
  tags: jsonb("tags"),
  language: languageEnum("language").default("en"),
  status: statusEnum("status").default("published"),
  authorId: varchar("author_id"),
  site: varchar("site").default("marinebiogroup"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Products table
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  shortDescription: varchar("short_description", { length: 500 }),
  price: integer("price"), // Price in cents
  imageUrl: varchar("image_url", { length: 500 }),
  images: jsonb("images"), // Array of image URLs
  category: varchar("category", { length: 100 }),
  tags: jsonb("tags"), // Array of tags
  language: languageEnum("language").default("en"),
  status: statusEnum("status").default("published"),
  stock: integer("stock").default(0),
  sku: varchar("sku", { length: 100 }),
  weight: integer("weight"), // Weight in grams
  dimensions: jsonb("dimensions"), // {length, width, height}
  site: varchar("site").default("marinebiogroup"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Admin sessions table
export const admin_sessions = pgTable("admin_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  adminId: varchar("admin_id").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  site: varchar("site").default("marinebiogroup"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Carousel table - 메인 화면 캐러셀을 위한 테이블
export const carousel = pgTable("carousel", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 500 }),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  linkUrl: varchar("link_url", { length: 500 }),
  buttonText: varchar("button_text", { length: 100 }),
  order: integer("order").default(0),
  isActive: boolean("is_active").default(true),
  language: languageEnum("language").default("en"),
  site: varchar("site").default("marinebiogroup"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

export type Newsletter = typeof newsletters.$inferSelect;
export type InsertNewsletter = typeof newsletters.$inferInsert;

export type BlogPost = typeof blog_posts.$inferSelect;
export type InsertBlogPost = typeof blog_posts.$inferInsert;

export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;

export type Gallery = typeof gallery.$inferSelect;
export type InsertGallery = typeof gallery.$inferInsert;

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

export type AdminSession = typeof admin_sessions.$inferSelect;
export type InsertAdminSession = typeof admin_sessions.$inferInsert;

export type Carousel = typeof carousel.$inferSelect;
export type InsertCarousel = typeof carousel.$inferInsert;

// Legacy compatibility - keep for Replit Auth
export type UpsertUser = typeof users.$inferInsert;

// Schema exports for form validation
export const insertContactSchema = createInsertSchema(contacts);
export const insertNewsletterSchema = createInsertSchema(newsletters);
export const insertBlogPostSchema = createInsertSchema(blog_posts);
export const insertNewsSchema = createInsertSchema(news);
export const insertGallerySchema = createInsertSchema(gallery);
export const insertProductSchema = createInsertSchema(products);
export const insertCarouselSchema = createInsertSchema(carousel);

// Admin login schema
export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type AdminLoginType = z.infer<typeof adminLoginSchema>;