import { useEffect, useState } from "react";

import { Box, Tabs } from "@mantine/core";
import { Store } from "@tauri-apps/plugin-store";

import { ImportForm } from "../../components/form/importForm";
import { SettingForm } from "../../components/form/settingForm";
import { Setting } from "../../type";

export const Settings = () => {
  const store = new Store(".settings.dat");
  const [setting, setSetting] = useState<Setting>();

  const getInitialValues = async () => {
    const setting = await store.get<Setting>("setting");
    if (setting) {
      setSetting(setting);
    } else {
      setSetting({
        answer_threshold: 3,
        review_1_threshold: 1,
        review_2_threshold: 7,
        review_3_threshold: 14,
      });
    }
  };

  useEffect(() => {
    getInitialValues();
  }, []);

  return (
    <>
      <Tabs defaultValue={"setting"}>
        <Tabs.List>
          <Tabs.Tab key={"setting"} value={"setting"}>
            {"設定"}
          </Tabs.Tab>
          <Tabs.Tab key={"import"} value={"import"}>
            {"インポート"}
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel key={"setting"} value={"setting"}>
          <Box p={16}>
            {setting ? <SettingForm initialValues={setting} /> : null}
          </Box>
        </Tabs.Panel>
        <Tabs.Panel key={"import"} value={"import"}>
          <Box p={16}>
            <ImportForm />
          </Box>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
