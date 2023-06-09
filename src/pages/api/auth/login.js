import { useEffect, useState } from 'react';
import { makeAuthenticatedRequest } from '../../../utils/api';

const MyPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTNmNzA1NTJmYjQxNWRjYWY5NWQ1OGNiNGY4N2E3OTM0MTFjNjZhMzhiZDllYjdlY2Y2Mjk3ZjZlYzQzNWEzOGRhNTRmM2Y2ZjRmODJjMzMiLCJpYXQiOjE2ODQ3NDU1MTcuMDE5OTA2MDQ0MDA2MzQ3NjU2MjUsIm5iZiI6MTY4NDc0NTUxNy4wMTk5MTIwMDQ0NzA4MjUxOTUzMTI1LCJleHAiOjE2ODQ3NjM1MTUuNTc5NDEzODkwODM4NjIzMDQ2ODc1LCJzdWIiOiJkNjIyZjk2Ni1iOWJjLTQ2ZTMtOGViMS1hZmQzY2I0ZDRhMDQiLCJzY29wZXMiOlsiYXBwcm92ZS1wYXltZW50Iiwidmlldy1sZWFzZSIsImNyZWF0ZS1sYW5kbG9yZCIsInZpZXctaW52b2ljZSIsInZpZXctcmVwb3J0IiwiZWRpdC1ub3RpY2UiLCJkZWxldGUtdGVuYW50Iiwidmlldy1ub3RpY2UiLCJjcmVhdGUtcHJvcGVydHkiLCJkZWxldGUtbGVhc2UiLCJlZGl0LWxlYXNlIiwiZWRpdC10ZW5hbnQiLCJtYW5hZ2Utc2V0dGluZyIsInZpZXctcGF5bWVudCIsImVkaXQtcmVhZGluZyIsImNyZWF0ZS10ZW5hbnQiLCJkZWxldGUtbm90aWNlIiwidmlldy1sYW5kbG9yZCIsImVkaXQtcHJvZmlsZSIsInZpZXctdGVuYW50Iiwidmlldy1yZWFkaW5nIiwid2FpdmUtaW52b2ljZSIsImNhbmNlbC1wYXltZW50Iiwidmlldy1wcm9wZXJ0eSIsImNyZWF0ZS1ub3RpY2UiLCJlZGl0LXByb3BlcnR5IiwiY3JlYXRlLWxlYXNlIiwiY3JlYXRlLXJlYWRpbmciLCJlZGl0LWxhbmRsb3JkIiwiZGVsZXRlLWxhbmRsb3JkIiwiY3JlYXRlLXBheW1lbnQiLCJkZWxldGUtcHJvcGVydHkiLCJ0ZXJtaW5hdGUtbGVhc2UiLCJkZWxldGUtcmVhZGluZyIsInZpZXctZGFzaGJvYXJkIl19.W4GkqiZBZfCit3uReXbGPljr4dpLY_BQhEIx0uSMVUW7uxZGmpLU-9pIlv5cBW2dqHWIc75K_OOytg0VNg4fxuFHG7_gH76_mQv9bkUPVqeteGkDvqikAlTnLauUUM13cza9WX7qe_OEmTaMBp5PIsQZh1JBjIkw3l4G0yQnxmTiO2nJrEO_YZu8qZDzb7m72PUNYIkgBG5oKkDHPOO4uaCVJB1HHgyo3z42tju2HhJ7dRPyNwoMsqJuR2Qb1kNp8te8vkWminhR5r330vs2-sa0Bfxq3z2RiNystCdhP1zRA04KpI94qQv5kUWIkfoE6eC068UxpPoF8wiJLuVXMHqLkoj9C3zmXI6Euz1BqzVy39h7xn72V7nZJZS24OkBQIRNtzKZay2vdjkPGMYd1SyjOkK6tlLbLrP4-P0S4DzYXs5IV2_FbM9djDL_YdF0P_JfwS0lPR8TMwMPHB34AA6AKF4iL5CHCy8k308jO4vu1iHMEjWuCvk3o8GaST-1RtG2tCfFe5u6Ym55IbqmwWP1SncoGIE3fcZTtk-smlyTzgTwOOnpdIc7Oy2OX1YPunfujROFtG2JGTDkqjqniTBD-8wq4lS5RQPBVhbVZSi_QAE0piivQIcz7kx7CpDyDS89xsmLHy7kqoJcrYfpW24UWmwursu1qAp6h3Pvh5s'; // Replace with your actual bearer token
        const apiResponse = await makeAuthenticatedRequest('/endpoint', token);
        setData(apiResponse);
      } catch (error) {
        // Handle error
      }
    };

    fetchApiData();
  }, []);

  return (
    <div>
      {/* Display data */}
    </div>
  );
};

export default MyPage;
