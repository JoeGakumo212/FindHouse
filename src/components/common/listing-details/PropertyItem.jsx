const PropertyItem = ({data}) => {
  return (
    <ul className="mb0">
      <li className="list-inline-item">
        <a href="#">Property Type : <span>{data?.property_type?.display_name}</span></a>
      </li>
      <li className="list-inline-item">
        <a href="#">Beds: <span>{data?.vacant_units?.[0]?.bed_rooms}</span></a>
      </li>
      <li className="list-inline-item">
        <a href="#">Baths:<span>{data?.vacant_units?.[0]?.bath_rooms}</span></a>
      </li>
      <li className="list-inline-item">
        <a href="#"> Sq Ft:<span>{data?.vacant_units?.[0]?.square_foot} SqFt</span></a>
      </li>
    </ul>
  );
};

export default PropertyItem;
