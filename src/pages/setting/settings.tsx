import { useEffect, useState } from "react";

import { Store } from "@tauri-apps/plugin-store";

import { SettingForm } from "../../components/form/settingForm";
import { Setting } from "../../type";

export const Settings = () => {
  const store = new Store(".settings.dat");
  const [setting, setSetting] = useState<Setting>();

  const getInitialValues = async () => {
    const setting = await store.get<Setting>("setting");
    if (setting) {
      console.log(setting);
      setSetting(setting);
    } else {
      setSetting({
        review_1_threshold: 1,
        review_2_threshold: 7,
        review_3_threshold: 14,
      });
    }
  };

  useEffect(() => {
    getInitialValues();
  }, []);

  return <>{setting ? <SettingForm initialValues={setting} /> : null}</>;
};
