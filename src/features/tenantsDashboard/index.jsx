import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import TenantsDashboard from "../../components/common/header/dashboard/TenantsDashboard";


const index = ({userRole}) => {
  console.log('userRole pages:', userRole);
  return (
    <>
      <Seo pageTitle="Dashboard" />
      <TenantsDashboard  userRole={userRole}/>
    
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
