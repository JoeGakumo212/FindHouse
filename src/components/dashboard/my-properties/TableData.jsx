
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { toast } from 'react-nextjs-toast';
import Link from 'next/link';

const TableData = ({ searchQuery, selectedFilter }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

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
          const modifiedData = apiData.data.map((item) => ({
            ...item,
            viewers: (storedData[item.id] || 0), // Get the viewer count from local storage
          }));
          setData(modifiedData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
  
    // Retrieve the viewer count data from local storage
    const storedData = JSON.parse(localStorage.getItem('propertyViewers')) || {};
  
    fetchData();
  }, [selectedFilter]);

  const handleDelete = async (id) => {
    // ...
  };

  const handleImageClick = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, viewers: item.viewers + 1 } : item
      )
    );
  
    // Store the updated viewer count in local storage
    const storedData = JSON.parse(localStorage.getItem('propertyViewers')) || {};
    const updatedData = { ...storedData, [id]: (storedData[id] || 0) + 1 };
    localStorage.setItem('propertyViewers', JSON.stringify(updatedData));
  };
  

  let filteredData = [...data];
  if (searchQuery) {
    filteredData = filteredData.filter(
      (item) =>
        item.property_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedFilter === 'featured') {
    filteredData = filteredData.filter((item) => item.featured);
  } else if (selectedFilter === 'recent') {
    filteredData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  } else if (selectedFilter === 'old') {
    filteredData.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
  }

  let theadContent = ['Listing Title', 'Date published', 'Status', 'View', 'Action'];

  let tbodyContent = filteredData?.slice(0, 4)?.map((item) => (
    <tr key={item.id}>
      <td scope="row">
        <div className="feat_property list favorite_page style2">
          <div className="thumb">
            <Link href={`/listing-details-v1/${item.id}`}>
              <a className="fp_price" onClick={() => handleImageClick(item.id)}>
                <img
                  className="img-whp cover"
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

          <div className="details">
            <div className="tc_content">
              <Link href={`/listing-details-v1/${item.id}`}>
                <a className="fp_price">
                  <h4 className="text-success">{item.property_name}</h4>
                </a>
              </Link>
              <p>
                <span className="flaticon-placeholder"></span> {item.location}
              </p>
              <p>
                <span className="flaticon-placeholder"></span> {item.property_type_id}
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
        </div>
      </td>
      <td>{item.created_at.slice(0, 10)}</td>
      <td>
        <span className="status_tag badge">Pending</span>
      </td>
      <td>
        <p>{item.viewers}</p>
      </td>
      <td>
        <ul className="view_edit_delete_list mb0">
          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit"
          >
            <a href="#">
              <span className="flaticon-edit"></span>
            </a>
          </li>
          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <a href="#">
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
    </tr>
  ));

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadContent.map((value, i) => (
              <th scope="col" key={i}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{tbodyContent}</tbody>
      </table>
    </>
  );
};

export default TableData;
