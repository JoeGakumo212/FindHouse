import Link from "next/link";

const CopyrightFooter = () => {
  const menuItems = [
    { id: 1, name: "Home", routeLink: "/" },
    { id: 2, name: "Listing", routeLink: "/listing-grid-v1" },
    { id: 3, name: "Property", routeLink: "/listing-grid-v1" },
    { id: 4, name: "About Us", routeLink: "/about-us" },
    { id: 5, name: "Blog", routeLink: "/blog-list-2" },
    { id: 6, name: "Contact", routeLink: "/contact" },
    { id: 6, name: "FAQs", routeLink: "/faq" },
  ];

  return (
    <div className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="footer_menu_widget">
          <ul>
            {menuItems.map((item) => (
              <li className="list-inline-item" key={item.id}>
                <Link href={item.routeLink}>
                  <a>{item.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="copyright-widget text-end">
          <p>
            &copy; {new Date().getFullYear()} by{" "}
            <a
              href="https://savoir.co.ke/"
              target="_blank"
              rel="noreferrer"
            >
             Savoir Microsystems
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default CopyrightFooter;
