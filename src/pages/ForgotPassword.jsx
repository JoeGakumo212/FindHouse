import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useRouter } from 'next/router';

const ForgotPassword = () => {
    const router=useRouter('')
  const [email, setEmail] = useState('');

  const handleSendEmail = async () => {
    try {
      const response = await axios.post(
        'https://cloudagent.co.ke/backend/api/v1/forgot_password',
        { email }
      );

      Swal.fire({
        icon: 'success',
        title: 'Email Sent',
        text: 'A password reset email has been sent to your email address.',
      });
      router.push('/ResetPassword')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while sending the email.',
        });
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh',backgroundColor: '#f8fdf8'  }}>
      <button
        type="button"
        className="btn btn-primary "
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Reset Password
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-danger" id="staticBackdropLabel">Forgot Password</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSendEmail}
              >
                Request Reset Code 
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ForgotPassword;
