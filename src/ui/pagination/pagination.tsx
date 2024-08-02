import { Button } from "../button/button";

interface PaginationProps {
  setCurrentPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ setCurrentPage, currentPage, totalPages }: PaginationProps) => {
  const pages = [];

  pages.push(
    <Button key={1} onClick={() => setCurrentPage(1)} active={currentPage === 1}>
      1
    </Button>
  );

  if (currentPage > 3) {
    pages.push(<span key="dots1"> ... </span>);
  }

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  for (let i = startPage; i <= endPage; i++) {
    if (i > 1 && i < totalPages) {
      pages.push(
        <Button key={i} onClick={() => setCurrentPage(i)} active={currentPage === i}>
          {i}
        </Button>
      );
    }
  }

  if (currentPage < totalPages - 2) {
    pages.push(<span key="dots2"> ... </span>);
  }

  if (totalPages !== 1) {
    pages.push(
      <Button
        key={totalPages}
        onClick={() => setCurrentPage(totalPages)}
        active={currentPage === totalPages}
      >
        {totalPages}
      </Button>
    );
  }

  return pages;
}