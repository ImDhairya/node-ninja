CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" text,
	"authorId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admin" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firstName" varchar(55) NOT NULL,
	"lastName" varchar(55) NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_authorId_admin_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."admin"("id") ON DELETE no action ON UPDATE no action;