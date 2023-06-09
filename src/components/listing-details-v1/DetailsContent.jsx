import Comments from '../blog-details/Comments';
import Ratings from '../blog-details/Ratings';
import ReviewBox from '../blog-details/ReviewBox';
import AdditionalDetails from '../common/listing-details/AdditionalDetails';
import Attachments from '../common/listing-details/Attachments';
import FloorPlans from '../common/listing-details/FloorPlans';
import PropertyDescriptions from '../common/listing-details/PropertyDescriptions';
import PropertyDetails from '../common/listing-details/PropertyDetails';
import PropertyFeatures from '../common/listing-details/PropertyFeatures';
import PropertyItem from '../common/listing-details/PropertyItem';
import PropertyLocation from '../common/listing-details/PropertyLocation';
import PropertyVideo from '../common/listing-details/PropertyVideo';
import WalkScore from '../common/listing-details/WalkScore';
import WhatsNearby from '../common/listing-details/WhatsNearby';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';

const DetailsContent = ({ data: dataProp }) => {
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
  
      <div className="listing_single_description">
        <div className="lsd_list">
          <PropertyItem data={data} />
        </div>
        {/* End .lsd_list */}

        <h4 className="mb30">Description</h4>
        <PropertyDescriptions data={data} />
      </div>
      {/* End .listing_single_description */}

      <div className="additional_details">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="mb15">Property Details</h4>
          </div>
          <PropertyDetails data={data} />
        </div>
      </div>
      {/* End .additional_details */}

      <div className="additional_details">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="mb15">Additional details</h4>
          </div>
          <AdditionalDetails data={data} />
        </div>
      </div>
      {/* End .additional_details */}

      <div className="property_attachment_area">
        <h4 className="mb30">Property Attachments</h4>
        <div className="iba_container style2">
          <Attachments />
        </div>
      </div>
      {/* End .property_attachment_area */}

      <div className="application_statics mt30">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="mb10">Features</h4>
          </div>
          {/* End .col */}

          <PropertyFeatures />
        </div>
      </div>
      {/* End .feature_area */}

      <div className="application_statics mt30">
        <h4 className="mb30">
        <h4>   Location: {data?.location}
          <small className="float-end">{data?.landlord?.first_name}
            {data?.landlord?.postal_address} ,{data?.landlord?.country} ,{data?.landlord?.state} ,{data?.landlord?.city}
          </small>
          </h4>
        </h4>
        <div className="property_video p0">
          <PropertyLocation data={data} />
        </div>
      </div>
      {/* End .location_area */}

      <div className="application_statics mt30">
        <h4 className="mb30">Floor plans</h4>
        <div className="faq_according style2">
          <FloorPlans data={data} />
        </div>
      </div>
      {/* End .floor_plane */}

      <div className="shop_single_tab_content style2 mt30">
        <PropertyVideo data={data} />
      </div>
      {/* End property-video  */}

      <div className="walkscore_area mt30">
        <WalkScore />
      </div>
      {/* End walkscore_area */}

      <div className="whats_nearby mt30">
        <h4 className="mb10">What&apos;s Nearby</h4>
        <WhatsNearby />
      </div>
      {/* End what's nearby area */}

      <div className="product_single_content">
        <div className="mbp_pagination_comments mt30">
          <div className="total_review">
            <h4>896 Reviews</h4>
            <ul className="review_star_list mb0 pl10">
              <Ratings />
            </ul>
            <a className="tr_outoff pl10" href="#">
              ( 4.5 out of 5 )
            </a>
            <a className="write_review float-end fn-xsd" href="#">
              Write a Review
            </a>
          </div>
          {/* End .total_review */}
          <Comments />
          <div className="custom_hr"></div>

          <div className="mbp_comment_form style2">
            <h4>Write a Review</h4>
            <ul className="review_star">
              <li className="list-inline-item">
                <span className="sspd_review">
                  <ul>
                    <Ratings />
                  </ul>
                </span>
              </li>
              <li className="list-inline-item pr15">
                <p>Your Rating & Review</p>
              </li>
            </ul>
            <ReviewBox />
          </div>
        </div>
      </div>
      {/* End review and comment area area */}
    </>
  );
};

export default DetailsContent;
