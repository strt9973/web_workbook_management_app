import { createContext, useEffect, useState } from "react";

import { MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";

import ColorSchemeContext from "./context/ColorSchemeContext";
import { useSelect } from "./hooks/useDatabase";
import Router from "./router";
import { CategorySelect } from "./sql/sql";
import { Category } from "./type";

export const CategoryContext = createContext<string[]>([]);

export const App = () => {
  const [category, setCategory] = useState<string[]>([]);
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState(preferredColorScheme);

  const getCategories = async () => {
    const categories = await useSelect<Category>(CategorySelect);
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
