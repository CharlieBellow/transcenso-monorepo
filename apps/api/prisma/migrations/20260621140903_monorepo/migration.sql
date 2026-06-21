/*
  Warnings:

  - You are about to drop the column `name` on the `people` table. All the data in the column will be lost.
  - Added the required column `civilName` to the `people` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "people" DROP COLUMN "name",
ADD COLUMN     "civilName" TEXT NOT NULL;
