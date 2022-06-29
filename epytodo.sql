DROP DATABASE `epytodo`;

CREATE DATABASE IF NOT EXISTS `epytodo`;

USE `epytodo`;

CREATE TABLE IF NOT EXISTS `user` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `firstname` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `todo` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` DATETIME NOT NULL DEFAUlT CURRENT_TIMESTAMP,
    `due_time` DATETIME NOT NULL,
    `status` VARCHAR(15) DEFAULT 'not started',
    `user_id` INT UNSIGNED NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `epytodo`.`user`(`id`) ON DELETE CASCADE,
    PRIMARY KEY (`id`),
    CONSTRAINT status_constraint CHECK (`status` IN ('not started', 'todo', 'in progress', 'done'))
);
