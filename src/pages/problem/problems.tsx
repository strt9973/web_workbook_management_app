import { useContext } from "react";

import { Tabs } from "@mantine/core";

import { CategoryContext } from "../../App";
import { ProblemTable } from "./problemTable";

export const Problems = () => {
  const category = useContext(CategoryContext);

  return (
    <>
      {category.length ? (
        <Tabs defaultValue={category[0]}>
          <Tabs.List>
            {category.map((c) => (
              <Tabs.Tab key={c} value={c}>
                {c}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {category.map((c) => (
            <Tabs.Panel key={c} value={c}>
              <ProblemTable category={c} />
            </Tabs.Panel>
          ))}
        </Tabs>
      ) : null}
    </>
  );
};
