import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import Landlords from './Landlords'

const index = () => {
  return (
    <>
      <Seo pageTitle="My Landlords" />
     <Landlords />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
