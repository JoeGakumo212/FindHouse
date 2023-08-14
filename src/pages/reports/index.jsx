import dynamic from 'next/dynamic';
import Seo from '../../components/common/seo';

import Reports from './Reports';
import Admin from "./Admin";
const index = () => {
  return (
    <>
      <Seo pageTitle=" Report" />
      {/* <Reports /> */}
      <Admin />
      <div className="row mt50">
        <div className="col-lg-12">
          <div className="copyright-widget text-center">
            <p>© 2020 Find House. Made with love.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
