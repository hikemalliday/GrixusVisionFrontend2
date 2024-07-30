import { Button } from "@mui/material";
import { usePaginationContext } from "../context/PaginationContext";

export const PaginationController = ({}) => {
  const { page, setPage, pageSize, count } = usePaginationContext();
  const handlePageChange = (num: number): (() => void) => {
    // @ts-ignore
    return () => setPage((prev: number) => prev + num);
  };
  return (
    <div className="pagination-controller-container">
      <div className="pagination-metadata">
        {`page: ${String(page + 1)}, pageSize: ${pageSize}`}
        {`Count: ${count}`}
      </div>
      <Button
        onClick={handlePageChange(-1)}
        variant="outlined"
        disabled={page <= 0}
      >
        LEFT
      </Button>
      <Button
        onClick={handlePageChange(1)}
        variant="outlined"
        disabled={(page + 1) * pageSize > count}
      >
        RIGHT
      </Button>
    </div>
  );
};
