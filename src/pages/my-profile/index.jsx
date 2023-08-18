import dynamic from 'next/dynamic';
import Seo from '../../components/common/seo';
import TenantProfile from './TenantProfile';
import MyProfile from "../../components/dashboard/my-profile";
import AdminProfile from './AdminProfile'
const index = () => {
  return (
    <>
      <Seo pageTitle="My Profile" />
      {localStorage.getItem('useScope') === 'am-landlord' &&(<MyProfile />)}    
      {localStorage.getItem('useScope') === 'am-admin' && (<AdminProfile />)}
      {localStorage.getItem('useScope') === 'am-tenant' && (<TenantProfile />)}
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
