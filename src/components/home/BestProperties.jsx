import Link from 'next/link';
import Slider from 'react-slick';
import properties from '../../data/properties';
import { parse } from 'cookie';
import { parseCookies } from 'nookies';
import { useState, useEffect } from 'react';
// import axios from "axios";
const BestProperties = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the access token from the cookies
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        
        // Perform request to the API using the obtained token
        const apiResponse = await fetch(
          'https://cloudagent.co.ke/backend/api/v1/properties?filter=&page=0&limit=900000000000000000000000000000000&sortField=updated_at&sortDirection=desc&whereField=&whereValue=',
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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: data.length < 3 ? data.length : 3,
    slidesToScroll: data.length < 3 ? 1 : 3,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <>
      <Slider {...settings} arrows={false}>
        {data.map((item) => (
          <div className="item" key={item.id}>
            <div className="feat_property home3">
              <div className="thumb">
                <img
                  className="img-whp"
                  src="/assets/images/property/2.jpg"
                  alt="fp1.jpg"
                />
                <div className="thmb_cntnt">
                  <ul className="icon mb0">
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
                  </ul>
                  <Link href={`/listing-details-v1/${item.id}`}>
                    <a className="fp_price">
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
                              <li className="list-inline-item" key={price}>
                                {price} <small>/mo</small>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>

              <div className="details">
                <div className="tc_content">
                  <Link href={`/listing-details-v1/${item.id}`}>
                    <a className="fp_price">
                      <div>
                        <h4 className="text-thm">
                          {item.property_type?.display_name}
                        </h4>
                      </div>
                    </a>
                  </Link>
                  <h4>
                    <Link href={`/listing-details-v1/${item.id}`}>
                    <a className="fp_price">
                      <div  className="text-thm">{item.property_code}</div>
                      </a>
                    </Link>
                  </h4>
                  <p>{item.property_name}</p>
                  <h6> {item.location}</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default BestProperties;
