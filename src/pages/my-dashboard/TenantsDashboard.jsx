import React, { useState, useEffect } from 'react';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';
import { parseCookies } from 'nookies';
import axios from 'axios';
const TenantsDashboard = () => {
const [tenantChat, setTenantChat] = useState(null);
const [isLoading, setIsLoading] = useState(true); // Move the isLoading state here

const fetchData = async () => {
  try {
    setIsLoading(true);

    const cookies = parseCookies();
    const tokenFromCookie = cookies.access_token;
console.log("Token generated",tokenFromCookie);
    const headers = {
      Authorization: `Bearer ${tokenFromCookie}`,
      'Content-Type': 'application/json',
      'X-Scope': 'am-tenant',
    };
      // Log the scope value to verify
      const scopeValue = 'am-tenant'; // Update with the correct scope value
      console.log('Scope value:', scopeValue);
  

    const response = await axios.get('https://cloudagent.co.ke/backend/api/v1/tenant_summaries?filter=&page=1&limit=1&sortField=&sortDirection=&whereField=&whereValue=', {
      headers,
    });

    const data = response.data;
    if (data) {
      setTenantChat(data); // Set the entire response object
      console.log('Fetched tenant chat:', data); // Log the fetched data
    }
  } catch (error) {
    console.error('Error fetching tenant chat:', error);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, []);


  return (
    <>
      <Header />
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>

      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <h1>Welcome Back Tenant</h1>
          {isLoading ? (
            <div className="d-flex align-items-center text-center my-5">
              <strong className="text-info">Loading...</strong>
              <div className="spinner-border text-info ms-auto" role="status" aria-hidden="true"></div>
            </div>
          ) : (
            // Display the fetched data
            <pre>{JSON.stringify(tenantChat, null, 2)}</pre>
          )}
        </div>
      </section>
    </>
  );
};

export default TenantsDashboard;
