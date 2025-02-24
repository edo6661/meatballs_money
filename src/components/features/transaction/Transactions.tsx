import { getTransactionsInfiniteScrollAndFilter } from "@/server/queries/transactions_query";
import React from "react";
import FilterTransactions from "./FilterTransactions";
import TransactionItem from "./TransactionItem";
import { TransactionType } from "@prisma/client";
import { FilterByDate } from "@/types/transaction_type";
import PaginationTransaction from "./PaginationTransaction";



const Transactions = async (
  { page, take, type, filter }: { page: number, take: number, type: TransactionType | null, filter: FilterByDate }
) => {
  const result = await getTransactionsInfiniteScrollAndFilter(
    take,
    page,
    filter,
    type
  );

  if (!result.success) return <div>{result.message}</div>;
  if (result.data?.length === 0) return <div>No transactions found</div>;


  const onlyHasOnePage = result.totalPage == 1 && result.hasNextPage == false && result.hasPrevPage == false;

  return (
    <div className="container space-y-12">
      <FilterTransactions
        page={page}
      />
      <div className="flex flex-wrap items-stretch gap-8 justify-center">
        {result.data?.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            {...transaction}
          />
        )
        )}
      </div>
      {!onlyHasOnePage && (
        <PaginationTransaction
          totalPage={result.totalPage}
          hasNextPage={result.hasNextPage}
          hasPrevPage={result.hasPrevPage}
          currentPage={page}
        />
      )}
    </div>
  );
};

export default Transactions;