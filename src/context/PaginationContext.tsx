import { useContext, createContext, useState, ReactNode } from "react";

export interface IPaginationContextValues {
  page: number;
  setPage: (num: number) => void;
  pageSize: number;
  setPageSize: (num: number) => void;
  count: number;
  setCount: (num: number) => void;
}

interface PaginationProviderProps {
  children: ReactNode;
}

const PaginationContext = createContext<IPaginationContextValues | undefined>(
  undefined
);

export const PaginationProvider: React.FC<PaginationProviderProps> = ({
  children,
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [count, setCount] = useState(0);

  return (
    <PaginationContext.Provider
      value={{ page, setPage, pageSize, setPageSize, count, setCount }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = () => {
  const context = useContext(PaginationContext);
  if (context === undefined) {
    throw new Error("usePaginationContext must be within a PaginationProvider");
  }
  return context;
};
