import { useState } from 'react';
const LocationField = () => {
  const [address, setAddress] = useState('');
  const [propertyState, setPropertState] = useState('');
  const [propertyCity, setPropertyCity] = useState('');
  const [propertyNeighbourHood, setPropertyNeighbourHood] = useState('');
  const [propertyZipCode, setPropertyZipCode] = useState('');
  const [selectPicker, setSelectPicker] = useState('');
  const [gogleMapLat, setGoogleMapLat] = useState();
  const [gogleMapLong, setGoogleMapLong] = useState();
  const [gogleStreet, setGoogleStreet] = useState();

  // console.log('address:', address);
  // console.log('state country:', propertyState);
  // console.log('property City:', propertyCity);
  // console.log('property ZipCode:', propertyZipCode);
  // console.log('selectPicker:', selectPicker);

  const handleSubmit = (event) => {
    event.preventDefault();

    const details = {
      address,
      propertyState,
      propertyCity,
      propertyNeighbourHood,
      propertyZipCode,
      selectPicker,
      gogleMapLat,
      gogleMapLong,
      gogleStreet,
    };
    console.log('details:', details);
  };
  return (
    <>
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyAddress">Address</label>
          <input
            type="text"
            className="form-control"
            id="propertyAddress"
            value={address}
            onChange={({ target }) => setAddress(target?.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyState">County / State</label>
          <input
            type="text"
            className="form-control"
            id="propertyState"
            value={propertyState}
            onChange={({ target }) => setPropertState(target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyCity">City</label>
          <input
            type="text"
            className="form-control"
            id="propertyCity"
            value={propertyCity}
            onChange={({ target }) => setPropertyCity(target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="neighborHood">Neighborhood</label>
          <input
            type="text"
            className="form-control"
            id="neighborHood"
            value={propertyNeighbourHood}
            onChange={({ target }) => setPropertyNeighbourHood(target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="zipCode">Zip</label>
          <input
            type="text"
            className="form-control"
            id="zipCode"
            value={propertyZipCode}
            onChange={({ target }) => setPropertyZipCode(target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Country</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            value={selectPicker}
            onChange={({ target }) => setSelectPicker(target.value)}
          >
            <option data-tokens="Turkey">Turkey</option>
            <option data-tokens="Iran">Iran</option>
            <option data-tokens="Iraq">Iraq</option>
            <option data-tokens="Spain">Spain</option>
            <option data-tokens="Greece">Greece</option>
            <option data-tokens="Portugal">Portugal</option>
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <div className="h-400 bdrs8" id="map-canvas">
            <div className="gmap_canvas pe-none">
              <iframe
                title="map"
                className="gmap_iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206252.721472711!2d-115.31508339643749!3d36.12519578053308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV%2C%20USA!5e0!3m2!1sen!2sbd!4v1669000531244!5m2!1sen!2sbd"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="googleMapLat">Latitude (for Google Maps)</label>
          <input
            type="text"
            className="form-control"
            id="googleMapLat"
            value={gogleMapLat}
            onChange={({ target }) => setGoogleMapLat(target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="googleMapLong">Longitude (for Google Maps)</label>
          <input
            type="text"
            className="form-control"
            id="googleMapLong"
            value={gogleMapLong}
            onChange={({ target }) => setGoogleMapLong(target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Google Map Street View</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            value={gogleStreet}
            onChange={({ target }) => setGoogleStreet(target.value)}
          >
            <option data-tokens="Turkey">Street View v1</option>
            <option data-tokens="Iran">Street View v2</option>
            <option data-tokens="Iraq">Street View v3</option>
            <option data-tokens="Spain">Street View v4</option>
            <option data-tokens="Greece">Street View v5</option>
            <option data-tokens="Portugal">Street View v6</option>
          </select>
        </div>
      </div>
      {/* End .col */}

      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start">Back</button>
          <button className="btn btn2 float-end" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
      {/* End .col */}
    </>
  );
};

export default LocationField;