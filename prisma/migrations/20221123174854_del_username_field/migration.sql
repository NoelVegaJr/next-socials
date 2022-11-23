/*
  Warnings:

  - You are about to drop the column `username` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Post_username_key` ON `Post`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `username`;
