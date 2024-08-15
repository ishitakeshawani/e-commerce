-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserSelectedCategories" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserSelectedCategories_AB_unique" ON "_UserSelectedCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSelectedCategories_B_index" ON "_UserSelectedCategories"("B");

-- AddForeignKey
ALTER TABLE "_UserSelectedCategories" ADD CONSTRAINT "_UserSelectedCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSelectedCategories" ADD CONSTRAINT "_UserSelectedCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
