import axios from 'axios';
import { parseCookies } from 'nookies'; // Import parseCookies from the appropriate location
import { useEffect } from 'react'; // Import useEffect if needed

const deleteVacationNotice = async (id) => {
  try {
    const cookies = parseCookies();
    const tokenFromCookie = cookies.access_token;

    const headers = {
      Authorization: `Bearer ${tokenFromCookie}`,
      'Content-Type': 'application/json',
    };

    await axios.delete(
      `https://cloudagent.co.ke/backend/api/v1/vacation_notices/${id}`,
      {
        headers: headers,
      }
    );

    // The vacation notice has been successfully deleted
    // You may want to update the UI or take other actions accordingly
  } catch (error) {
    console.error('API Error:', error);
  }
};

// Export the function if needed
export default deleteVacationNotice;
