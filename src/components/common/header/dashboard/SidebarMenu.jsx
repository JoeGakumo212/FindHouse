import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect,useState } from 'react';
import { useSession } from 'next-auth/react';

import {
  isParentPageActive,
  isSinglePageActive,
} from '../../../../utils/daynamicNavigation';

const SidebarMenu = () => {
  const route = useRouter();
  const [useScope, setUseScope] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Your localStorage related code
      // For example:
      const storedUseScope = localStorage.getItem('useScope');
      setUseScope(storedUseScope || '');
    }
  }, []);

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
    // {
    //   id: 1,
    //   name: 'Reports',
    //   route: '/reports',
    //   icon: 'flaticon-box',
    // },
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
        {(useScope === 'am-landlord' ||
          useScope === 'am-admin' ||
          useScope === 'am-tenant') && (
          <>
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
              </ul>
            </li>

            {useScope === 'am-admin' && (
              <li
                className={`treeview ${
                  isSinglePageActive('/my-landlords', route.pathname)
                    ? 'active'
                    : ''
                }`}
              >
                <Link href="/my-landlords">
                  <a>
                    <i className="flaticon-user"></i>
                    <span> LandLords</span>
                  </a>
                </Link>
              </li>
            )}
            {/* End Main */}
            {(useScope === 'am-landlord' ||
             useScope === 'am-admin') && (
              <li
                className={`treeview ${
                  isParentPageActive(myProperties, route.pathname)
                    ? 'active'
                    : ''
                }`}
              >
                <Link href="/my-properties">
                  <a>
                    <i className="flaticon-home"></i> <span>My Properties</span>
                  </a>
                </Link>
              </li>
            )}
            {/* end properties */}
            {useScope=== 'am-admin' && (
              <li
                className={`treeview ${
                  isSinglePageActive(
                    '/tenants/TenantsTableData',
                    route.pathname
                  )
                    ? 'active'
                    : ''
                }`}
              >
                <Link href="/tenants">
                  <a>
                    <i className="flaticon-user"></i>
                    <span> Tenants</span>
                  </a>
                </Link>
              </li>
            )}

            {/* Other navigation items that are accessible to all roles */}
            <li
              className={`treeview ${
                isSinglePageActive('/Leases', route.pathname) ? 'active' : ''
              }`}
            >
              <Link href="/LeasesData">
                <a>
                  <i className="flaticon-magnifying-glass"></i>
                  <span> Leases</span>
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
                  <i className="flaticon-money-bag"></i>
                  <span> Payments</span>
                </a>
              </Link>
            </li>

            {/* Invoice navigation item, only accessible to landlords and admins */}
            {(useScope === 'am-landlord' ||
              useScope === 'am-admin') && (
              <li
                className={`treeview ${
                  isSinglePageActive('/invoices/Invoice', route.pathname)
                    ? 'active'
                    : ''
                }`}
              >
                <Link href="/invoices">
                  <a>
                    <i className="flaticon-black-back-closed-envelope-shape"></i>
                    <span> Invoice</span>
                  </a>
                </Link>
              </li>
            )}

            {useScope === 'am-admin' && (
              <li
                className={`treeview ${
                  isSinglePageActive('/Utility', route.pathname) ? 'active' : ''
                }`}
              >
                <Link href="/Utility">
                  <a>
                    <i className="flaticon-box"></i>
                    <span> Utilities</span>
                  </a>
                </Link>
              </li>
            )}
            <li
              className={`treeview ${
                isSinglePageActive('/Vacate', route.pathname) ? 'active' : ''
              }`}
            >
              <Link href="/Vacate">
                <a>
                  <i className="flaticon-magnifying-glass"></i>
                  <span> Vacate Notice</span>
                </a>
              </Link>
            </li>

            <li className="title">
              <span>Manage Account</span>
              <ul>
                {manageAccount.map((item) => (
                  <li
                    className={
                      isSinglePageActive(item.route, route.pathname)
                        ? 'active'
                        : ''
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
          </>
        )}
      </ul>
    </>
  );
};

export default SidebarMenu;
