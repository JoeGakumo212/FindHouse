import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import LeaseDetails from "../../components/dashboard/my-dashboard";

const index = () => {
  return (
    <>
      <Seo pageTitle="My LeaseDetails" />
      <LeaseDetails />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
