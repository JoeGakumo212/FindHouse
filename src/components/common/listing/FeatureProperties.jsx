import featureProContent from '../../../data/properties';
import Slider from 'react-slick';
import BestProperties from '../../home/BestProperties';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import Link from 'next/link';

const FeatureProperties = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the access token from the cookies
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        console.log('am here', tokenFromCookie);
        // Perform request to the API using the obtained token
        const apiResponse = await fetch(
          'https://cloudagent.co.ke/backend/api/v1/properties?filter=&page=0&limit=90000000000000000000000000000000000&sortField=updated_at&sortDirection=desc&whereField=&whereValue=',
          {
            headers: {
              Authorization: `Bearer ${tokenFromCookie}`,
            },
          }
        );

        if (apiResponse.ok) {
          const apiData = await apiResponse.json();
          setData(apiData.data);
        } else {
          // Handle unauthorized or other error cases for the API request
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: data.length < 1 ? data.length : 1,
    slidesToScroll: data.length < 1 ? 1 : 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <>
      <Slider {...settings} arrows={false}>
        {data.map((item) => (
          <div className="item" key={item.id}>
            <div className="feat_property home3">

            <Link href={`/listing-details-v1/${item.id}`}>
                    <a className="fp_price">
              <div className="thumb">
                <img
                  className="img-whp"
                  src="/assets/images/property/2.jpg"
                  alt="fp1.jpg"
                />
                <div className="thmb_cntnt">
                 
                      <div>
                        <ul>
                          {item.vacant_units &&
                            [
                              ...new Set(
                                item.vacant_units.map(
                                  (vacant) => vacant.rent_amount
                                )
                              ),
                            ].map((price) => (
                              <li className="list-inline-item mt-3 text-light" key={price}>
                                {price} <small>/mo</small>
                               
                              </li>
                              
                            ))}
                        </ul>                      
                      </div>
                      <div>
                      <ul>
                        <h4 className='text-light mb-5'>{item.property_name}</h4>
                    </ul>
                      </div>
                      
                    
                
                </div>   
                             
              </div>
              </a>
                  </Link>
            </div>
            
          </div>
        ))}
      </Slider>
    </>
  );
};
export default FeatureProperties;
