import { TransactionType } from "@prisma/client";
import db from "./lib/prisma";

async function main() {
  const userId = "cm76jmf6000009r6wu4kp5y2r";

  // Mendeklarasikan transactionTypes dengan tipe TransactionType[]
  const transactionTypes: TransactionType[] = [
    TransactionType.INCOME,
    TransactionType.EXPENSE,
  ];
  const categories = [
    "Food",
    "Transport",
    "Utilities",
    "Salary",
    "Entertainment",
    null,
  ];
  const descriptions = [
    "Transaksi uji coba",
    "Dummy transaction",
    "Contoh transaksi",
    "Test transaction",
  ];

  const transactions = [];

  for (let i = 0; i < 100; i++) {
    // Pilih secara acak jenis transaksi, sekarang nilainya sudah bertipe TransactionType
    const type =
      transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    // Hasilkan nilai amount antara 10.00 dan 1000.00 dengan 2 desimal
    const amount = (Math.random() * (1000 - 10) + 10).toFixed(2);
    // Hasilkan tanggal transaksi acak dalam 365 hari terakhir
    const transactionDate = new Date(
      Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
    );
    // Pilih salah satu deskripsi secara acak (dimasukkan sebagai array string)
    const description = [
      descriptions[Math.floor(Math.random() * descriptions.length)],
    ];
    // Pilih kategori secara acak (bisa null)
    const category = categories[Math.floor(Math.random() * categories.length)];

    transactions.push({
      type,
      amount,
      transactionDate,
      description,
      category,
      userId,
    });
  }

  // Menggunakan createMany untuk memasukkan data secara massal
  await db.transaction.createMany({
    data: transactions,
    skipDuplicates: true,
  });

  console.log("Seeder: 100 transaksi berhasil ditambahkan!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
