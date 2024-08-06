
--> statement-breakpoint
CREATE TABLE `repository` (
	`name` text PRIMARY KEY NOT NULL,
	`github_id` integer NOT NULL,
	`topics` text
);
--> statement-breakpoint
CREATE TABLE `topics2` (
	`name` text PRIMARY KEY NOT NULL,
	`vector` F32_BLOB(768)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `repository_name_unique` ON `repository` (`name`);

CREATE TABLE `repository_topic` (
                                    `repository` text,
                                    `topic` text,
                                    FOREIGN KEY (`repository`) REFERENCES `repository`(`name`) ON UPDATE no action ON DELETE no action,
                                    FOREIGN KEY (`topic`) REFERENCES `topics`(`name`) ON UPDATE no action ON DELETE no action
);