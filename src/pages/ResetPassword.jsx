import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useRouter } from 'next/router';
const ResetPassword = () => {
    const router=useRouter('')
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'The new password and confirm password do not match.',
      });
      return;
    }

    try {
      // Make API request to reset passwordhttps://cloudagent.co.ke/backend/api/v1/reset_password
      const response = await axios.post('https://cloudagent.co.ke/backend/api/v1/reset_password', {
        email,
        password: newPassword, 
        password_confirmation: confirmPassword, 
        token: resetCode
      });

      // Handle success
      Swal.fire({
        icon: 'success',
        title: 'Password Reset Successful',
        text: 'Your password has been reset successfully!',
      });
      router.push('/login')

      // Optionally, you can redirect to a different page after successful reset
      // router.push('/login');
    } catch (error) {
      // Handle errors
      console.error('Password Reset Error:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Password Reset Failed',
        text: 'An error occurred while resetting your password. Please try again.',
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center " style={{ minHeight: '100vh', backgroundColor: '#f8fdf8' }}>
      <div className="container">
        <h2 className="text-center mb-4">Reset Password</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="resetCode" className="form-label">Reset Code</label>
          <input
            type="text"
            className="form-control"
            id="resetCode"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
