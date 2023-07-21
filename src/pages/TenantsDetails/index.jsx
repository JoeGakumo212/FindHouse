import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyTenantsDetails from "../../components/dashboard/InfoTenants";

const index = () => {
  return (
    <>
      <Seo pageTitle="Create Tenant" />
      <MyTenantsDetails />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
