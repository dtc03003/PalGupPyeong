import * as S from "./Pagination.styles";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: PaginationProps) => {
  const getPages = () => {
    const pages: (number | string)[] = [];

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    for (let i = page - 1; i <= page + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return [...new Set(pages)];
  };

  return (
    <S.Pagination>
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
      >
        이전
      </button>

      {getPages().map((p, idx) =>
        p === "..." ? (
          <span key={idx}>...</span>
        ) : (
          <button
            key={idx}
            onClick={() => setPage(Number(p))}
            disabled={page === p}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
      >
        다음
      </button>
    </S.Pagination>
  );
};

export default Pagination;
