import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';
const InvoiceDetails = () => {
  const router = useRouter();
  const { invoiceId } = router.query;
  const [invoiceData, setInvoiceData] = useState(null);
  const [pdfBlobURL, setPdfBlobURL] = useState('');

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;
        console.log('Token here', tokenFromCookie);
        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };
        console.log('Sending API Request with Headers:', headers);

        // Create the request payload with the invoiceId and pdf set to true
        const requestPayload = {
          id: invoiceId,
          pdf: true,
        };

        // Fetch the data for the specific invoice using the first endpoint
        const response = await axios.post(
          'https://cloudagent.co.ke/backend/api/v1/invoices/download',
          requestPayload,
          { headers } // Pass headers as the third argument
        );

        console.log('API Response:', response);
        console.log('Token two', tokenFromCookie);
        const contentType = response.headers['content-type'];

        if (contentType === 'application/pdf') {
          // If the response content-type is 'application/pdf', it means we received the PDF data directly
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const blobURL = URL.createObjectURL(blob);
          setPdfBlobURL(blobURL);
        } else if (contentType.startsWith('image/')) {
          // If the response content-type starts with 'image/', it means we received the PDF as an image
          const imageUrl = URL.createObjectURL(response.data);
          setPdfBlobURL(imageUrl);
        }

        // Assuming the response includes other invoice data in JSON format
        const data = response.data;
        setInvoiceData(data);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };

    fetchInvoiceData();
  }, [invoiceId]);

  const handleDownloadPDF = () => {
    // Trigger the download by creating an anchor element and clicking it programmatically
    const link = document.createElement('a');
    link.href = pdfBlobURL;
    link.download = `invoice_${invoiceId}.pdf`; // You can customize the downloaded file name
    link.click();
  };

  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  // Render the details of the invoice and the preview iframe for the PDF
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
            <div className="col-lg-9">
              <div className="my_dashboard_review mb40">
                <div className="favorite_item_list">
                  <div className="row">
                    <div className="col-lg-12 maxw100flex-992">
                      <div className="row">
                        {/* Start Dashboard Navigation */}
                        <div className="col-lg-12">
                          <div className="dashboard_navigationbar dn db-1024">
                            <div className="dropdown">
                              <button
                                className="dropbtn"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#DashboardOffcanvasMenu"
                                aria-controls="DashboardOffcanvasMenu"
                              >
                                <i className="fa fa-bars pr10"></i> Dashboard
                                Navigation
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* End Dashboard Navigation */}

                        <div className="bg-success rounded-top text-light p-2 d-flex align-items-center justify-content-between">
                          <div className="breadcrumb_content style ">
                            <p className="breadcrumb_title text-light">
                              Invoice Details
                            </p>

                            <h3 className="text-light"></h3>
                          </div>
                        </div>
                        <div>
                          {/* Render other invoice details */}
                          <iframe
                            src={pdfBlobURL}
                            title={`Invoice ${invoiceId}`}
                            style={{
                              width: '100%',
                              height: '500px',
                              border: 'none',
                            }}
                          />
                          <button onClick={handleDownloadPDF}>
                            Download PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="row">
                <div className="my_dashboard_review mb40">
                  <div className="favorite_item_list">
                    <div className="row">
                      <div className="col-lg-12 maxw100flex-992">
                        <div className="bg-success rounded-top text-light p-2 d-flex align-items-center justify-content-between">
                          <div className="breadcrumb_content style ">
                            <p className="breadcrumb_title text-light">
                              Summary
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{' '}
                <div className="my_dashboard_review mb40">
                  <div className="favorite_item_list">
                    <div className="row">
                      <div className="col-lg-12 maxw100flex-992">
                        <div className="bg-success rounded-top text-light p-2 d-flex align-items-center justify-content-between">
                          <div className="breadcrumb_content style ">
                            <p className="breadcrumb_title text-light">
                              Payment History
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{' '}
                <div className="my_dashboard_review mb40">
                  <div className="favorite_item_list">
                    <div className="row">
                      <div className="col-lg-12 maxw100flex-992">
                        <div className="bg-success rounded-top text-light p-2 d-flex align-items-center justify-content-between">
                          <div className="breadcrumb_content style ">
                            <p className="breadcrumb_title text-light">
                              Waiver History
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-danger btn-block ">
                Waiver Invoice
              </button>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InvoiceDetails;
