import Link from 'next/link';
import findProperties from '../../data/findProperties';
import { parse } from 'cookie';
import { parseCookies } from 'nookies';
import React, { useState, useEffect, useContext } from 'react';
import Slider from 'react-slick';

const FindProperties = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the access token from the cookies
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        
        // Perform request to the API using the obtained token
        const apiResponse = await fetch(
          'https://cloudagent.co.ke/backend/api/v1/properties?filter=&page=0&limit=90000000000000000000000000000&sortField=updated_at&sortDirection=desc&whereField=&whereValue=',
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
    slidesToShow: data.length < 2 ? data.length : 2,
    slidesToScroll: data.length < 2 ? 1 : 2,
    autoplay: true,
    autoplaySpeed: 5000,
    
  };
  return (
    <>
      <Slider {...settings} arrows={false}>
        {data.map(
          (item, index) =>
            index % 2 === 0 && (
              <div className="row" key={index}>
                {data.slice(index, index + 2).map((item) => (
                  <div className="" key={item.id}>
                    <Link href="/listing-grid-v1">
                      <a className="properti_city d-block">
                        <div className="thumb">
                          <img
                            className="img-whp"
                            src="/assets/images/property/2.jpg"
                            alt="fp1.jpg"
                          />
                        </div>
                        <div className="overlay">
                          <div className="details">
                            <h4>{item.property_name}</h4>
                            <p>{item.location}</p>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            )
        )}
      </Slider>
    </>
  );
};

export default FindProperties;
