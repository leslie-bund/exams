PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`image` text DEFAULT '',
	`hashed_password` text NOT NULL,
	`name` text
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "email", "image", "hashed_password", "name") SELECT "id", "email", "image", "hashed_password", "name" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);