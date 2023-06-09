import ContactWithAgent from "../common/agent-view/ContactWithAgent";
import Categorie from "../common/listing/Categorie";
import ListingCreator from "../common/listing/ListingCreator";
import FeaturedListings from "../common/listing/FeaturedListings";
import FeatureProperties from "../common/listing/FeatureProperties";
import { useEffect,useState } from "react";
import { parseCookies } from "nookies";
import { useRouter } from 'next/router';
const Sidebar = ({ data: dataProp }) =>  {
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
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <div className="sl_creator">
            <h4 className="mb25">Listed By</h4>
            <ListingCreator data={data} />
          </div>
          {/* End .sl_creator */}
          <ContactWithAgent data={data} />
        </div>
      </div>
      {/* End .sidebar_listing_list */}

      <div className="terms_condition_widget">
        <h4 className="title">Featured Properties</h4>
        <div className="sidebar_feature_property_slider">
          <FeatureProperties data={data} />
        </div>
      </div>
      {/* End .Featured Properties */}

      <div className="terms_condition_widget">
        <h4 className="title">Categories Property</h4>
        <div className="widget_list">
          <ul className="list_details">
            <Categorie data={data} />
          </ul>
        </div>
      </div>
      {/* End .Categories Property */}

      <div className="sidebar_feature_listing">
        <h4 className="title">Recently Viewed</h4>
        <FeaturedListings data={data} />
      </div>
      {/* End .Recently Viewed */}
    </>
  );
};

export default Sidebar;
