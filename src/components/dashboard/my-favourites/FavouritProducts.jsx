import Link from 'next/link';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { toast } from 'react-nextjs-toast';

const FavouritProducts = ({ searchQuery,selectedFilter, }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletedItemId, setDeletedItemId] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the access token from the cookies
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        // Perform request to the API using the obtained token
        const apiResponse = await fetch(
          'https://cloudagent.co.ke/backend/api/v1/properties?filter=&page=0&limit=9000000&sortField=updated_at&sortDirection=desc&whereField=&whereValue=',
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
  }, [selectedFilter]);

//  perform deletion here
const handleDelete = async (id) => {
  const confirmed = window.confirm('Are you sure you want to delete this item?');

  if (confirmed) {
    try {
      // Get the access token from the cookies
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      // Perform request to delete the property using the obtained token and property ID
      const apiResponse = await fetch(
        `https://cloudagent.co.ke/backend/api/v1/properties/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${tokenFromCookie}`,
          },
        }
      );

      if (apiResponse.ok) {
        // Property deleted successfully
        toast.notify('Favorite Deleted successfully');
        // Remove the deleted property from the data list
          // Set the deletedItemId state to the ID of the deleted item
          setDeletedItemId(id);
        // setData((prevData) => prevData.filter((item) => item.id !== id));
      } else {
        // Handle unauthorized or other error cases for the API request
        console.error('Failed to delete property');
      }
    } catch (error) {
      console.error('Failed to delete property:', error);
    }
  }
};

  
 // Filter the data based on the search query and selected filter
let filteredData = [...data];
if (searchQuery) {
  filteredData = filteredData.filter((item) =>
    item.property_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    // item.price.toString().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
}
if (selectedFilter === "featured") {
  console.log("Before filtering:", filteredData);
  filteredData = filteredData.filter((item) => item.featured);
  console.log("After filtering:", filteredData);

} else if (selectedFilter === "recent") {
  filteredData.sort((a, b) => {
    return new Date(b.updated_at) - new Date(a.updated_at);
  });
} else if (selectedFilter === "old") {
  filteredData.sort((a, b) => {
    return new Date(a.updated_at) - new Date(b.updated_at);
  });
}
// Remove the deleted item from the filteredData array
if (deletedItemId) {
  filteredData = filteredData.filter((item) => item.id !== deletedItemId);
  setDeletedItemId(null); // Reset the deletedItemId state
}
const handlePageChange = (page) => {
  setCurrentPage(page);
};
  let content = filteredData?.slice(0, 4)?.map((item) => (
    <div className="feat_property list favorite_page" key={item.id}>
      <div className="thumb">
          <Link href={`/listing-details-v1/${item.id}`}>
            <a className="fp_price">
            <img
              className="img-whp  cover"
              src="/assets/images/property/2.jpg"
              alt="fp1.jpg"
            />
            <div className="thmb_cntnt">
              <ul className="tag mb0">
                <li className="list-inline-item">
                  <a href="#">For Rent</a>
                </li>
              </ul>
            </div>
            </a>
          </Link>
          </div>
      {/* End .thumb */}

      <div className="details">
        <div className="tc_content">
          <h4>
            {' '}
            <Link href={`/listing-details-v1/${item.id}`}>
              <a>{item.property_name}</a>
            </Link>
          </h4>
          <p>
            <span className="flaticon-placeholder"></span> {item.location}
          </p>
          <p>
            <span className="flaticon-placeholder"></span> {item.property_code}
          </p>
          <Link href={`/listing-details-v1/${item.id}`}>
            <a className="fp_price">
              <div>
                <ul>
                  {item.vacant_units &&
                    [
                      ...new Set(
                        item.vacant_units.map((vacant) => vacant.rent_amount)
                      ),
                    ].map((price) => (
                      <li
                        className="list-inline-item fp_price text-thm"
                        key={price}
                      >
                        ${price} <small>/mo</small>
                      </li>
                    ))}
                </ul>
              </div>
            </a>
          </Link>
        </div>
      </div>
      {/* End details */}

      <ul className="view_edit_delete_list mb0 mt35">
        <li
          className="list-inline-item"
          data-toggle="tooltip"
          data-placement="top"
          title="Delete"
        >
          <a onClick={() => handleDelete(item.id)}>
            <span className="flaticon-garbage"></span>
          </a>
        </li>
      </ul>
      {/* view_edit_delete_list */}
    </div>
  ));

  return <> 
  {content}
  </>;
};

export default FavouritProducts;
