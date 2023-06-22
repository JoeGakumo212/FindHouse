import Link from 'next/link';
import Slider from 'react-slick';
import { useState, useEffect } from 'react';
import { parse } from 'cookie';

const FeaturedProperties = () => {
  const [data, setData] = useState([]);
  const [accesstoken, setToken] = useState('');

  useEffect(() => {
    const fetchAPI = async () => {
      const email = 'admin@admin.com';
      const password = 'admin123';

      try {
        // Perform login request
        const loginResponse = await fetch(
          'https://cloudagent.co.ke/backend/api/v1/login',
          {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (loginResponse.ok) {
          const { access_token } = await loginResponse.json();

          // Store the access token in a cookie
          document.cookie = `access_token=${access_token}`;

          // Perform request to homepage API using the obtained token from the cookie
          const cookie = parse(document.cookie);
          const tokenFromCookie = cookie.access_token;

          const apiResponse = await fetch(
            'https://cloudagent.co.ke/backend/api/v1/properties?filter=&page=0&limit=900000000000000000000000000000&sortField=updated_at&sortDirection=desc&whereField=&whereValue=',
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
        } else {
          // Handle login error
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchAPI();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: data.length < 3 ? data.length : 3,
    slidesToScroll: data.length < 3 ? 1 : 3,
  };

  return (
    <>
      <Slider {...settings} arrows={true}>
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
                      <div>{item.property_code}</div>
                    </Link>
                  </h4>
                  <p>
                    {item.display_name}
                    {item.property_name}
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default FeaturedProperties;
