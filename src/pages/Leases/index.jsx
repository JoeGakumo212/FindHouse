import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyLeases from "../../components/dashboard/Leases";

const index = () => {
  return (
    <>
      <Seo pageTitle="My Tenants" />
      <MyLeases />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
