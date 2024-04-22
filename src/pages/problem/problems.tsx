import { ProblemTable } from "../../components/innerTabComponents/problemTable";
import { TabFrame } from "../../components/tabFrame";

export const Problems = () => {
  return <TabFrame innerTabComponent={<ProblemTable category="" />}></TabFrame>;
};
