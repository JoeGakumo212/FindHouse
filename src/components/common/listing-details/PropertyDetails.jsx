const PropertyDetails = ({data}) => {

  return (
    <>
      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              Property ID : <span>  {data?.property_code}</span>
            
            </p>
          </li>
          <li>
            <p>
            Price: <span>${data?.vacant_units?.[0]?.rent_amount}</span>
            </p>
          </li>
          <li>
            <p>
              Property Size : <span>{data?.vacant_units?.[0]?.square_foot} Sq Ft</span>
            </p>
          </li>
          <li>
            <p>
              Year Built : <span>{data?.registration_date}</span>
            </p>
          </li>
        </ul>
      </div>
      {/* End .col */}

      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
            Bedrooms: <span>{data?.vacant_units?.[0]?.bed_rooms}</span>
            </p>
          </li>
          <li>
            <p>
              Bathrooms :<span>{data?.vacant_units?.[0]?.bath_rooms}</span>
            </p>
          </li>
          <li>
            <p>
              Unit-Floor : <span>{data?.vacant_units?.[0]?.unit_floor}</span>
            </p>
          </li>
          <li>
            <p>
              Garage Size : <span>{data?.vacant_units?.[0]?.square_foot} SqFt</span>
            </p>
          </li>
        </ul>
      </div>
      {/* End .col */}

      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              Property Type : <span>{data?.property_type?.display_name}</span>
            </p>
          </li>
          <li>
            <p>
              Property Status : <span>For Sale</span>
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PropertyDetails;
