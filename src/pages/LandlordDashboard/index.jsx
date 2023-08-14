import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";

import Dashboard from "./Dashboard";


const index = ({userRole}) => {
  console.log('User Role set in landlorddashboard:', userRole);
  return (
    <>
      <Seo pageTitle="Landlords Dashboard" />
    
    <Dashboard/>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
