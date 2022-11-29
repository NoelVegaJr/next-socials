/*
  Warnings:

  - Added the required column `dateCreated` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Conversation` ADD COLUMN `dateCreated` DATETIME(3) NOT NULL;
