import Link from 'next/link';
import featureContent from '../../../data/properties';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import Slider from 'react-slick';
const FeaturedListings = () => {
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
          'https://cloudagent.co.ke/backend/api/v1/properties?filter=&page=0&limit=900000000000000000000000000000000000000&sortField=updated_at&sortDirection=desc&whereField=&whereValue=',
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
    // row:3,
    slidesToShow: 3,
    speed: 500,
    rows: 5,
    // slidesPerRow: 1,
    slidesToShow: data.length < 1 ? data.length : 1,
    slidesToScroll: data.length < 1 ? 1 : 1,
  };
  return (
    <>
      <Slider {...settings} arrows={true}>
        {data.map((item) => (
          <div className="media d-flex" key={item.id}>
            <Link href={`/listing-details-v1/${item.id}`}>
              <a>
                <img
                  className="img-whp"
                  src="/assets/images/property/2.jpg"
                  alt="fp1.jpg"
                />
              </a>
            </Link>

            <div className="media-body px-3">
              <h5 className="mt-0 post_title">
                <Link href={`/listing-details-v1/${item.id}`}>
                  <a>
                    <h4 className="text-thm mt-0 post_title">
                    <h3>{item.property_name}, <small className="mb0">  {item.property_type?.display_name}</small></h3>
                    
                    </h4>
                  </a>
                </Link>
              </h5>
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
                          <h3 className="list-inline-item text-danger" key={price}>
                            ${price} <small>/mo</small>
                          </h3>
                        ))}
                    </ul>
                  </div>
                </a>
              </Link>
              <div>
        Beds: <strong>{item.vacant_units?.[0]?.bed_rooms}</strong>,
        
        Baths: <strong>{item.vacant_units?.[0]?.bath_rooms}</strong>,
        
        SqFt: <strong>{item.vacant_units?.[0]?.square_foot}</strong>
      </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default FeaturedListings;
