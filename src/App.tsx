import { createContext, useEffect, useState } from "react";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { useSelect } from "./hooks/useDatabase";
import Router from "./router";
import { CategorySelect } from "./sql/sql";
import { Category } from "./type";

export const CategoryContext = createContext<string[]>([]);

export const App = () => {
  const [category, setCategory] = useState<string[]>([]);
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
    <CategoryContext.Provider value={category}>
      <MantineProvider>
        <Router />
        <Notifications />
      </MantineProvider>
    </CategoryContext.Provider>
  );
};
