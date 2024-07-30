import { useEffect } from "react";
import { useItemAndCharacterContext } from "../context/ItemAndCharacterContext";
import { usePaginationContext } from "../context/PaginationContext";
import { useItems } from "../hooks/requests";

export interface IItemsViewProps {
  columns?: string[];
}

export interface IPaginatedResponse {
  count: number;
  page: number;
  pageSize: number;
  results: IItem[];
}

export interface IItem {
  item?: string;
  name?: string;
  count?: number;
  location?: string;
  guild?: string;
  [key: string]: string | number | undefined;
}

export const ItemsView = ({ columns }: IItemsViewProps) => {
  const reduceData = (data: IPaginatedResponse): IItem[] => {
    return data.results;
  };

  const { itemName, charName } = useItemAndCharacterContext();
  const { page, pageSize, setCount, count } = usePaginationContext();
  const { isLoading: isItemsLoading, data: itemsData } = useItems({
    itemName,
    charName,
    page,
    pageSize,
  });

  useEffect(() => {
    if (itemsData) setCount(itemsData.count);
  }, [itemsData]);

  if (isItemsLoading) {
    return <>LOADING...</>;
  }

  const reducedData = reduceData(itemsData);
  const colNames = columns ?? Object.keys(reducedData[0] ?? {});
  const headers = (
    <thead>
      <tr>
        {colNames.map((col, i) => {
          return <td key={i}>{col}</td>;
        })}
      </tr>
    </thead>
  );

  const rows = (
    <tbody>
      {reducedData.map((item, i) => {
        return (
          <tr key={i}>
            {colNames.map((col, j) => {
              return <td key={`${i}-${j}`}>{item[col] ?? ""}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );

  return (
    <>
      {count >= 0 ? "No Results" : ""}
      <table className="items-view-container">
        {headers}
        {rows}
      </table>
    </>
  );
};
