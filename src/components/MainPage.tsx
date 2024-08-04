import { Header } from "./Header";
import { ItemsView } from "./ItemsView";
import { PaginationController } from "./PaginationController";

export const MainPage = () => {
  return (
    <>
      <Header />
      <PaginationController />
      <ItemsView
        columns={[
          "char_name",
          "item_name",
          "item_location",
          "item_count",
          "char_guild",
        ]}
      />
    </>
  );
};
