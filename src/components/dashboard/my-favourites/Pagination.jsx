import React from 'react';

const Pagination = ({ onPageChange }) => {
  // Call the onPageChange function with the new page when a page link is clicked
  const handlePageClick = (event, page) => {
    event.preventDefault();
    onPageChange(page);
  };

  return (
    <ul className="page_navigation">
      <li className="page-item disabled">
        <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
          {" "}
          <span className="flaticon-left-arrow"></span>
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#" onClick={(event) => handlePageClick(event, 1)}>
          1
        </a>
      </li>
      <li className="page-item active" aria-current="page">
        <a className="page-link" href="#">
          2 <span className="sr-only">(current)</span>
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#" onClick={(event) => handlePageClick(event, 3)}>
          3
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#">
          ...
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#" onClick={(event) => handlePageClick(event, 29)}>
          29
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#">
          <span className="flaticon-right-arrow"></span>
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
