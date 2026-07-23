import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const rsvps = sqliteTable("rsvps", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  invitation: text("invitation").notNull(),
  name: text("name").notNull(),
  phone: text("phone"),
  attendance: text("attendance").notNull(),
  guests: integer("guests").notNull().default(1),
  meal: text("meal"),
  message: text("message"),
  createdAt: text("created_at").notNull(),
});
