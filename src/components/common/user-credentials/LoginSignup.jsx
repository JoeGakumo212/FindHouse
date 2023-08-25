import Link from 'next/link';
import { useState ,useEffect} from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { toast, ToastContainer } from 'react-nextjs-toast';
import LandlordsRegisterForm from '../../../pages/LandlordsRegisterForm';
const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [showImage, setShowImage] = useState(true);

  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false); 

  useEffect(() => {
    // Check for stored credentials and update the state
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPassword = localStorage.getItem('rememberedPassword');
    if (storedEmail) setEmail(storedEmail);
    if (storedPassword) setPassword(storedPassword);
  }, []);

  const { push } = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
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
        if (typeof window !== 'undefined' && window.localStorage) {
          // localStorage logic here
          localStorage.setItem('token', data.access_token);
          if (data.scope === 'am-landlord' || data.scope === 'am-tenant') {
            localStorage.setItem('useScope', data.scope);
          } else {
            localStorage.setItem('useScope', 'am-admin');
          }
          localStorage.setItem('userFirstName', data.first_name);
          localStorage.setItem('userSecondName', data.last_name);
        }
        // Store or remove credentials based on Remember Me checkbox
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }

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
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setLoading(false);
        toast.notify(errorData.message, {
          duration: 5,
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      toast.notify('An error occurred while processing your request.', {
        duration: 5,
        type: 'error',
      });
    }
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <button
          type="button"
          data-bs-dismiss="modal"
          aria-label="Close"
          className="btn-close"
        ></button>
      </div>
      {/* End .modal-header */}
      <ToastContainer />

      <div className="modal-body  modal-xl container pb20">
        <div className="row">
          <div className="col-lg-12">
            <ul className="sign_up_tab nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Login
                </a>
              </li>
              {/* End login tab */}

              {/* <li className="nav-item">
                <a
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Register
                </a>
              </li> */}
              {/* End Register tab */}
            </ul>
            {/* End .sign_up_tab */}
          </div>
        </div>
        {/* End .row */}

        <div className="tab-content container" id="myTabContent">
          <div
            className="row mt25 tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="col-lg-6 col-xl-6">
              <div className="login_thumb">
                <img
                  className="img-fluid w100"
                  src="/assets/images/resource/login.jpg"
                  alt="login.jpg"
                />
              </div>
            </div>
            {/* End col */}

            <div className="col-lg-6 col-xl-6">
              <div className="login_form">
                <form onSubmit={handleSubmit}>
                  <div className="heading">
                    <h4>Login as Landlond or Tenant</h4>
                  </div>
                  {/* End heading */}

                  <hr />

                  <div className="input-group mb-2 mr-sm-2">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      className="form-control"
                      id="inlineFormInputGroupUsername2"
                      placeholder="User Name Or Email"
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>
                  {/* End input-group */}

                  <div className="input-group form-group">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-password"></i>
                      </div>
                    </div>
                  </div>
                  {/* End input-group */}

                  <div className="form-group form-check custom-checkbox mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value={rememberMe}
              id="remeberMe"
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label
              className="form-check-label form-check-label"
              htmlFor="remeberMe"
            >
              Remember me
            </label>

                    <Link href="/ForgotPassword">
                      <a className="btn-fpswd float-end">Lost your password?</a>
                    </Link>
                  </div>
                  {/* End remember me checkbox */}

                  <button type="submit" className="btn btn-log w-100 btn-thm">
                    Log In
                  </button>
                  {/* End submit button */}

                  <p className="text-center">
                    Dont have an account?{' '}
                    <Link href="/register">
                      <a className="text-thm">Register</a>
                    </Link>
                  </p>
                </form>
              </div>
              {/* End .col .login_form */}
            </div>
          </div>
          {/* End .tab-pane */}

          <div
            className="row mt25 tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            {/* End . left side image for register */}

            <div className="col-lg-12 ">
              <div className="sign_up_form">
                {/* End .heading */}

                <form action="#">
                  {/* registration form goes here */}

                  {/* <LandlordsRegisterForm /> */}
                  {/* ends  */}

                  <div className="form-group form-check custom-checkbox mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="terms"
                    />
                    <label
                      className="form-check-label form-check-label"
                      htmlFor="terms"
                    >
                      I have accept the Terms and Privacy Policy.
                    </label>
                  </div>

                  <p className="text-center">
                    Already have an account?{' '}
                    <Link href="/login">
                      <a className="text-thm">Log In</a>
                    </Link>
                    <div></div>
                  </p>
                </form>
                {/* End .form */}
              </div>
            </div>
            {/* End register content */}
          </div>
          {/* End .tab-pane */}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
