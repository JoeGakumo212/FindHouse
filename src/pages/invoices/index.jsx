import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import Invoice from "../invoices/Invoice";


const index = () => {
  return (
    <>
      <Seo pageTitle="My Invoice" />
    
    <Invoice/>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
