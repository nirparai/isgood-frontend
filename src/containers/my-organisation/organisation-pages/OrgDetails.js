import React from "react";

const OrgDetails = ({ org }) => {
  return (
    <div>
      <div className="bg-light ">
        <div className="mx-4 ">
          <h2 className="font-weight-bold pt-5">Organistion Details</h2>
          <h5 className="font-weight-bold my-4 p-2 bg-primary text-light">
            Details
          </h5>
          <div className="row">
            <div className="col-md-2">
              <p><b>Website</b></p>
            </div>
            <div className="col-md-4">
              {org.url}
            </div>
            <div className="col-md-2">
              <p><b>Handle</b></p>
            </div>
            <div className="col-md-4">
              {(org.handle==='')?'N/A':org.handle===''}
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <p><b>Region</b></p>
            </div>
            <div className="col-md-4">
              {org.region}
            </div>
            <div className="col-md-2">
              <p><b>Sector</b></p>
            </div>
            <div className="col-md-4">
              {org.sector}
            </div>
          </div>
          <h5 className="font-weight-bold my-4 p-2 bg-primary text-light">
            Description Details
          </h5>
          <p>{org.description}</p>
        </div>
      </div>
    </div>
  );
};

export default OrgDetails;