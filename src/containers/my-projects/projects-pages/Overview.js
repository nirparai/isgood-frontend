import React from "react";

const Overview = ({ project }) => {
  return (
    <div>
      <div className="bg-light ">
        <div className="mx-4 ">
          <h2 className="font-weight-bold pt-5">Project Details</h2>
          <h5 className="font-weight-bold my-4 p-2 bg-primary text-light">
            Description
          </h5>
          <p>{project.description}</p>
          <h5 className="font-weight-bold my-4 p-2 bg-primary text-light">
            Impacts
          </h5>
          <ul>
            {project.impacts &&
              project.impacts.map((impact, index) => {
                return <li key={index}>{impact.description}</li>;
              })}
          </ul>
          <h5 className="font-weight-bold my-4 p-2 bg-primary text-light">
            Desired Outcomes
          </h5>
          <ul>
            {project.outcomes &&
              project.outcomes.map((outcome, index) => {
                return <li key={index}>{outcome.description}</li>;
              })}
          </ul>
          <h5 className="font-weight-bold my-4 p-2 bg-primary text-light">
            Location
          </h5>
          <p>{project.location}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
