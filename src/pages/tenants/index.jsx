import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyTenants from "../../components/dashboard/tenants";

const index = () => {
  return (
    <>
      <Seo pageTitle="My Tenants" />
      <MyTenants />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
