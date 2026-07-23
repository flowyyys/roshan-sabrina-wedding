CREATE TABLE `rsvps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`invitation` text NOT NULL,
	`name` text NOT NULL,
	`phone` text,
	`attendance` text NOT NULL,
	`guests` integer DEFAULT 1 NOT NULL,
	`meal` text,
	`message` text,
	`created_at` text NOT NULL
);
