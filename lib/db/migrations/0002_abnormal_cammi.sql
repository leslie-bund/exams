CREATE TABLE `attempt_table` (
	`id` text PRIMARY KEY NOT NULL,
	`challenge_code` text NOT NULL,
	`challenge_list` text NOT NULL,
	`user_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `score` (
	`id` text PRIMARY KEY NOT NULL,
	`score` integer NOT NULL,
	`user_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
