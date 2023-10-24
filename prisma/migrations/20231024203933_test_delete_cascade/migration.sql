-- DropForeignKey
ALTER TABLE `Artist` DROP FOREIGN KEY `Artist_userid_fkey`;

-- AddForeignKey
ALTER TABLE `Artist` ADD CONSTRAINT `Artist_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
