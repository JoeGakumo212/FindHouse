import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import LandlordsRegisterForm from '../../pages/LandlordsRegisterForm'
import TenantsRegistrationForm from '../../pages/TenantsRegistrationForm'
import { toast, ToastContainer } from 'react-nextjs-toast';
const handleSubmit = async (event) => {
 
  event.preventDefault();
  setLoading(true);
  const response = await fetch('https://cloudagent.co.ke/backend/api/v1/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('token', data.access_token);
    const myValue = localStorage.getItem('token');
    setLoading(false);
    toast.notify(`Logged In successfully`);
    push('my-dashboard')
  } else {
    const errorData = await response.json();
    setError(errorData.message);
    setLoading(false);
    toast.notify(errorData.message, {
      duration: 5,
      type: "error"
    })
    toast.notify(errorData.message);
    console.log(errorData.message);
  }
};



const Form = () => {
  const [userType, setUserType] = useState("landlord"); // Default to landlord

  const handleUserTypeChange = (newUserType) => {
    setUserType(newUserType);
  };
  return (
    <form action="#"  >
      <div className="heading text-center">
        <h3>Register new account  </h3>
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/login">
            <a className="text-thm">Login</a>
          </Link>
        </p>
      </div>
      {/* End .heading */}

      <div className="row">
        <div className="col-lg-12 ">
          <ul className="sign_up_tab nav nav-tabs " id="myTab" role="tablist">
            <li className="nav-item ">
              <a
               
                className={`nav-link ${userType === "landlord" ? "active bg-secondary text-light" : ""}`}
                onClick={() => handleUserTypeChange("landlord")}
                id="home-tab"
                data-bs-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
               
              >
                Register as Landlord
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${userType === "tenant" ? "active bg-secondary text-light  " : ""}`}
                onClick={() => handleUserTypeChange("tenant")}
                id="profile-tab"
                data-bs-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Register as Tenant
              </a>
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer />
      <div className="form-group">
        {/* Input fields based on userType */}
        {userType === "landlord" && (<>
          
         <LandlordsRegisterForm />
          </>
        )}

        {userType === "tenant" && (
          <>
          
         <TenantsRegistrationForm/>
          </>
        )}
      </div>

      {/* <div className="form-group form-check custom-checkbox mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          required
          id="terms"
        />
        <label className="form-check-label form-check-label" htmlFor="terms">
          I have read and accept the Terms and Privacy Policy?
        </label>
      </div> */}
      {/* End .form-group */}
{/* 
      <button type="submit" className="btn btn-log w-100 btn-thm" onClick={handleSubmit}>
        Register 
      </button> */}
      {/* login button */}

      

    </form>
  );
};

export default Form;
