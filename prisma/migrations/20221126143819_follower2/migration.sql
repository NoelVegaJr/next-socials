-- AddForeignKey
ALTER TABLE `Follower` ADD CONSTRAINT `Follower_followingUserId_fkey` FOREIGN KEY (`followingUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
