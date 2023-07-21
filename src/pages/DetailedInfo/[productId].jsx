import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyPropertyDetails from '../../components/dashboard/PropertyDetails'

const index = () => {
  return (
    <>
      <Seo pageTitle="My Properties" />
      <MyPropertyDetails />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
