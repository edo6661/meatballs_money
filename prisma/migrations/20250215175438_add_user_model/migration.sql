-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "username" STRING,
    "image" STRING,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
