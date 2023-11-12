/*
  Warnings:

  - You are about to drop the `album` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_registrations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `photo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_rating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "album" DROP CONSTRAINT "album_eventId_fkey";

-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_eventId_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_organizerId_fkey";

-- DropForeignKey
ALTER TABLE "event_rating" DROP CONSTRAINT "event_rating_eventId_fkey";

-- DropForeignKey
ALTER TABLE "event_rating" DROP CONSTRAINT "event_rating_userId_fkey";

-- DropForeignKey
ALTER TABLE "event_registrations" DROP CONSTRAINT "event_registrations_eventId_fkey";

-- DropForeignKey
ALTER TABLE "event_registrations" DROP CONSTRAINT "event_registrations_userId_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_eventId_fkey";

-- DropForeignKey
ALTER TABLE "photo" DROP CONSTRAINT "photo_albumId_fkey";

-- DropForeignKey
ALTER TABLE "photo" DROP CONSTRAINT "photo_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_rating" DROP CONSTRAINT "user_rating_ratedId_fkey";

-- DropForeignKey
ALTER TABLE "user_rating" DROP CONSTRAINT "user_rating_raterId_fkey";

-- DropTable
DROP TABLE "album";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "chat";

-- DropTable
DROP TABLE "event";

-- DropTable
DROP TABLE "event_rating";

-- DropTable
DROP TABLE "event_registrations";

-- DropTable
DROP TABLE "message";

-- DropTable
DROP TABLE "notification";

-- DropTable
DROP TABLE "photo";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "user_rating";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "surname" TEXT,
    "bday" DATE NOT NULL,
    "email" TEXT NOT NULL,
    "isAdmin" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "maxGuestAmount" INTEGER,
    "isPublic" BOOLEAN DEFAULT false,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "organizerId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events_rating" (
    "id" SERIAL NOT NULL,
    "message" TEXT,
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "eventId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "events_rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_rating" (
    "id" SERIAL NOT NULL,
    "message" TEXT,
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "raterId" INTEGER NOT NULL,
    "ratedId" INTEGER NOT NULL,

    CONSTRAINT "users_rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events_registrations" (
    "id" SERIAL NOT NULL,
    "guestAmount" INTEGER NOT NULL DEFAULT 0,
    "eventId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "events_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "chat" INTEGER NOT NULL,
    "user" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chats" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "albums" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" SERIAL NOT NULL,
    "photo" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "albumId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_rating" ADD CONSTRAINT "events_rating_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_rating" ADD CONSTRAINT "events_rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_rating" ADD CONSTRAINT "users_rating_raterId_fkey" FOREIGN KEY ("raterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_rating" ADD CONSTRAINT "users_rating_ratedId_fkey" FOREIGN KEY ("ratedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_registrations" ADD CONSTRAINT "events_registrations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_registrations" ADD CONSTRAINT "events_registrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
