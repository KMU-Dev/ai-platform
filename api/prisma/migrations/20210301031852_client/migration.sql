/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OAuthGrantType" AS ENUM ('AUTHORIZATION_CODE_GRANT', 'IMPLICIT_GRANT', 'CLIENT_CREDENTIALS_GRANT', 'RESOURCE_OWNER_PASSWORD_CREDENTIALS_GRANT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Client" (
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientUri" TEXT NOT NULL,
    "audience" TEXT[],
    "grantTypes" "OAuthGrantType"[],
    "redirectUris" TEXT[],
    "scope" TEXT NOT NULL,
    "ownerId" TEXT,
    "orgId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("clientId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client.clientName_unique" ON "Client"("clientName");

-- AddForeignKey
ALTER TABLE "Client" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
