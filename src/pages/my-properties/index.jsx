import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import PropertyTableData from "./PropertyTableData";

const index = () => {
  return (
    <>
      <Seo pageTitle="My Properties" />
      <PropertyTableData />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
