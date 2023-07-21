import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";

import PaymentsTableData from './PaymentsTableData'

const index = () => {
  return (
    <>
      <Seo pageTitle="My Tenants" />
      <PaymentsTableData />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
