import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import UtilityTableData from "./UtilityTableData"

const index = () => {
  return (
    <>
      <Seo pageTitle="My Utility" />
      < UtilityTableData/>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
