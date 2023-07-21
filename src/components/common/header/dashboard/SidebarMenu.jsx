import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  isParentPageActive,
  isSinglePageActive,
} from '../../../../utils/daynamicNavigation';

const SidebarMenu = () => {
  const route = useRouter();
  const { data: session, loading } = useSession();
  const myProperties = [
    {
      id: 1,
      name: 'All Properties',
      route: '/my-properties/PropertyTableData',
    },
    { route: `/my-properties/${route.query.id}/Info`, name: 'Info' },
    { route: `/my-properties/${route.query.id}/Unit`, name: 'Unit' },
    { route: `/my-properties/${route.query.id}/Lease`, name: 'Lease' },
    { route: `/my-properties/${route.query.id}/Invoice`, name: 'Invoice' },
    { route: `/my-properties/${route.query.id}/EditUnit`, name: 'EditUnit' },
    {
      route: `/my-properties/${route.query.id}/Vacate-notice`,
      name: 'Vacate-notice',
    },
  ].filter((item) => item.name && item.id);

  const reviews = [
    { id: 1, name: 'My Reviews', route: '/my-review' },
    { id: 2, name: 'Visitor Reviews', route: '/my-review' },
  ];
  const manageAccount = [
    {
      id: 1,
      name: 'My Package',
      route: '/my-package',
      icon: 'flaticon-box',
    },
    {
      id: 2,
      name: 'My Profile',
      route: '/my-profile',
      icon: 'flaticon-user',
    },
    { id: 3, name: 'Logout', route: '/login', icon: 'flaticon-logout' },
  ];

  return (
    <>
      <ul className="sidebar-menu">
        <li className="sidebar_header header">
          <Link href="/">
            <a>
              <img
                src="/assets/images/header-logo2.png"
                alt="header-logo2.png"
              />
              <span>FindHouse</span>
            </a>
          </Link>
        </li>
        {/* End header */}

        <li className="title">
          <span>Main</span>
          <ul>
            <li
              className={`treeview ${
                isSinglePageActive('/my-dashboard', route.pathname)
                  ? 'active'
                  : ''
              }`}
            >
              <Link href="/my-dashboard">
                <a>
                  <i className="flaticon-layers"></i>
                  <span> Dashboard</span>
                </a>
              </Link>
            </li>
            {/* <li
              className={`treeview ${
                isSinglePageActive("/create-listing", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              {
            !loading && !session && (
              <Link href="/create-listing">
                <a>
                  <i className="flaticon-plus"></i>
                  <span> Create Property</span>
                </a>
              </Link>
            )}
            </li> */}
            <li
              className={`treeview ${
                isSinglePageActive('/my-message', route.pathname)
                  ? 'active'
                  : ''
              }`}
            >
              <Link href="/my-message">
                <a>
                  <i className="flaticon-envelope"></i>
                  <span> Message</span>
                </a>
              </Link>
            </li>
          </ul>
        </li>
        {/* End Main */}

        <li className="title">
          <span>Manage Listings</span>
          <ul>
            <li
              className={`treeview ${
                isParentPageActive(myProperties, route.pathname) ? 'active' : ''
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-property">
                <i className="flaticon-home"></i> <span>My Properties</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-property">
                {/* {myProperties.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <a>
                        <i className="fa fa-circle"></i> {item.name}
                      </a>
                    </Link>
                  </li>
                ))} */}
                {myProperties.map((item) => (
                  <li
                    key={item.id}
                    className={`treeview ${
                      isParentPageActive(myProperties, route.pathname)
                        ? 'active'
                        : ''
                    }`}
                  >
                    <Link
                      href={item.route}
                      as={`/my-properties/${item.id}`}
                      passHref
                    >
                      <a>
                        <i className="fa fa-circle"></i> {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* end properties */}

            <li
              className={`treeview ${
                isParentPageActive(reviews, route.pathname) ? 'active' : ''
              }`}
            >
              <a data-bs-toggle="collapse" href="#review">
                <i className="flaticon-chat"></i>
                <span>Reviews</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="review">
                {reviews.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <a>
                        <i className="fa fa-circle"></i> {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* End Review */}

            <li
              className={`treeview ${
                isSinglePageActive('/my-favourites', route.pathname)
                  ? 'active'
                  : ''
              }`}
            >
              <Link href="/my-favourites">
                <a>
                  <i className="flaticon-magnifying-glass"></i>
                  <span> My Favorites</span>
                </a>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive('/tenants/TenantsTableData', route.pathname)
                  ? 'active'
                  : ''
              }`}
            >
              <Link href="/tenants">
                <a>
                  <i className="flaticon-magnifying-glass"></i>
                  <span> Tenants</span>
                </a>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive('/invoices/Invoice', route.pathname)
                  ? 'active'
                  : ''
              }`}
            >
              <Link href="/invoices">
                <a>
                  <i className="flaticon-magnifying-glass"></i>
                  <span> Invoice</span>
                </a>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive('/Leases', route.pathname) ? 'active' : ''
              }`}
            >
              <Link href="/LeasesData">
                <a>
                  <i className="flaticon-magnifying-glass"></i>
                  <span> LeasesData</span>
                </a>
              </Link>
            </li>
            
            <li
              className={`treeview ${
                isSinglePageActive('/Payments', route.pathname) ? 'active' : ''
              }`}
            >
              <Link href="/Payments">
                <a>
                  <i className="flaticon-magnifying-glass"></i>
                  <span> Payments</span>
                </a>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive('/Utility', route.pathname) ? 'active' : ''
              }`}
            >
              <Link href="/Utility">
                <a>
                  <i className="flaticon-magnifying-glass"></i>
                  <span> Utility</span>
                </a>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive('/Vacants', route.pathname) ? 'active' : ''
              }`}
            >
              <Link href="/Vacants">
                <a>
                  <i className="flaticon-magnifying-glass"></i>
                  <span> Vacants</span>
                </a>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive('/my-saved-search', route.pathname)
                  ? 'active'
                  : ''
              }`}
            >
              <Link href="/my-saved-search">
                <a>
                  <i className="flaticon-magnifying-glass"></i>
                  <span> Saved Search</span>
                </a>
              </Link>
            </li>
          </ul>
        </li>
        {/* End manage listing */}

        <li className="title">
          <span>Manage Account</span>
          <ul>
            {manageAccount.map((item) => (
              <li
                className={
                  isSinglePageActive(item.route, route.pathname) ? 'active' : ''
                }
                key={item.id}
              >
                <Link href={item.route}>
                  <a>
                    <i className={item.icon}></i> <span>{item.name}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
};

export default SidebarMenu;
