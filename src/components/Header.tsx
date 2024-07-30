import { Autocomplete, TextField } from "@mui/material";
import { useState, KeyboardEvent } from "react";
import { useCharNames } from "../hooks/requests";
import { useItemAndCharacterContext } from "../context/ItemAndCharacterContext";
import { labelProps } from "./styles";

export interface IHeaderProps {
  setCharName: (char: string) => void;
  setItemName: (item: string) => void;
  itemName: string;
  charNames: string[];
}

export const Header = () => {
  const { isLoading: isCharNamesLoading, data: useCharNamesData } =
    useCharNames();
  const { itemName, setItemName, setCharName } = useItemAndCharacterContext();
  // Annoying re-render workaround for now, until I understand the tech more
  // re-fetch was causing text field to clear without adding
  const [inputValue, setInputValue] = useState<string>(itemName);
  const handleEnter = (event: KeyboardEvent) => {
    if (event.key == "Enter") {
      event.preventDefault();
      const target = event.target as HTMLInputElement;
      setItemName(target.value);
    }
  };
  const handleCharacterChange = (event: any, newVal: string) => {
    event.preventDefault();
    setCharName(newVal);
  };

  if (isCharNamesLoading) {
    return <></>;
  }

  return (
    <div className="header-container">
      <TextField
        className="search-bar"
        id="search-bar"
        label="item search"
        variant="standard"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => handleEnter(e)}
        InputLabelProps={labelProps}
        sx={{
          input: {
            color: "white",
          },
        }}
      />
      <Autocomplete
        // @ts-ignore
        onChange={handleCharacterChange}
        disablePortal
        id="combo-box-demo"
        options={["ALL", ...useCharNamesData]}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="character"
            variant="standard"
            InputLabelProps={labelProps}
            sx={{
              input: {
                color: "white",
                padding: "0",
                fontSize: "smaller",
              },
            }}
          />
        )}
      />
    </div>
  );
};
