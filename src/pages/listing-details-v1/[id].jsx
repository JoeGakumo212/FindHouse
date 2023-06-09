import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import CopyrightFooter from '../../components/common/footer/CopyrightFooter';
import Footer from '../../components/common/footer/Footer';
import Header from '../../components/common/header/DefaultHeader';
import MobileMenu from '../../components/common/header/MobileMenu';
import PopupSignInUp from '../../components/common/PopupSignInUp';
import properties from '../../data/properties';
import DetailsContent from '../../components/listing-details-v1/DetailsContent';
import Sidebar from '../../components/listing-details-v1/Sidebar';
import PropertyDetails from '../../components/common/listing-details/PropertyDetails';

import { parseCookies } from 'nookies';
const ListingDynamicDetailsV1 = ({ data: dataProp }) => {
  const router = useRouter();
  const [data, setData] = useState(dataProp || {});
  const id = router.query.id;

  useEffect(() => {
    if (!id) return; // Exit early if no id is available

    const fetchData = async () => {
      try {
        // Get the access token from the cookies
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;
        // Perform request to the API using the obtained token
        const apiResponse = await fetch(
          `https://cloudagent.co.ke/backend/api/v1/properties/${id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenFromCookie}`,
            },
          }
        );

        if (apiResponse.ok) {
          const propertyData = await apiResponse.json();
          setData(propertyData);
        } else {
          // Handle unauthorized or other error cases for the API request
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();

    return () => {};
  }, [id]);

  if (Object.keys(data).length === 0) {
    // Render a loading state or a message while fetching the data
  }

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Listing Single Property --> */}

      <section className="listing-title-area mt85 md-mt0">
        <div className="container">
          <Gallery>
            <div className="row mb30">
              <div className="col-lg-7 col-xl-8">
                <div className="single_property_title mt30-767">
                  <h2>{data?.property_name}</h2>
                  <p>{data?.location}</p>
                </div>
              </div>
              <div className="col-lg-5 col-xl-4">
                <div className="single_property_social_share position-static transform-none">
                  <div className="price float-start fn-400">
                    {data.vacant_units && (
                      <div className="vacant-price">
                        {data.vacant_units.map((unit) => (
                          <h2 key={unit.id}>
                            ${unit.rent_amount} <small>/mo</small>
                          </h2>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="spss style2 mt20 text-end tal-400">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <a href="#">
                          <span className="flaticon-transfer-1"></span>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <span className="flaticon-heart"></span>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <span className="flaticon-share"></span>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#">
                          <span className="flaticon-printer"></span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* End activity and social sharing */}
                </div>
              </div>
            </div>
            {/* End .row */}
            <div className="row">
              <div className="col-sm-7 col-lg-8">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="spls_style_two mb30-520">
                      <Item
                        original={data?.img}
                        thumbnail={data?.img}
                        width={752}
                        height={450}
                      >
                        {({ ref, open }) => (
                          <div role="button" ref={ref} onClick={open}>
                            <img
                              className="img-whp"
                              src="/assets/images/property/2.jpg"
                              alt="fp1.jpg"
                            />
                          </div>
                        )}
                      </Item>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .col-sm-7 .col-lg-8 */}

              <div className="col-sm-5 col-lg-4">
                <div className="row">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div className="col-6" key={i}>
                      <div className="spls_style_two img-gallery-box mb24">
                        <Item
                          original="/assets/images/property/2.jpg"
                          thumbnail="/assets/images/property/2.jpg"
                          width={752}
                          height={450}
                        >
                          {({ ref, open }) => (
                            <div role="button" ref={ref} onClick={open}>
                              <img
                                className="img-whp"
                                src="/assets/images/property/2.jpg"
                                alt={`fp1${i}.jpg`}
                              />
                            </div>
                          )}
                        </Item>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* End  col-sm-5 col-lg-4 */}
            </div>

            {/* End .row */}
          </Gallery>
        </div>
      </section>

      {/* <!-- Agent Single Grid View --> */}
      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <DetailsContent />
            </div>
            {/* End details content .col-lg-8 */}

            <div className="col-lg-4 col-xl-4">
              <Sidebar data={data} />
            </div>
            {/* End sidebar content .col-lg-4 */}
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default ListingDynamicDetailsV1;
