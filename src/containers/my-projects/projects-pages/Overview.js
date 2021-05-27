import React from "react";
import Icon from "@mdi/react";
import { mdiPinOff } from "@mdi/js";

const Overview = ({ project }) => {
  return (
    <div>
      <div className="bg-light ">
        <div className="mx-4 ">
          <h2 className="font-weight-bold pt-5">About the Project</h2>
          <h5 className="font-weight-bold my-4">Description</h5>
          <p>{project.description}</p>
          <h5 className="font-weight-bold my-4">Impacts</h5>
          <ul>
            {project.impacts &&
              project.impacts.map((impact, index) => {
                return <li key={index}>{impact.description}</li>;
              })}
          </ul>
          <h5 className="font-weight-bold my-4">Desired Outcomes</h5>
          <ul>
            {project.outcomes &&
              project.outcomes.map((outcome, index) => {
                return <li key={index}>{outcome.description}</li>;
              })}
          </ul>
        </div>
        <div className="px-5 bg-white">
          <h4 className="font-weight-bold">Location</h4>
          <img
            src="https://www.vitruvianpartners.com/wp-content/uploads/placeholder-banner.png"
            className="w-100 my-4"
            alt="banner"
          />
          <Icon path={mdiPinOff} size={1} className="p-1" />
          <span className="pl-1 font-weight-bold">
            Et cillum id nisi duis mollit do.
          </span>
          <p className="mt-4 pl-4 ">
            Pariatur enim do ullamco nisi ad excepteur mollit id aliquip irure
            elit ipsum. Culpa amet sit amet tempor anim do occaecat in
            excepteur. Duis minim consequat fugiat sit nisi in fugiat occaecat
            proident reprehenderit. Enim ad amet quis anim..
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
