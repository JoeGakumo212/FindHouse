const Creaator = ({ data }) => {
  return (
    <div className="media d-flex">
      <img className="me-3" src="/assets/images/team/lc1.png" alt="lc1.png" />
      <div className="media-body">
        <h5 className="mt-0 mb0">{data?.landlord?.first_name}</h5>
        <p className="mb0">{data?.landlord?.phone}</p>
        <p className="mb0">{data?.landlord?.email}</p>
        <a className="text-thm" href="#">
          View My Listing
        </a>
      </div>
    </div>
  );
};

export default Creaator;
