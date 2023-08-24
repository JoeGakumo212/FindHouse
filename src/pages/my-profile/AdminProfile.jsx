import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { parseCookies } from 'nookies';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useRouter } from 'next/router';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';

const AdminProfile = () => {
  const router = useRouter();
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [physicalAddress, setPhysicalAddress] = useState('');
  const [city, setCity] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // ... (continue with other state variables)

  

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.get(
          `https://cloudagent.co.ke/backend/api/v1/user_profile?filter=&page=1&limit=1&sortField=&sortDirection=&whereField=&whereValue=`,
          {
            headers,
          }
        );

        const {
          role,
          first_name,
          middle_name,
          last_name,
          phone,
          email,
          country,
          city,
          physical_address,
          current_password,
          password,
          password_confirmation,
          // ... (continue with other properties)
        } = response.data;
        setRole(role);
        setFirstName(first_name);
        setMiddleName(middle_name);
        setLastName(last_name);
        setPhone(phone);
        setEmail(email);
        setCountry(country);
        setCity(city);
        setPhysicalAddress(physical_address);
        setCurrentPassword(current_password);
        setNewPassword(password);
        setConfirmPassword(password_confirmation);
        // ... (continue with other setters)

        setAdmin(response.data);

        console.log('Token admin me', tokenFromCookie);
        console.log('Admin data', response.data);
      } catch (error) {
        console.log('Error fetching admin details:', error);
      }
    };

    fetchAdminDetails();
  }, []);

  const handleSubmit = async () => {
    try {
      const updatedAdminData = {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        phone: phone,
        email: email,
        country: country,
        city: city,
        physicalAddress: physicalAddress,
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
        // ... (continue with other properties)
      };

     
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };
      let adminId = '';
      let url = '';
      if (typeof window !== 'undefined') {
        const useScope = localStorage.getItem('useScope');
        const tokenFromLocalStorage = localStorage.getItem('token');
        const decodedToken = jwtDecode(tokenFromLocalStorage);
        adminId = decodedToken.sub;
      
      
      
        if (useScope === 'am-admin') {
          url = `https://cloudagent.co.ke/backend/api/v1/user_profile/${adminId}`;
        }
      
        if (url) {
          try {
            const response = await axios.put(url, updatedAdminData, {
              headers,
            });
            
            Swal.fire({
              icon: 'success',
              title: 'Admin Profile Updated',
              text: 'Your admin profile has been updated successfully!',
            });
            router.push('/login');
            // You may want to fetch and update the admin details again after the update
          } catch (error) {
            console.error('Error updating admin profile:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error updating admin profile:', error);
    }
  };


  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
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

      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={role.display_name}
                  onChange={(e) => setRole(e.target.value)}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Middle Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Physical Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={physicalAddress}
                  onChange={(e) => setPhysicalAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  className="form-control"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  readOnly
                  placeholder="Password Hidden"
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="text"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="text"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-xl-12 text-right mt-3">
            <div className="my_profile_setting_input">
              <button className="btn btn2 float-end" onClick={handleSubmit}>
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminProfile;
