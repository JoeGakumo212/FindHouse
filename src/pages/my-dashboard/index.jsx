import dynamic from 'next/dynamic';
import Seo from '../../components/common/seo';
import MyDashboard from '../../components/dashboard/my-dashboard';
import TenantsDashbaord from './TenantsDashboard';
import LandlordsDashboard from './LandlordsDashboard';

const index = ({ userRole }) => {
  return (
    <>
      <Seo pageTitle="Dashboard" />
      {localStorage.getItem('useScope') === 'am-admin' && (
        <MyDashboard />
      )}
      {localStorage.getItem('useScope') === 'am-tenant' && (<TenantsDashbaord />)}
      {localStorage.getItem('useScope') === 'am-landlord' && (
        <LandlordsDashboard />
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
