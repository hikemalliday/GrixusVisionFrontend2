import { Header } from "./Header";
import { ItemsView } from "./ItemsView";
import { PaginationController } from "./PaginationController";

export const MainPage = () => {
  return (
    <>
      <Header />
      <PaginationController />
      <ItemsView />
    </>
  );
};
