// import { useState } from "react";
// import { useItems } from "./requests";

// export interface IUseItemsParams {
//   itemName: string;
//   charName: string;
//   page: number;
//   pageSize: number;
// }

// export interface IPaginatedResponse {
//   results: object[];
//   page: number;
//   size: number;
//   count: number;
// }

// export const useItemsPagination = () => {
//   const [itemName, setItemName] = useState("");
//   const [charName, setCharName] = useState("ALL");
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(25);
//   const useQueryItemsReturn = useItems({ itemName, charName, page, pageSize });

//   const reduceData = (paginatedResponse: IPaginatedResponse): object[] => {
//     return paginatedResponse.results;
//   };

//   return {
//     itemName,
//     setItemName,
//     charName,
//     setCharName,
//     page,
//     setPage,
//     pageSize,
//     setPageSize,
//     reduceData,
//     useQueryItemsReturn,
//   };
// };
