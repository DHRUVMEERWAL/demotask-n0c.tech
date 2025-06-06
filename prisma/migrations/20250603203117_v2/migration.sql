/*
  Warnings:

  - The primary key for the `ProcessedSensorData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RawSensorData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `ProcessedSensorData` DROP FOREIGN KEY `ProcessedSensorData_userId_fkey`;

-- DropForeignKey
ALTER TABLE `RawSensorData` DROP FOREIGN KEY `RawSensorData_userId_fkey`;

-- DropIndex
DROP INDEX `ProcessedSensorData_userId_fkey` ON `ProcessedSensorData`;

-- DropIndex
DROP INDEX `RawSensorData_userId_fkey` ON `RawSensorData`;

-- AlterTable
ALTER TABLE `ProcessedSensorData` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `RawSensorData` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `RawSensorData` ADD CONSTRAINT `RawSensorData_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProcessedSensorData` ADD CONSTRAINT `ProcessedSensorData_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
