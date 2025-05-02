import * as S from "./Pagination.styles";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLastPage: boolean;
}

const Pagination = ({ page, setPage, isLastPage }: PaginationProps) => (
  <S.Pagination>
    {page > 1 && <button onClick={() => setPage(page - 1)}>{page - 1}</button>}
    <button disabled>{page}</button>
    {!isLastPage && (
      <button onClick={() => setPage(page + 1)}>{page + 1}</button>
    )}
  </S.Pagination>
);

export default Pagination;
