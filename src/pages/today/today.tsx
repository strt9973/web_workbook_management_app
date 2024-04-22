import { ProblemList } from "../../components/innerTabComponents/problemList";
import { TabFrame } from "../../components/tabFrame";

export const Today = () => {
  return <TabFrame innerTabComponent={<ProblemList category="" />}></TabFrame>;
};
