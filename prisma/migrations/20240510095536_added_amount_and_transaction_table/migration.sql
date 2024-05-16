-- CreateTable
CREATE TABLE "Amount" (
    "id" TEXT NOT NULL,
    "total_amount" TEXT NOT NULL,

    CONSTRAINT "Amount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "total_amount" TEXT NOT NULL,
    "credit" TEXT NOT NULL,
    "debit" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Amount" ADD CONSTRAINT "Amount_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_id_fkey" FOREIGN KEY ("id") REFERENCES "Amount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
