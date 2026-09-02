import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const contacts = sqliteTable(
  "contacts",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    kind: text("kind", { enum: ["early_access", "newsletter"] }).notNull(),
    name: text("name"),
    contact: text("contact").notNull(),
    device: text("device"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("contacts_kind_contact_unique").on(table.kind, table.contact),
  ],
);

export const pageViews = sqliteTable(
  "page_views",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    day: text("day").notNull(),
    path: text("path").notNull(),
    views: integer("views").notNull().default(0),
  },
  (table) => [uniqueIndex("page_views_day_path_unique").on(table.day, table.path)],
);

export const teamRequests = sqliteTable("team_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  company: text("company").notNull(),
  contact: text("contact").notNull(),
  roles: text("roles").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const businessRequests = sqliteTable("business_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  company: text("company").notNull(),
  telegram: text("telegram"),
  phone: text("phone"),
  email: text("email"),
  service: text("service").notNull(),
  socialCount: text("social_count"),
  hasCrm: text("has_crm"),
  task: text("task").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const vpnPilotRequests = sqliteTable("vpn_pilot_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  telegram: text("telegram").notNull(),
  email: text("email").notNull(),
  clientType: text("client_type").notNull(),
  devices: integer("devices").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
