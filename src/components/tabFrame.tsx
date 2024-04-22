import React, { useContext } from "react";

import { Tabs } from "@mantine/core";

import { CategoryContext } from "../App";

type TabFrameType = {
  innerTabComponent: React.ReactElement<{ category: string }>;
};

export const TabFrame = ({ innerTabComponent }: TabFrameType) => {
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
              {React.cloneElement(innerTabComponent, { category: c })}
            </Tabs.Panel>
          ))}
        </Tabs>
      ) : null}
    </>
  );
};
