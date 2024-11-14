CREATE TABLE IF NOT EXISTS "Users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"password" text
);
--> statement-breakpoint
DROP TABLE "dinosaurs" CASCADE;--> statement-breakpoint
DROP TABLE "tasks" CASCADE;