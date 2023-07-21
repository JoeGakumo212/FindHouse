import dynamic from 'next/dynamic';
import Seo from '../../components/common/seo';
import PageA from '../../components/dashboard/custom-page/A';

const index = () => {
  return (
    <>
      <Seo pageTitle="My PageA" />
      <PageA />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
