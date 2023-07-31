import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import VacateTableData from "./VacateTableData";

const index = () => {
  return (
    <>
      <Seo pageTitle="My Notices" />
      < VacateTableData/>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
