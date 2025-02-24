"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationTransactionProps = {
  totalPage: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export default function PaginationTransaction({
  totalPage,
  currentPage,
  hasNextPage,
  hasPrevPage,
}: PaginationTransactionProps) {
  // Fungsi untuk mendapatkan nomor halaman yang akan ditampilkan
  const getPageNumbers = (current: number, total: number) => {
    const pages: (number | "ellipsis")[] = [];

    if (total <= 5) {
      // Tampilkan semua halaman jika total halaman ≤ 5
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Tampilkan halaman pertama
      pages.push(1);

      // Jika current > 3, tampilkan ellipsis
      if (current > 3) {
        pages.push("ellipsis");
      }

      // Tentukan range halaman di tengah
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Jika current < total - 2, tampilkan ellipsis
      if (current < total - 2) {
        pages.push("ellipsis");
      }

      // Tampilkan halaman terakhir
      pages.push(total);
    }

    return pages;
  };

  const disabledStlye = (isDisabled: boolean) => {
    return isDisabled ? "cursor-not-allowed" : "cursor-pointer";
  }



  const pageNumbers = getPageNumbers(currentPage, totalPage);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handlePage(page: string) {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set("page", page);
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${disabledStlye(!hasPrevPage)}`}
            onClick={() => {
              if (hasPrevPage) {
                handlePage(String(currentPage - 1));
              }

            }}
          />
        </PaginationItem>

        {pageNumbers.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          } else {
            return (
              <PaginationItem key={`page-${item}`}>
                <PaginationLink
                  onClick={() => handlePage(String(item))}
                  isActive={item === currentPage}
                  className={`${disabledStlye(item === currentPage)}`}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}

        <PaginationItem>
          <PaginationNext
            className={`${disabledStlye(!hasNextPage)}`}
            onClick={() => {
              if (hasNextPage) {
                handlePage(String(currentPage + 1));
              }
            }}

          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
