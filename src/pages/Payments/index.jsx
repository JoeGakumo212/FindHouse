import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";

import MyPayments from "../../components/dashboard/Payments";

const index = () => {
  return (
    <>
      <Seo pageTitle="My Tenants" />
      <MyPayments />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
