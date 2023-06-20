import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyUtility from "../../components/dashboard/Utility";

const index = () => {
  return (
    <>
      <Seo pageTitle="My Tenants" />
      <MyUtility />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
