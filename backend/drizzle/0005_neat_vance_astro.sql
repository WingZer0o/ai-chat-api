ALTER TABLE "ChatChannels" ADD COLUMN "userId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ChatChannels" ADD CONSTRAINT "ChatChannels_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
