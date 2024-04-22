import { HistoryList } from "../../components/innerTabComponents/historyList";
import { TabFrame } from "../../components/tabFrame";

export const Histories = () => {
  return <TabFrame innerTabComponent={<HistoryList category="" />}></TabFrame>;
};
