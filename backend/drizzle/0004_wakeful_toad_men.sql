CREATE TABLE IF NOT EXISTS "ChatChannels" (
	"id" serial PRIMARY KEY NOT NULL,
	"channelName" text NOT NULL,
	"createdAt" integer DEFAULT extract(epoch from now()) NOT NULL,
	"modifiedAt" integer DEFAULT extract(epoch from now()) NOT NULL
);
