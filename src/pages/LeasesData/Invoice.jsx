import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';

const Invoice = ({ leaseId, leaseData  }) => {
  const [invoices, setInvoices] = useState([]);
  const router = useRouter(); 
  const handleInvoiceClick = (invoiceId) => {
    // Redirect to the Invoice page with the given invoiceId
    router.push(`/invoices/${invoiceId}`);
  };
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        if (!leaseId) {
          console.log('No lease ID found.');
          return;
        }

        // Fetch the lease invoices using the 'leaseId' parameter
        const response = await axios.get(
          `https://cloudagent.co.ke/backend/api/v1/leases/${leaseId}/invoices`,
          { headers }
        );

        setInvoices(response.data.data);
        console.log('Invoices', response.data.data);
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    if (leaseId) {
      fetchInvoices();
    }
  }, [leaseId]);

  // ... (rest of the code remains the same)

  return (
    <>
      {/* ... (existing code) */}
      <h2>Lease Invoices</h2>
    
      {/* Render Bootstrap Table */}
      <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr className="bg-dark text-light">
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
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
             <td>
                  {/* Use a button for the clickable invoice number */}
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => handleInvoiceClick(invoice.id)}
                  >
                    {invoice.invoice_number}
                  </button>
                </td>
              <td>{invoice.invoice_date}</td>
              <td>{invoice.summary.invoice_amount}</td>
              <td>{invoice.amount_paid}</td>
              <td>{invoice.summary.amount_due}</td>
              <td>{invoice.due_date}</td>
              <td>
                <span
                  className={` ${invoice.summary.status.status_btn} ${invoice.summary.status.status_color}`}
                >
                  <i
                    className={`fa fa-${invoice.summary.status.status_icon}`}
                  />{' '}
                  {invoice.summary.status.status_text}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default Invoice;
