import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";


const index = () => {
  return (
    <>
      <Seo pageTitle="My Properties" />

    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
