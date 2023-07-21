import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import Header from '../../../components/common/header/dashboard/Header';
import SidebarMenu from '../../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../../components/common/header/MobileMenu';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Invoice = () => {
  const [property, setProperty] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;
        console.log('Token invoice:', tokenFromCookie);
        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        const response = await fetch(
          `https://cloudagent.co.ke/backend/api/v1/properties/${id}/invoices?filter=&page=0&limit=0&sortField=&sortDirection=&whereField=&whereValue=`,
          {
            headers: headers,
          }
        );

        if (response.ok) {
          const invoicesData = await response.json();
          console.log('Invoices Data:', invoicesData); // Log the fetched data to the console
          setInvoices(invoicesData);
          setProperty(invoicesData.property || null);
          setData(invoicesData.data || []);
        } else {
          throw new Error(
            `Error fetching invoices: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.log('Error fetching invoices:', error);
        setInvoices([]);
        setData([]);
        setProperty(null);
      }
    };

    if (id) {
      fetchInvoices();
    }
  }, [id]);

  const handleLinkClick = (link) => {
    router.push(`/PropertyDetails/${id}/${link}`);
  };

  if (!property && (invoices.length === 0 || data.length === 0)) {
    return (
      <>
        {/* Main Header Nav */}
        <Header />

        {/* Mobile Menu */}
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

        {/* Our Dashboard */}

        <div className="container-fluid ovh">
          <table className="table">
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Invoice Date</th>
                <th>Invoice Amount</th>
                <th>Paid Amount</th>
                <th>Invoice Balance</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((invoice) => {
                  const { status_text, status_btn, status_icon, status_color } =
                    invoice.summary.status || {};

                  return (
                    <tr key={invoice.id}>
                      <td>{invoice.invoice_number}</td>
                      <td>{invoice.invoice_date}</td>
                      <td>{invoice.summary.invoice_amount}</td>
                      <td>{invoice.amount_paid}</td>
                      <td>{invoice.summary.amount_due}</td>
                      <td>{invoice.due_date}</td>
                      <td>{status_text}</td>
                      <td>{status_btn}</td>
                      <td>{status_icon}</td>
                      <td>{status_color}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10">No Invoice Data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  // Render the content when data is available
  return (
    <>
      {/* Main Header Nav */}
      <Header />

      {/* Mobile Menu */}
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

      {/* Our Dashboard */}

      <div className="container-fluid ovh">
        <table className="table">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Invoice Date</th>
              <th>Invoice Amount</th>
              <th>Paid Amount</th>
              <th>Invoice Balance</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((invoice) => (
              <tr key={invoice.id}>
                <td>
                  {' '}
                  <Link href={`/Invoice`}>
                    <a className="nav-link text-success">
                      {invoice.invoice_number}
                    </a>
                  </Link>
                </td>
                <td>{invoice.invoice_date}</td>
                <td>{invoice.summary.invoice_amount}</td>
                <td>{invoice.amount_paid}</td>
                <td>{invoice.summary.amount_due}</td>
                <td>{invoice.due_date}</td>
                <td>{invoice.status_text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Invoice;
