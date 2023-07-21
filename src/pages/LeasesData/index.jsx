import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import LeasesTableData from "./LeaseTableData";

const index = () => {
  return (
    <>
      <Seo pageTitle="My Leases" />
      <LeasesTableData />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
