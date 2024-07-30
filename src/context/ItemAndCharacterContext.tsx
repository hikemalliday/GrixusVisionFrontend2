import React, { useContext, createContext, useState, ReactNode } from "react";

export interface IItemAndCharacterContextValues {
  itemName: string;
  setItemName: (item: string) => void;
  charName: string;
  setCharName: (char: string) => void;
}

export interface ItemAndCharacterProviderProps {
  children: ReactNode;
}

const ItemAndCharacterContext = createContext<
  IItemAndCharacterContextValues | undefined
>(undefined);

export const ItemAndCharacterProvider: React.FC<
  ItemAndCharacterProviderProps
> = ({ children }) => {
  const [itemName, setItemName] = useState("");
  const [charName, setCharName] = useState("");

  return (
    <ItemAndCharacterContext.Provider
      value={{
        itemName,
        setItemName,
        charName,
        setCharName,
      }}
    >
      {children}
    </ItemAndCharacterContext.Provider>
  );
};

export const useItemAndCharacterContext = () => {
  const context = useContext(ItemAndCharacterContext);
  if (context === undefined) {
    throw new Error(
      "useItemAndCharacter must be used within an ItemAndCharacterProvider"
    );
  }
  return context;
};
