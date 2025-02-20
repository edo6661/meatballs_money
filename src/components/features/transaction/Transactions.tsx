import { getTransactions } from "@/server/queries/transactions_query";
import React from "react";
import BtnActionTransaction from "./BtnActionTransaction";

const Transactions = async () => {
  const result = await getTransactions();
  if (!result.success) {
    return <div>{result.message}</div>
  }
  if (result.data?.length === 0) {
    return <div>No transactions found</div>
  }
  return <div className="flex flex-wrap gap-24 items-start justify-center">
    {result.data?.map((transaction, index) => {
      return <div key={index}

      >
        <div>Amount: {transaction.amount.toString()}</div>
        {transaction.category && <div>Category: {transaction.category}</div>}
        <div>Type: {transaction.type}</div>
        <div>
          Description:
          {transaction.description.map((desc, i) =>
            <p key={i}>
              {desc}
            </p>
          )}
        </div>
        <div>
          transaction date: {
            new Date(transaction.transactionDate).toLocaleString()
          }
        </div>
        <div>
          createdAt: {
            new Date(transaction.createdAt).toLocaleString()
          }
        </div>

        <div>
          updatedAt: {
            new Date(transaction.updatedAt).toLocaleString()
          }
        </div>

        <BtnActionTransaction
          id={transaction.id}
        />

      </div>
    }
    )}
  </div>
};

export default Transactions;
