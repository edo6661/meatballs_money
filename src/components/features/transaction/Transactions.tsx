import { getTransactionsInfiniteScrollAndFilter } from "@/server/queries/transactions_query";
import React from "react";
import FilterTransactions from "./FilterTransactions";
import { FilterByDate, TransactionTypeWithAll, TransactionView } from "@/types/transaction_type";
import PaginationTransaction from "./PaginationTransaction";
import TransactionTableItem from "./TransactionTableItem";
import TransactionGridItem from "./TransactionGridItem";



const Transactions = async (
  { page, take, type, filter, view }: { page: number, take: number, type: TransactionTypeWithAll, filter: FilterByDate, view: TransactionView }
) => {
  const result = await getTransactionsInfiniteScrollAndFilter(
    take,
    page,
    filter,
    type
  );

  if (!result.success) return <div>{result.message}</div>;
  if (result.data?.length === 0 || !result.data) return <div>No transactions found</div>;


  const onlyHasOnePage = result.totalPage == 1 && result.hasNextPage == false && result.hasPrevPage == false;

  return (
    <div className="container space-y-12">
      <FilterTransactions
        type={type}
        filter={filter}
        view={view}
      />
      <div className="flex flex-wrap items-stretch gap-8 justify-center">

        {result.data?.map((transaction) => (
          view === TransactionView.GRID && <TransactionGridItem key={transaction.id} {...transaction} />
        ))}
        {view === TransactionView.TABLE && <TransactionTableItem transactions={result.data} />}


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