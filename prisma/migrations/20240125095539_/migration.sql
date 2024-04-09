/*
  Warnings:

  - You are about to drop the column `location` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `albumId` on the `photos` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `photos` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `photos` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `albums` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `events_rating` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subCategoryId` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formatId` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `events` table without a default value. This is not possible if the table is not empty.
  - Made the column `isPublic` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `latency` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `photos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "albums" DROP CONSTRAINT "albums_eventId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_organizerId_fkey";

-- DropForeignKey
ALTER TABLE "events_rating" DROP CONSTRAINT "events_rating_eventId_fkey";

-- DropForeignKey
ALTER TABLE "events_rating" DROP CONSTRAINT "events_rating_userId_fkey";

-- DropForeignKey
ALTER TABLE "events_registrations" DROP CONSTRAINT "events_registrations_eventId_fkey";

-- DropForeignKey
ALTER TABLE "events_registrations" DROP CONSTRAINT "events_registrations_userId_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_eventId_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_userId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_eventId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_userId_fkey";

-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_albumId_fkey";

-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_userId_fkey";

-- DropForeignKey
ALTER TABLE "users_rating" DROP CONSTRAINT "users_rating_ratedId_fkey";

-- DropForeignKey
ALTER TABLE "users_rating" DROP CONSTRAINT "users_rating_raterId_fkey";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "subCategoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "location",
DROP COLUMN "updateAt",
ADD COLUMN     "ageLimit" INTEGER,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "formatId" INTEGER NOT NULL,
ADD COLUMN     "locationId" INTEGER NOT NULL,
ADD COLUMN     "secretCode" TEXT,
ALTER COLUMN "isPublic" SET NOT NULL,
ALTER COLUMN "isPublic" DROP DEFAULT;

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "updateAt",
ADD COLUMN     "latency" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "updateAt";

-- AlterTable
ALTER TABLE "photos" DROP COLUMN "albumId",
DROP COLUMN "updateAt",
DROP COLUMN "userId",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "eventId" INTEGER NOT NULL,
ALTER COLUMN "photo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "surname",
DROP COLUMN "updateAt";

-- DropTable
DROP TABLE "albums";

-- DropTable
DROP TABLE "events_rating";

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "details" TEXT,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_categories" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "sub_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "formats" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "formats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_formatId_fkey" FOREIGN KEY ("formatId") REFERENCES "formats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_rating" ADD CONSTRAINT "users_rating_raterId_fkey" FOREIGN KEY ("raterId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_rating" ADD CONSTRAINT "users_rating_ratedId_fkey" FOREIGN KEY ("ratedId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_registrations" ADD CONSTRAINT "events_registrations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_registrations" ADD CONSTRAINT "events_registrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "sub_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "countries" ADD CONSTRAINT "countries_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
