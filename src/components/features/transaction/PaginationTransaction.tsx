import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

  const pageNumbers = getPageNumbers(currentPage, totalPage);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {hasPrevPage ? (
            <PaginationPrevious href={`?page=${currentPage - 1}`} />
          ) : (
            <PaginationPrevious href="#"

            />
          )}
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
                  href={`?page=${item}`}
                  isActive={item === currentPage}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}

        <PaginationItem>
          {hasNextPage ? (
            <PaginationNext href={`?page=${currentPage + 1}`} />
          ) : (
            <PaginationNext href="#" disabled />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
