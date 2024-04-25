import { createContext, useEffect, useState } from "react";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import ColorSchemeContext, {
  ColorSchemeType,
} from "./context/ColorSchemeContext";
import Router from "./router";
import { CategorySelect } from "./sql/sql";
import { Category } from "./type";
import { select } from "./utils/db";

export const CategoryContext = createContext<string[]>([]);

export const App = () => {
  const [category, setCategory] = useState<string[]>([]);
  const [colorScheme, setColorScheme] = useState<ColorSchemeType>(() =>
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  const getCategories = async () => {
    const categories = await select<Category>(CategorySelect);
    if (!categories) return;
    const categoryList = categories.map((c) => c.category);
    setCategory(categoryList);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <ColorSchemeContext.Provider
      value={{ colorScheme, onChange: setColorScheme }}
    >
      <CategoryContext.Provider value={category}>
        <MantineProvider forceColorScheme={colorScheme}>
          <Router />
          <Notifications />
        </MantineProvider>
      </CategoryContext.Provider>
    </ColorSchemeContext.Provider>
  );
};
