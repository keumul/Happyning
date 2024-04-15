/*
  Warnings:

  - You are about to drop the column `subCategoryId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `cities` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `countries` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cityName` to the `cities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `cities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryName` to the `countries` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `photo` on the `photos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `isConfirmed` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `users_rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_countryId_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_subCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "countries" DROP CONSTRAINT "countries_cityId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_locationId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "subCategoryId",
ADD COLUMN     "parentId" INTEGER;

-- AlterTable
ALTER TABLE "cities" DROP COLUMN "city",
ADD COLUMN     "cityName" TEXT NOT NULL,
ADD COLUMN     "countryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "countries" DROP COLUMN "cityId",
ADD COLUMN     "countryName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "photos" DROP COLUMN "photo",
ADD COLUMN     "photo" BYTEA NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "isAdmin",
ADD COLUMN     "activationCode" TEXT,
ADD COLUMN     "isConfirmed" BOOLEAN NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users_rating" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "sub_categories";

-- CreateTable
CREATE TABLE "confirmations" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "confirmValue" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "confirmations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preferences" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preference_categories" (
    "id" SERIAL NOT NULL,
    "preferenceId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "preference_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preference_formats" (
    "id" SERIAL NOT NULL,
    "preferenceId" INTEGER NOT NULL,
    "formatId" INTEGER NOT NULL,

    CONSTRAINT "preference_formats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageComplaint" (
    "id" SERIAL NOT NULL,
    "messageId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "MessageComplaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventComplaint" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "EventComplaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaints_categories" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "complaints_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "details" TEXT,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "confirmations" ADD CONSTRAINT "confirmations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preferences" ADD CONSTRAINT "preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preference_categories" ADD CONSTRAINT "preference_categories_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "preferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preference_categories" ADD CONSTRAINT "preference_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preference_formats" ADD CONSTRAINT "preference_formats_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "preferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preference_formats" ADD CONSTRAINT "preference_formats_formatId_fkey" FOREIGN KEY ("formatId") REFERENCES "formats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_rating" ADD CONSTRAINT "users_rating_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageComplaint" ADD CONSTRAINT "MessageComplaint_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageComplaint" ADD CONSTRAINT "MessageComplaint_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "complaints_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventComplaint" ADD CONSTRAINT "EventComplaint_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventComplaint" ADD CONSTRAINT "EventComplaint_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "complaints_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
