import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import DetailedInfo from './DetailedInfo';

const Leases = () => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [lateFees, setLateFees] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [utilities, setUtilities] = useState([]);
  const [extraCharges, setExtraCharges] = useState([]);

  // Fetch the support data
  useEffect(() => {
    fetchSupportData();
  }, []);

  const fetchSupportData = async () => {
    const cookies = parseCookies();
    const tokenFromCookie = cookies.access_token;

    const headers = {
      Authorization: `Bearer ${tokenFromCookie}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.get('https://cloudagent.co.ke/backend/api/v1/property_support_data', { headers });
      const data = response.data;
      setPropertyTypes(data.property_types);
      setLateFees(data.late_fees);
      setPaymentMethods(data.payment_methods);
      setUtilities(data.utilities);
      setExtraCharges(data.extra_charges);
    } catch (error) {
      console.error('Error fetching support data:', error);
    }
  };

  return (
    <div>
      <form> {/* Wrap the form elements inside a form element */}
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="PropertyType">Property Type</label>
            <select className="form-select">
              {propertyTypes.map((propertyType) => (
                <option key={propertyType.id} value={propertyType.id}>
                  {propertyType.display_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="LateFee">Late Fee</label>
            <select className="form-select">
              {lateFees.map((lateFee) => (
                <option key={lateFee.id} value={lateFee.id}>
                  {lateFee.late_fee_display_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="PaymentMethod">Payment Method</label>
            <select className="form-select">
              {paymentMethods.map((paymentMethod) => (
                <option key={paymentMethod.id} value={paymentMethod.id}>
                  {paymentMethod.payment_method_display_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="Utility">Utility</label>
            <select className="form-select">
              {utilities.map((utility) => (
                <option key={utility.id} value={utility.id}>
                  {utility.utility_display_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="ExtraCharge">Extra Charge</label>
            <select className="form-select">
              {extraCharges.map((extraCharge) => (
                <option key={extraCharge.id} value={extraCharge.id}>
                  {extraCharge.extra_charge_display_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Leases;
<div className="my_dashboard_review mt30">
<div className="col-lg-12">
  <h3 className="mb30 text-danger">Unit Name</h3>
</div>
<DetailedInfo />
</div>     

