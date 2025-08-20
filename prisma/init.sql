diff --git a/prisma/init.sql b/prisma/init.sql
index b08bd5097b60f70bcb1bcfdcca21d6a745e79773..3e8081d282b300b63ac0ef512744896dbd279bc7 100644
--- a/prisma/init.sql
+++ b/prisma/init.sql
@@ -1,62 +1,68 @@
 -- CreateSchema
 CREATE SCHEMA IF NOT EXISTS "public";
 
 -- CreateEnum
 CREATE TYPE "public"."DealStage" AS ENUM ('LEAD', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST');
 
 -- CreateTable
 CREATE TABLE "public"."Client" (
     "id" TEXT NOT NULL,
     "name" TEXT NOT NULL,
     "email" TEXT,
     "phone" TEXT,
+    "address" TEXT,
+    "birthday" TIMESTAMP(3),
     "stage" "public"."DealStage" NOT NULL,
     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
     "updatedAt" TIMESTAMP(3) NOT NULL,
 
     CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
 );
 
 -- CreateTable
 CREATE TABLE "public"."Project" (
     "id" TEXT NOT NULL,
     "clientId" TEXT NOT NULL,
     "name" TEXT NOT NULL,
     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
     "updatedAt" TIMESTAMP(3) NOT NULL,
 
     CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
 );
 
 -- CreateTable
 CREATE TABLE "public"."Task" (
     "id" TEXT NOT NULL,
     "projectId" TEXT NOT NULL,
     "title" TEXT NOT NULL,
     "done" BOOLEAN NOT NULL DEFAULT false,
     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
     "updatedAt" TIMESTAMP(3) NOT NULL,
 
     CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
 );
 
 -- CreateTable
 CREATE TABLE "public"."Note" (
     "id" TEXT NOT NULL,
     "clientId" TEXT NOT NULL,
     "body" TEXT NOT NULL,
+    "projectId" TEXT,
     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
     "updatedAt" TIMESTAMP(3) NOT NULL,
 
     CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
 );
 
 -- AddForeignKey
 ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
 
 -- AddForeignKey
 ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
 
 -- AddForeignKey
 ALTER TABLE "public"."Note" ADD CONSTRAINT "Note_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
 
+-- AddForeignKey
+ALTER TABLE "public"."Note" ADD CONSTRAINT "Note_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
+
