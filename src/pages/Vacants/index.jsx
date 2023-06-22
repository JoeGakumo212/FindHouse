import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyVacants from "../../components/dashboard/Vacants";

const index = () => {
  return (
    <>
      <Seo pageTitle="My Tenants" />
      <MyVacants />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
