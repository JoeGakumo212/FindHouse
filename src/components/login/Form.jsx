import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import LoadingSpinner from './LoadingSpinner';
import { useHistory, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationContainer } from 'react-notification-alert';
import 'react-notification-alert/dist/animate.css';
import { toast, ToastContainer } from 'react-nextjs-toast';
import { signIn } from 'next-auth/react';


const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState('');
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch(
      'https://cloudagent.co.ke/backend/api/v1/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        
      }
    );

    if (response.ok) {
      const data = await response.json(); // Read the response body once
      localStorage.setItem('token', data.access_token);
      if (data.scope === 'am-landlord' || data.scope === 'am-tenant') {
        localStorage.setItem('useScope', data.scope);
      } else {
        localStorage.setItem('useScope', 'am-admin');
      }
      localStorage.setItem('userFirstName', data.first_name);
      console.log('scope', data.scope);
      const userScope = data.scope
        ? data.scope.split(' ')
        : ['view-dashboard'];
      setLoading(false);
      toast.notify(`Logged In successfully`);
      const firstName = data.first_name;
      setUserRole(userScope[0]);

      router.push({
        pathname: '/my-dashboard',
      });
    } else  {
      const errorData = await response.json();
      setError(errorData.message);
      setLoading(false);
      toast.notify(errorData.message, {
        duration: 5,
        type: 'error',
      });
      toast.notify(errorData.message);
      console.log(errorData.message);
    }
  };
  return (
    <div>
      <ToastContainer />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="heading text-center">
            <h3>Login to your account</h3>
            <p className="text-center">
              Dont have an account?{' '}
              <Link href="/register">
                <a className="text-thm">Sign Up!</a>
              </Link>
            </p>
          </div>
          {/* End .heading */}

          <div className="input-group mb-2 mr-sm-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="form-control"
              required
              placeholder="User Name Or Email"
            />
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="flaticon-user"></i>
              </div>
            </div>
          </div>
          {/* End .input-group */}

          <div className="input-group form-group">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              required
              placeholder="Password"
            />
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="flaticon-password"></i>
              </div>
            </div>
          </div>
          {/* End .input-group */}

          <div className="form-group form-check custom-checkbox mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="remeberMe"
            />
            <label
              className="form-check-label form-check-label"
              htmlFor="remeberMe"
            >
              Remember me
            </label>

            <a className="btn-fpswd float-end" href="#">
              Forgot password?
            </a>
          </div>
          {/* End .form-group */}

          <button type="submit" className="btn btn-log w-100 btn-thm">
            Log In
          </button>
          {/* login button */}

          <div className="divide">
            <span className="lf_divider">Or</span>
            <hr />
          </div>
          {/* devider */}

          <div className="row mt25">
            <div className="col-lg-6">
              <button
                type="submit"
                className="btn btn-block color-white bgc-fb mb0 w-100"
                onClick={(e) => {
                  e.preventDefault();
                  signIn('facebook');
                }}
              >
                <i className="fa fa-facebook float-start mt5"></i> Facebook
              </button>
            </div>
            {/* End .col */}

            <div className="col-lg-6">
              <button
                type="submit"
                className="btn btn2 btn-block color-white bgc-gogle mb0 w-100"
                onClick={(e) => {
                  e.preventDefault();
                  signIn('GoogleProvider');
                }}
              >
                <i className="fa fa-google float-start mt5"></i> Google
              </button>
            </div>
            {/* End .col */}
          </div>
          {/* more signin options */}
        </form>
      )}
    </div>
  );
};

export default Form;
